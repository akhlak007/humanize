#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Paragraph-by-Paragraph ZeroGPT Triage Script.
 * Breaks down any document or extracted text into individual paragraphs,
 * tests each paragraph independently against ZeroGPT API, and pinpoints
 * the exact 1-2 paragraphs causing high AI scores.
 *
 * Usage:
 *   node scripts/triage_paragraphs.mjs <file_path> [--threshold 5] [--json]
 */

const args = process.argv.slice(2);
let filePath = null;
let threshold = 5.0;
let jsonOutput = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--threshold' && args[i + 1]) {
    threshold = parseFloat(args[++i]);
  } else if (args[i] === '--json') {
    jsonOutput = true;
  } else if (!filePath && !args[i].startsWith('-')) {
    filePath = args[i];
  }
}

if (!filePath || !fs.existsSync(filePath)) {
  console.log("Usage: node scripts/triage_paragraphs.mjs <file_path> [--threshold 5] [--json]");
  process.exit(1);
}

const rawText = fs.readFileSync(filePath, 'utf8');
const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

console.log(`\n===============================================================`);
console.log(`🔬 ZERO-GPT PARAGRAPH TRIAGE: ${path.basename(filePath)}`);
console.log(`Target: <= ${threshold}% AI per paragraph | Total Blocks: ${lines.length}`);
console.log(`===============================================================\n`);

async function testWithZeroGPT(text) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch('https://api.zerogpt.com/api/detect/detectText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Origin': 'https://www.zerogpt.com',
          'Referer': 'https://www.zerogpt.com/'
        },
        body: JSON.stringify({ input_text: text })
      });
      return await res.json();
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

const triageResults = [];
let passCount = 0;
let failCount = 0;

for (let idx = 0; idx < lines.length; idx++) {
  const p = lines[idx];
  // Skip isolated numbers or short header tokens under 15 words
  const wordCount = p.split(/\s+/).length;
  if (wordCount < 10) {
    continue;
  }

  try {
    const data = await testWithZeroGPT(p);
    const score = data.data?.fakePercentage ?? 0;
    const words = data.data?.textWords ?? wordCount;
    const flagged = data.data?.h || [];
    const passed = score <= threshold;

    if (passed) passCount++; else failCount++;

    const item = {
      index: idx + 1,
      snippet: p.slice(0, 75) + (p.length > 75 ? "..." : ""),
      score,
      passed,
      words,
      flagged
    };
    triageResults.push(item);

    if (!jsonOutput) {
      const tag = passed ? "🟢 PASS" : "🔴 CULPRIT";
      console.log(`[Paragraph ${idx + 1}] ${tag} (${score}% AI, ${words} words)`);
      console.log(`   Text: "${item.snippet}"`);
      if (flagged.length > 0) {
        console.log(`   ❌ Flagged Sentences (${flagged.length}):`);
        flagged.forEach((s, sIdx) => console.log(`      (${sIdx + 1}) "${s}"`));
      }
      console.log("");
    }

    // Gentle delay to respect API rate limits
    await new Promise(r => setTimeout(r, 1200));
  } catch (err) {
    console.error(`Error auditing paragraph ${idx + 1}: ${err.message}`);
  }
}

if (jsonOutput) {
  console.log(JSON.stringify({
    file: filePath,
    threshold,
    totalAudited: triageResults.length,
    passedCount: passCount,
    failedCount: failCount,
    results: triageResults
  }, null, 2));
} else {
  console.log(`===============================================================`);
  console.log(`📊 TRIAGE SUMMARY: ${passCount} Passed, ${failCount} Culprits needing rewrite`);
  console.log(`===============================================================\n`);
}

process.exit(failCount > 0 ? 2 : 0);
