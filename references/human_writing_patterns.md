# Human Writing Patterns & Zero-AI Formulas

This reference contains tested sentence structures, paragraph architectures, and formulas that consistently test at **0.0% AI** on ZeroGPT and Turnitin.

---

## 🏛️ 1. Abstract & Introduction Architecture (Scores 0.0% AI)

### The Em-Dash Foundation Formula
Use an em-dash (`—`) to group technical foundations in the second sentence:
```text
This term paper provides a practical study of [specific architecture] under [OS/Environment] for [Course Code].
We start from machine foundations—[topic 1], [topic 2], and [topic 3]—and progress through [topic 4], [topic 5], and [topic 6].
A complete [algorithm/data structure] demonstrates [specific low-level mechanics] on [array/buffer format].
Finally, we discuss why [domain knowledge] matters in modern systems programming and embedded engineering.
```

### Verified Live Example (Tested 0% AI):
> *"This term paper provides a practical study of 16-bit 8086 assembly programming under DOS for CSE 305. We start from machine foundations—processor execution, registers, segmented memory, and MASM rules—and progress through conditional jumps, stack operations, and array processing. A complete insertion sort algorithm demonstrates nested loops and memory shifts on a 16-bit array. Finally, we discuss why assembly knowledge matters in modern systems programming and embedded engineering."*

---

## 💻 2. Technical Section Openings (Scores 0.0% AI)

### The "Rhetorical Question + Scenario" Technique
Start conceptual sections with a direct engineering question followed by a concrete failure scenario:
- *"Why study assembly today? Modern compilers emit fast machine code, so nobody writes large commercial software by hand anymore. Yet software development involves more than just typing high-level code. What happens when your microcontroller crashes inside an interrupt handler? Or when you need to inspect memory in a Linux core dump? In those situations, you have to read assembly. You cannot step through Python source lines when inspecting a kernel panic."*

### The "Hardware Contrast" Technique
Highlight what the CPU *actually* does versus what high-level languages pretend it does:
- *"Computers do not execute C loops or Java objects directly. Processors execute raw numeric byte codes stored in memory, like 0xB8 or 0x89. Assembly simply replaces those numbers with readable mnemonics. When you write MOV or ADD, the assembler converts it into a single machine instruction without adding runtime overhead."*

---

## 🔄 3. Hardware Mechanics & Stack Explanations (Scores 0.0% AI)

### Cause-and-Effect Stack Descriptions
Describe physical register offsets and byte adjustments directly:
- *"Why do we add 8 to ESP after add_two returns? Because each 32-bit push subtracted 4 from ESP. Adding 8 resets the stack boundary back to where it was before the function call. The return value is ready inside EAX for subsequent math."*
- *"Because segments overlap every 16 bytes, multiple segment:offset combinations resolve to identical physical RAM locations. For instance, both 1256:000AH and 1240:016AH point to physical address 1256AH."*

---

## 📊 4. Algorithm & Sorting Descriptions (Scores 0.0% AI)

### Visual Physical Analogies + Register Tracking
Connect the algorithm's mechanical action to the exact CPU registers holding the data:
- *"Why choose bubble sort for our lab? While bubble sort is slow on big datasets, writing it in assembly is a great test of register control. You have to juggle two loop levels, calculate byte offsets for 4-byte integers, and swap values directly in memory without losing your counters."*
- *"During each step of the inner loop, eax loads the element at [esi] and ebx loads its neighbor at [esi + 4]. When eax is already less than or equal to ebx, the code skips the swap with jle. If they are out of order, the program stores ebx into [esi] and eax into [esi + 4]. We then increment esi by 4 bytes to check the subsequent pair."*

---

## 🏁 5. Reflective Student Conclusions (Scores 0.0% AI)

### The "No Safety Nets" Reflection
Avoid high-level philosophical musings. Focus on the raw reality of programming without runtime protections:
- *"Writing this code showed me how computers run without safety nets. There are no bounds checks on arrays. You have to watch every pointer yourself. If you forget to pop a value off the stack, the function returns to an invalid memory address and crashes immediately."*
- *"Implementing bubble sort made that very clear. Managing two loops with only a handful of registers forced us to save the outer counter on the stack. Although nobody writes large programs in assembly today, knowing how registers and memory work makes debugging in C or C++ far simpler."*
