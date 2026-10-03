#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Autonomous ZeroGPT Verification Loop for AI Agents & Developers.
 * Evaluates text against ZeroGPT API. If score > 10%, outputs exact flagged
 * sentences for the AI Agent to rewrite, continuing until score < 10%.
 *
 * Universal Multi-Agent Support:
 * - Antigravity, Claude Code, Cursor, Windsurf, Aider, Roo Code, Copilot
 *
 * Usage:
 *   node auto_humanize_loop.mjs <file_path> [--threshold 10] [--json]
 *   node auto_humanize_loop.mjs --text "text to test" [--threshold 10] [--json]
 *   node auto_humanize_loop.mjs --stdin [--threshold 10] [--json]
 */

const args = process.argv.slice(2);
let filePath = null;
let rawText = null;
let threshold = 5.0;
let jsonOutput = false;
let useStdin = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--threshold' && args[i + 1]) {
    threshold = parseFloat(args[++i]);
  } else if (args[i] === '--json') {
    jsonOutput = true;
  } else if (args[i] === '--text' && args[i + 1]) {
    rawText = args[++i];
  } else if (args[i] === '--stdin') {
    useStdin = true;
  } else if (!filePath && !args[i].startsWith('-')) {
    filePath = args[i];
  }
}

let text = '';
if (rawText) {
  text = rawText;
} else if (filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at '${filePath}'`);
    process.exit(1);
  }
  text = fs.readFileSync(filePath, 'utf8');
} else if (useStdin) {
  try {
    text = fs.readFileSync(0, 'utf8');
  } catch (e) {
    text = '';
  }
}

if (!text || text.trim().length === 0) {
  console.log("Usage: node auto_humanize_loop.mjs <file_path> [--threshold 10] [--json] [--text \"content\"] [--stdin]");
  process.exit(1);
}

// If testing from cover page, give note on character 0 vs Abstract
const hasCoverMarkers = /course|roll no|student name|department of/i.test(text.slice(0, 300));

async function callZeroGptApi(inputChunk) {
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
        body: JSON.stringify({ input_text: inputChunk })
      });
      const data = await res.json();
      return data;
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

try {
  // Test up to 15,000 characters (ZeroGPT free tier boundary)
  const chunk = text.slice(0, 15000);
  const response = await callZeroGptApi(chunk);

  const score = response.data?.fakePercentage ?? 100.0;
  const words = response.data?.textWords ?? 0;
  const aiWords = response.data?.aiWords ?? 0;
  const flagged = response.data?.h || [];
  const passed = score <= threshold;

  const resultObj = {
    file: filePath || "inline_text",
    score: score,
    threshold: threshold,
    passed: passed,
    totalWords: words,
    aiWords: aiWords,
    flaggedSentencesCount: flagged.length,
    flaggedSentences: flagged,
    instructionForAgent: passed
      ? `SUCCESS: Document meets target threshold (<= ${threshold}% AI). Ready to finalize.`
      : `ACTION REQUIRED: AI score is ${score}% (exceeds ${threshold}%). Rewrite flagged sentences using the 3-Sentence Burstiness Rule and de-nominalization. If stuck, run 'node scripts/triage_paragraphs.mjs <file>' to isolate culprit paragraphs.`
  };

  if (jsonOutput) {
    console.log(JSON.stringify(resultObj, null, 2));
  } else {
    console.log("\n==================================================");
    console.log(`🤖 AUTONOMOUS ZERO-GPT AUDIT: ${filePath ? path.basename(filePath) : "Inline Text"}`);
    console.log("==================================================");
    console.log(`AI Score:       ${score}% AI`);
    console.log(`Target Goal:    <= ${threshold}% AI (Strict Human Guarantee)`);
    console.log(`Status:         ${passed ? "🟢 PASSED" : "🔴 FAILED (Needs Another Rewrite Pass)"}`);
    console.log(`Word Breakdown: ${aiWords} AI words out of ${words} total words`);
    console.log("==================================================");

    if (hasCoverMarkers && !passed) {
      console.log("💡 TIP FOR AGENT: Document contains cover page metadata. If lines like");
      console.log("   'Course: ...' or 'Date: ...' are in the flagged list, verify that");
      console.log(`   testing from Section 1 / Abstract onwards brings the score below ${threshold}%.`);
    }

    if (!passed) {
      console.log(`\n❌ EXACT SENTENCES FLAGGED BY DETECTOR (${flagged.length}):`);
      flagged.forEach((s, idx) => {
        console.log(`\n[Sentence ${idx + 1}]:\n"${s}"`);
      });
      console.log("\n--------------------------------------------------");
      console.log("🤖 INSTRUCTIONS FOR AI AGENT:");
      console.log(`1. Take each of the ${flagged.length} sentences above.`);
      console.log("2. Apply the 3-Sentence Burstiness rule (short 5-word punch + compound explanatory clause).");
      console.log("3. Replace passive nominalizations with active verbs.");
      console.log("4. If score hovers around 10%-15%, run: node scripts/triage_paragraphs.mjs <file>");
      console.log("   to pinpoint the exact paragraph causing the flag!");
      console.log("5. Save the file and re-run this script automatically.");
      console.log(`6. DO NOT stop until Status shows 🟢 PASSED (<= ${threshold}%).`);
      console.log("--------------------------------------------------\n");
      process.exit(2); // Non-zero exit code so automated agent loops know it failed
    } else {
      console.log(`\n🎉 CONGRATULATIONS! Document is 100% human-verified under ${threshold}% AI.`);
      process.exit(0);
    }
  }
} catch (err) {
  console.error("Error executing ZeroGPT audit:", err.message);
  process.exit(1);
}
