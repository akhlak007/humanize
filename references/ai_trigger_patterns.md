# Comprehensive AI Detection Trigger Catalog

This reference documents the exact words, sentence mechanics, transition phrases, and grammatical patterns that trigger AI detectors (ZeroGPT, Turnitin, GPTZero, CopyLeaks) and cause papers to get trapped in the **30%–40% AI detection range (typically ~37%)**.

---

## 🚨 The Root Cause of the 37% AI Score

When a detector outputs a **30%–40% AI score**, it means the text passed basic keyword filters, but **statistically failed the cadence and syntactic variance test**:

1. **Monotone Sentence Lengths:** Sentences cluster between 16 and 24 words with no sharp variations.
2. **Predictable Clause Structure:** Almost every sentence follows `[Subject] + [Verb] + [Object] + [, which / that / leading to] + [Secondary Clause]`.
3. **Connective Overuse:** AI relies on formal transitional adverbs to glue paragraphs together rather than letting logical progression speak for itself.
4. **Abstract Nominalizations:** Heavy nouns ending in *-tion*, *-ment*, or *-ity* replace simple active verbs.

---

## 🚫 1. The Banned Vocabulary & Filler Phrases (All Domains)

Avoid these terms in STEM, Humanities, Business, and Social Sciences:

| AI Trigger Phrase | Why It Gets Flagged | Human Alternative |
| :--- | :--- | :--- |
| **"delves into" / "delve"** | #1 most common LLM token | "examines", "explores", "analyzes", "traces" |
| **"plays a vital/crucial role"** | Empty conceptual padding | "enables", "controls", "governs", "directs" |
| **"serves as a testament to"** | Melodramatic AI rhetoric | "demonstrates", "proves", "shows" |
| **"it is important/crucial to note"** | Pompous, redundant signposting | State the point directly |
| **"furthermore" / "moreover"** | Robotic essay glue | "Also,", "In practice,", or remove entirely |
| **"in today's rapidly evolving world"** | High-perplexity buzzword cliché | "in modern computing", "in current systems" |
| **"a rich tapestry of"** | Classic florid AI hallucination | Delete completely |
| **"fosters / fostering"** | Overused corporate/academic fluff | "builds", "encourages", "drives" |
| **"in conclusion / to summarize"** | School-essay marker | Begin with the key takeaway or constraint |
| **"pivotal / paramount"** | Overstated importance | "essential", "primary", "central" |
| **"seamless / seamlessly"** | Marketing fluff | "directly", "without extra memory passes" |
| **"sheds light on"** | Overused metaphor | "clarifies", "reveals", "uncovers" |

---

## 🚫 2. The 5 Structural Traps that Cause ~37% AI Scores

### Trap 1: The Tripartite Parallel Syndrome (3-Item Lists)
AI language models have an overwhelming statistical bias toward listing items in groups of three, usually joined with "and":
- ❌ *"The processor manages register allocation, memory transfers, and condition flags."*
- ❌ *"Providing high speed, enhanced reliability, and maximum scalability."*
- ❌ *"Analyzing the data, developing the model, and validating the results."*

**The Human Fix:** Cut to two strong points, or expand one into its own clause:
- ✅ *"The processor manages register allocation while updating hardware condition flags."*
- ✅ *"Providing high speed and predictable runtime latency."*
- ✅ *"We trained the model and validated it against the test partition."*

---

### Trap 2: The Nominalization Disease
Nominalization is turning punchy actions into dead nouns connected by "of":
- ❌ *"The utilization of the algorithm facilitates the sorting of elements."*
- ❌ *"Conducts an examination of register contents."*
- ❌ *"Provides an indication of an absence of stack boundaries."*

**The Human Fix:** Use strong active verbs:
- ✅ *"The algorithm sorts elements in place."*
- ✅ *"Inspects register contents in GDB."*
- ✅ *"Indicates that the stack lacks boundary checks."*

---

### Trap 3: Low Burstiness (The 20-Word Rhythm)
Look at sentence lengths in AI paragraphs:
- Sentence 1: 22 words
- Sentence 2: 19 words
- Sentence 3: 21 words
- Sentence 4: 20 words

Even if every single word is changed, the detector calculates the **variance of sentence lengths** and outputs **35%–40% AI**!

**The Human Fix (High Burstiness Formula):**
- Sentence 1 (Short): 5 – 7 words (*"Pointers require manual boundary checks."*)
- Sentence 2 (Compound): 24 – 32 words (*"Stepping beyond allocated buffer limits causes the processor to fetch raw leftover bytes from neighboring memory blocks, triggering segmentation faults under protected mode."*)
- Sentence 3 (Medium): 11 – 15 words (*"Programmers must calculate index offsets explicitly on every loop pass."*)

---

### Trap 4: Isolated Metadata Lines (The Cover Page Blunder)
When a document starts with:
```text
DEPARTMENT OF COMPUTER SCIENCE
Term Paper: Advanced Networking
Student: John Doe
Date: September 2026
```
Detectors evaluate short header fragments with colons as **70%–100% AI**. If the user copies the whole document into ZeroGPT's 15,000-character box, these high-scoring header lines inflate an otherwise human paper into a **30%–38% AI score**!

**The Fix:**
- When testing in detector boxes, always paste from the **Abstract / Section 1** onwards.
- If the cover page must be included, embed the metadata into narrative sentences directly following it.

---

### Trap 5: Verbose / Textbook Code Comments
AI writes code comments that explain what the instruction literally does in full textbook English:
- ❌ `; store immediate constant 42 into register eax`
- ❌ `; add register ebx to eax, updating flags`
- ❌ `; decrement counter and jump to top if non-zero`

**The Human Fix:**
Real developers and students write short, utilitarian notes:
- ✅ `; eax = 42`
- ✅ `; eax += ebx`
- ✅ `; loop back if ecx != 0`
- ✅ `; exit status 0`
- ✅ `; sys_exit`
