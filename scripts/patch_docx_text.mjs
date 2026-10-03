#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Cleanly patches text in an unpacked Word .docx document.xml file
 * without corrupting formatting, tables, borders, or styles.
 *
 * Usage:
 *   node scripts/patch_docx_text.mjs <unpacked_dir> <replacements_json_file>
 *
 * Format of replacements_json_file:
 * [
 *   {
 *     "find": "Exact string or sentence to replace",
 *     "replace": "New humanized text"
 *   }
 * ]
 */

const unpackedDir = process.argv[2];
const replacementsFile = process.argv[3];

if (!unpackedDir || !replacementsFile) {
  console.log("Usage: node scripts/patch_docx_text.mjs <unpacked_dir> <replacements_json_file>");
  process.exit(1);
}

const xmlPath = path.join(unpackedDir, 'word', 'document.xml');
if (!fs.existsSync(xmlPath)) {
  console.error(`Error: Could not find document.xml in '${xmlPath}'`);
  process.exit(1);
}

if (!fs.existsSync(replacementsFile)) {
  console.error(`Error: Replacements file '${replacementsFile}' not found.`);
  process.exit(1);
}

const replacements = JSON.parse(fs.readFileSync(replacementsFile, 'utf8'));
let xml = fs.readFileSync(xmlPath, 'utf8');

let appliedCount = 0;
for (let i = 0; i < replacements.length; i++) {
  const { find, replace } = replacements[i];
  if (!xml.includes(find)) {
    console.warn(`[Warning ${i + 1}] Target text not found: "${find.slice(0, 50)}..."`);
    continue;
  }
  xml = xml.replaceAll(find, replace);
  appliedCount++;
  console.log(`[Success ${i + 1}] Replaced: "${find.slice(0, 40)}..." -> "${replace.slice(0, 40)}..."`);
}

fs.writeFileSync(xmlPath, xml, 'utf8');
console.log(`\n🎉 Successfully applied ${appliedCount}/${replacements.length} replacements to ${xmlPath}`);
