#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Command-line script to test any text file against ZeroGPT API.
 * Usage: node detect_zerogpt.mjs <file_path_or_text>
 */

const target = process.argv[2];
if (!target) {
  console.log("Usage: node detect_zerogpt.mjs <path-to-text-file>");
  process.exit(1);
}

let textToTest = "";
if (fs.existsSync(target)) {
  textToTest = fs.readFileSync(target, 'utf8');
} else {
  textToTest = target;
}

console.log(`Analyzing text (${textToTest.length} characters, ~${textToTest.split(/\s+/).length} words)...`);

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
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`Attempt ${attempt} failed: ${err.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  throw new Error("Failed to reach ZeroGPT API after 3 attempts.");
}

try {
  // Free tier ZeroGPT evaluates up to 15,000 characters
  const chunk = textToTest.slice(0, 15000);
  const result = await testWithZeroGPT(chunk);

  const percentage = result.data?.fakePercentage ?? 100;
  const words = result.data?.textWords ?? 0;
  const aiWords = result.data?.aiWords ?? 0;
  const flagged = result.data?.h || [];

  console.log("\n========================================");
  console.log(`ZeroGPT AI Score: ${percentage}% AI`);
  console.log(`Total Words Tested: ${words} (AI Words: ${aiWords})`);
  console.log("========================================");

  if (percentage <= 15) {
    console.log("Verdict: 🟢 HUMAN WRITTEN (Passed!)");
  } else if (percentage <= 35) {
    console.log("Verdict: 🟡 MIXED / MODERATE AI DETECTED");
  } else {
    console.log("Verdict: 🔴 HIGH AI CONTENT DETECTED");
  }

  if (flagged.length > 0) {
    console.log(`\nFlagged Sentences (${flagged.length}):`);
    flagged.forEach((s, idx) => console.log(`[${idx + 1}] ${s}`));
  } else {
    console.log("\nZero flagged sentences! 100% human-sounding text.");
  }
} catch (err) {
  console.error("Error during detection:", err.message);
  process.exit(1);
}
