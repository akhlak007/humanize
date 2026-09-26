#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Unpacks a .docx file into raw XML components and extracts plain text.
 * Usage: node unpack_docx.mjs <input.docx> <output_dir>
 */

const docxPath = process.argv[2];
const outDir = process.argv[3] || 'extracted_docx';

if (!docxPath || !fs.existsSync(docxPath)) {
  console.log("Usage: node unpack_docx.mjs <input.docx> [output_dir]");
  process.exit(1);
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

console.log(`Unpacking ${docxPath} into ${outDir}...`);
execSync(`tar -xf "${docxPath}" -C "${outDir}"`);

const xmlPath = path.join(outDir, 'word', 'document.xml');
if (!fs.existsSync(xmlPath)) {
  console.error("Error: word/document.xml not found inside docx archive!");
  process.exit(1);
}

const xml = fs.readFileSync(xmlPath, 'utf8');

// Extract all paragraphs
const paragraphs = [];
const pRegex = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g;
let match;
while ((match = pRegex.exec(xml)) !== null) {
  const pContent = match[1];
  const tMatches = [...pContent.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map(m => m[1]);
  if (tMatches.length > 0) {
    paragraphs.push(tMatches.join(''));
  }
}

const txtPath = path.join(outDir, 'extracted_text.txt');
fs.writeFileSync(txtPath, paragraphs.join('\n'));

console.log(`Success! Extracted ${paragraphs.length} paragraphs (${paragraphs.join(' ').split(/\s+/).length} words).`);
console.log(`Extracted plain text saved to: ${txtPath}`);
