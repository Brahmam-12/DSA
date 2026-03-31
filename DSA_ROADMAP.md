# 🗺️ DSA (Data Structures & Algorithms) Complete Roadmap

## 📌 Overview
This roadmap covers all major DSA concepts with explanations, patterns, and 10 practice problems per topic.
Each concept has a dedicated JavaScript file with solutions and explanations.

---

## 🏁 Learning Path (Recommended Order)

```
Week 1-2:   Arrays & Strings (Basics)
Week 3:     Hashing (Maps & Sets)
Week 4:     Two Pointers & Sliding Window
Week 5:     Linked Lists
Week 6:     Stacks & Queues
Week 7:     Binary Search
Week 8-9:   Trees & Binary Trees
Week 10:    Heaps & Priority Queues
Week 11:    Graphs
Week 12:    Recursion & Backtracking
Week 13-14: Dynamic Programming
Week 15:    Sorting Algorithms
```

---

## 📚 Topics Index

| # | Topic | File | Difficulty |
|---|-------|------|------------|
| 1 | [Arrays](./01_arrays.js) | `01_arrays.js` | ⭐ Beginner |
| 2 | [Strings](./02_strings.js) | `02_strings.js` | ⭐ Beginner |
| 3 | [Hashing (Maps & Sets)](./03_hashing.js) | `03_hashing.js` | ⭐⭐ Easy |
| 4 | [Two Pointers](./04_two_pointers.js) | `04_two_pointers.js` | ⭐⭐ Easy |
| 5 | [Sliding Window](./05_sliding_window.js) | `05_sliding_window.js` | ⭐⭐ Easy |
| 6 | [Linked Lists](./06_linked_lists.js) | `06_linked_lists.js` | ⭐⭐ Easy |
| 7 | [Stacks & Queues](./07_stacks_queues.js) | `07_stacks_queues.js` | ⭐⭐ Easy |
| 8 | [Binary Search](./08_binary_search.js) | `08_binary_search.js` | ⭐⭐ Easy |
| 9 | [Trees & Binary Trees](./09_trees.js) | `09_trees.js` | ⭐⭐⭐ Medium |
| 10 | [Heaps & Priority Queues](./10_heaps.js) | `10_heaps.js` | ⭐⭐⭐ Medium |
| 11 | [Graphs](./11_graphs.js) | `11_graphs.js` | ⭐⭐⭐ Medium |
| 12 | [Recursion & Backtracking](./12_recursion_backtracking.js) | `12_recursion_backtracking.js` | ⭐⭐⭐ Medium |
| 13 | [Dynamic Programming](./13_dynamic_programming.js) | `13_dynamic_programming.js` | ⭐⭐⭐⭐ Hard |
| 14 | [Sorting Algorithms](./14_sorting.js) | `14_sorting.js` | ⭐⭐⭐ Medium |

---

## 🧠 Key Patterns to Master

### 1. **Sliding Window**
- Fixed window size → track sum/max/min
- Variable window → expand right, shrink left when condition breaks
- Use for: subarray problems, substring problems

### 2. **Two Pointers**
- Left + Right pointers moving toward each other
- Fast + Slow pointers (Floyd's cycle detection)
- Use for: sorted arrays, palindromes, cycle detection

### 3. **HashMap / HashSet**
- O(1) lookup, insert, delete
- Use for: frequency count, seen elements, grouping

### 4. **Binary Search**
- Works on SORTED arrays
- Template: `while(left <= right)` → `mid = left + Math.floor((right-left)/2)`
- Use for: search in sorted, find boundary, rotated arrays

### 5. **BFS / DFS (Graphs & Trees)**
- BFS: Level-order, shortest path (unweighted)
- DFS: Path finding, cycle detection, topological sort

### 6. **Dynamic Programming**
- Break into subproblems
- Memoization (top-down) or Tabulation (bottom-up)
- Use for: optimization, counting, decision problems

### 7. **Recursion & Backtracking**
- Try all possibilities, backtrack when invalid
- Use for: permutations, combinations, N-Queens, Sudoku

---

## ⏱️ Time & Space Complexity Cheat Sheet

| Operation | Array | HashMap | Linked List | BST (avg) | Heap |
|-----------|-------|---------|-------------|-----------|------|
| Access | O(1) | O(1) | O(n) | O(log n) | O(n) |
| Search | O(n) | O(1) | O(n) | O(log n) | O(n) |
| Insert | O(n) | O(1) | O(1) | O(log n) | O(log n) |
| Delete | O(n) | O(1) | O(1) | O(log n) | O(log n) |

---

## 🎯 Problem Solving Framework

```
1. READ the problem carefully (2-3 times)
2. IDENTIFY the pattern (sliding window? two pointers? dp?)
3. THINK about edge cases (empty array, single element, negatives)
4. WRITE brute force first
5. OPTIMIZE (better time/space complexity)
6. CODE the solution
7. TEST with examples + edge cases
```

---

## 📈 Progress Tracker

- [ ] 01 Arrays (0/10)
- [ ] 02 Strings (0/10)
- [ ] 03 Hashing (0/10)
- [ ] 04 Two Pointers (0/10)
- [ ] 05 Sliding Window (0/10)
- [ ] 06 Linked Lists (0/10)
- [ ] 07 Stacks & Queues (0/10)
- [ ] 08 Binary Search (0/10)
- [ ] 09 Trees & Binary Trees (0/10)
- [ ] 10 Heaps & Priority Queues (0/10)
- [ ] 11 Graphs (0/10)
- [ ] 12 Recursion & Backtracking (0/10)
- [ ] 13 Dynamic Programming (0/10)
- [ ] 14 Sorting Algorithms (0/10)

**Total: 0 / 140 problems solved**
