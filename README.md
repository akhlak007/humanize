# ✍️ Academic Paper Humanizer (Antigravity Skill)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AI Detection Target](https://img.shields.io/badge/AI%20Score-%3C10%25%20Verified-brightgreen)](https://zerogpt.com)
[![Compatible with](https://img.shields.io/badge/Platform-Antigravity%20%7C%20Claude%20%7C%20Cursor%20%7C%20ChatGPT-blue)](https://github.com)

A battle-tested methodology and agentic skill for transforming AI-generated academic papers, technical reports, and STEM coursework into authentic, 100% human-sounding writing.

Consistently scores **< 10% AI** on **ZeroGPT**, **Turnitin**, and **GPTZero** while strictly preserving 100% of mathematical equations, technical logic, assembly opcodes, data structures, and academic citations.

---

## 🚀 Why This Skill Exists

Generic AI humanizers (e.g. QuillBot, Undetectable AI) break down when handling technical STEM content:
- They swap precise technical terms with nonsensical synonyms (`"register accumulator"` → `"ledger collector"`).
- They alter algorithms, causing code and memory addresses to become invalid.
- They destroy Word document formatting, tables, and institutional headers.

This skill operates on **structural and syntactic burstiness**:
1. **Preserves 100% of Technical Logic:** Zero alteration of code, math, or memory models.
2. **Elevates Perplexity & Burstiness:** Mixes short punchy sentences with compound technical clauses.
3. **Refactors AI Code Comments:** Replaces textbook AI comments with natural student notes.
4. **Protects Word & PDF Integrity:** Directly modifies WordprocessingML without XML corruption.
5. **Live Verification Loop:** Bundles automated test scripts against detection APIs.

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
    ├── ai_trigger_patterns.md        # Complete catalog of AI detection trigger phrases
    └── human_writing_patterns.md     # Tested sentence formulas scoring 0.0% AI
```

---

## ⚡ Quick Start

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

## 📖 Key Rules for Zero-AI Academic Writing

1. **Cover Page Sensitivity:** Standalone lines with colons (`Course: ...`, `Date: ...`) get flagged when pasted alone. Always test from the **Abstract** onwards, or anchor metadata with narrative prose.
2. **Abstract Formula:**
   `[Course Scope]` + `[Foundations with em-dash]` + `[Practical Algorithm Highlight]` + `[Relevance Statement]`.
3. **Kill Tripartite Parallelism:** Break 3-noun lists (`"registers, memory, and opcodes"`) into 2 focused points.
4. **Utilitarian Code Comments:** Use `; eax = 42` instead of `; store immediate constant 42 into register eax`.
5. **No AI Clichés:** Ban *"Furthermore"*, *"Moreover"*, *"Delves into"*, and *"Plays a vital role"*.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
