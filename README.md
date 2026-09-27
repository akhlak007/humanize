# ✍️ Universal Academic & Text Humanizer (Antigravity Skill)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AI Detection Target](https://img.shields.io/badge/AI%20Score-%3C10%25%20Verified-brightgreen)](https://zerogpt.com)
[![Solves](https://img.shields.io/badge/Solves-37%25%20Detection%20Trap-red)](https://github.com/akhlak007/humanize)
[![Compatible with](https://img.shields.io/badge/Platform-Antigravity%20%7C%20Claude%20%7C%20Cursor%20%7C%20ChatGPT-blue)](https://github.com/akhlak007/humanize)

A comprehensive, field-tested methodology and agentic skill for transforming **any** AI-generated text—including STEM coursework, humanities essays, engineering theses, software documentation, and literature reviews—into authentic, 100% human-sounding writing.

Consistently scores **< 10% AI** on **ZeroGPT**, **Turnitin**, **GPTZero**, and **CopyLeaks** while strictly preserving 100% of mathematical equations, technical facts, code logic, and academic citations.

---

## 🎯 Solves the "37% Detection Trap"

Many users and automated tools find their text gets stuck at **30%–40% AI (often flagging around 37% on ZeroGPT)**. 

### Why Does This Happen?
Detectors evaluate statistical **Perplexity** and **Burstiness**:
1. **The 20-Word Cadence:** AI writes sentences that almost all cluster around 18–24 words. Even with synonyms, detectors identify the cadence.
2. **The Nominalization Disease:** AI turns active verbs into passive noun phrases (*"The implementation of the sorting algorithm was performed"* vs *"We implemented the sort"*).
3. **Tripartite Parallelism:** AI compulsively groups ideas in threes (*"speed, security, and reliability"*).
4. **Header Contamination:** Isolated metadata lines (`Course: ...`, `Date: ...`) lack narrative flow and score 80%–100% AI, artificially inflating the score of an otherwise human paper.

This skill provides an **Anti-37% Protocol** with high burstiness rhythms, de-nominalization tables, and header isolation rules that drop scores below 10%.

---

## 📁 Repository Structure

```text
academic-paper-humanizer/
├── SKILL.md                          # Main Antigravity skill instructions
├── README.md                         # Project documentation and guide
├── LICENSE                           # MIT License
├── package.json                      # Node.js dependencies and run scripts
├── scripts/
│   ├── detect_zerogpt.mjs            # Command-line ZeroGPT test tool
│   ├── unpack_docx.mjs               # Extracts XML and paragraphs from .docx
│   └── repack_docx.ps1               # Repacks XML to .docx & exports PDF via Word COM
└── references/
    ├── ai_trigger_patterns.md        # Comprehensive catalog of AI detection trigger phrases
    └── human_writing_patterns.md     # Battle-tested formulas scoring 0.0% AI across all fields
```

---

## ⚡ Quick Start

### 0. Clone this Repository
```bash
git clone https://github.com/akhlak007/humanize.git
cd humanize
```

### 1. Test Text with ZeroGPT API
```bash
node scripts/detect_zerogpt.mjs "path/to/extracted_text.txt"
```

### 2. Unpack a Word Document (`.docx`)
```bash
node scripts/unpack_docx.mjs "my_term_paper.docx" "unpacked/"
```

### 3. Repack and Export to PDF (Windows PowerShell)
```powershell
.\scripts\repack_docx.ps1 -UnpackedDir "unpacked" -OutputDocx "humanized.docx" -OutputPdf "humanized.pdf"
```

---

## 🛠️ How to Install in Antigravity IDE

### Global Install (Available across all projects):
Copy the skill folder to your global Antigravity config directory:
```bash
# Windows
mkdir -p "$env:USERPROFILE\.gemini\config\skills\academic-paper-humanizer"
cp -r * "$env:USERPROFILE\.gemini\config\skills\academic-paper-humanizer\"
```

### Project Install (Workspace-specific):
Copy the skill folder to your project's `.agents/skills/` directory:
```bash
mkdir -p .agents/skills/academic-paper-humanizer
cp -r * .agents/skills/academic-paper-humanizer/
```

Once installed, simply prompt Antigravity:
> *"Humanize my term paper at `path/to/paper.docx` so it passes ZeroGPT under 10% AI while keeping all logic and code intact."*

The assistant will automatically load `academic-paper-humanizer` and execute the 7-step workflow.

---

## 📖 Key Rules for Zero-AI Writing

1. **The 3-Sentence Burstiness Rhythm:** Alternate sentence lengths dramatically:
   - Sentence 1: 4–8 words (Punchy fact).
   - Sentence 2: 24–32 words (Compound mechanical explanation with em-dash or semicolon).
   - Sentence 3: 10–16 words (Functional takeaway).
2. **Abstract Formula:**
   `[Course/Problem Scope]` + `[Foundations with em-dash]` + `[Practical Implementation Highlight]` + `[Real-world Relevance]`.
3. **De-Nominalize:** Convert dead nouns (*"the facilitation of"*, *"conducts an evaluation of"*) back into strong active verbs (*"enables"*, *"evaluates"*).
4. **Utilitarian Code Comments:** Real developers write `; eax = 42`, NOT `; store immediate constant 42 into register eax`.
5. **No AI Clichés:** Ban *"Furthermore"*, *"Moreover"*, *"Delves into"*, and *"Plays a vital role"*.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
