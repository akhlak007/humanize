# AI Trigger Patterns & Vocabulary Reference

This reference documents the specific sentence structures, vocabulary words, transition phrases, and grammatical patterns that trigger high AI confidence scores in detectors like ZeroGPT, GPTZero, Turnitin, and Copyleaks.

---

## 🚫 1. Banned Vocabulary & Filler Phrases

Avoid these words and phrases in academic and technical papers:

| AI Trigger Phrase | Why It Gets Flagged | Human Alternative |
| :--- | :--- | :--- |
| **"delves into" / "delve"** | Classic LLM cliché | "examines", "explores", "analyzes", "traces" |
| **"plays a vital role in"** | Overused filler | "enables", "controls", "governs" |
| **"testament to"** | Melodramatic trope | "demonstrates", "illustrates" |
| **"it is crucial/essential to note"** | Pompous padding | State the fact directly |
| **"furthermore" / "moreover"** | Robotic transition | "In addition,", "Also,", or connect logically |
| **"in conclusion" / "to conclude"** | Fifth-grade essay marker | Begin with your final takeaway |
| **"rich tapestry" / "beacon"** | Florid AI hallucinations | Delete entirely |
| **"serves as a"** | Wordy passive construct | "acts as", "is" |
| **"in today's digital landscape"** | Tech buzzword cliché | "in modern computing", "in current systems" |
| **"seamless / seamlessly"** | Marketing hype | "directly", "without overhead" |

---

## 🚫 2. Syntactic & Structural Traps

### A. Tripartite Parallelism (The "Rule of Three" Addiction)
AI models constantly group concepts into three items with symmetric adjectives:
- ❌ *"ensuring high efficiency, robust reliability, and maximum performance."*
- ❌ *"exploring register usage, stack frame mechanics, and memory allocation."*
- ❌ *"providing a clean, intuitive, and comprehensive foundation."*

**The Human Fix:** Break the symmetry. Use two concrete points, or expand one into a clause:
- ✅ *"providing direct register control and low runtime overhead."*
- ✅ *"managing CPU registers while preserving loop counters on the stack."*

---

### B. Repetitive Subject Starters
When summarizing a topic, AI often starts 3–5 consecutive sentences with the identical subject noun:
- ❌ *"Assembly language begins with... Assembly language then covers... Assembly language later explains... Assembly language requires..."*

**The Human Fix:** Vary grammatical roles (gerunds, prepositional phrases, adverbials):
- ✅ *"Starting from the 8086 processor layout, we examine general registers... Next, we trace arithmetic logic... For practical validation, an in-place sort demonstrates..."*

---

### C. Low Burstiness (Uniform Sentence Length)
AI text almost always clusters around **18–24 words per sentence** without variation:
- *Sentence 1 (22 words)*
- *Sentence 2 (20 words)*
- *Sentence 3 (21 words)*
- *Sentence 4 (23 words)*

**The Human Fix (High Burstiness):**
- *Sentence 1 (6 words):* *"Processors execute raw numbers in memory."*
- *Sentence 2 (28 words):* *"Because typing numerical byte codes by hand is error-prone and tedious, assembly language substitutes readable mnemonics like MOV and ADD without introducing hidden runtime overhead."*
- *Sentence 3 (12 words):* *"There are no garbage collectors or safety nets to prevent stack corruption."*

---

### D. Generic Textbook Code Comments
AI generates code comments that restate the instruction in long-winded english:
- ❌ `; store immediate constant 42 into register eax`
- ❌ `; compute eax = eax + ebx, updating condition flags`
- ❌ `; decrement ecx; jump to sum_loop if ecx != 0`
- ❌ `; upon loop termination, eax contains 15`

**The Human Fix (Student / Engineer Comments):**
- ✅ `; eax = 42`
- ✅ `; eax += ebx`
- ✅ `; loop back`
- ✅ `; eax = 15`
- ✅ `; sys_exit`
