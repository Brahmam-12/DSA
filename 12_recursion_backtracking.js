// ============================================================
// 📚 TOPIC 12: RECURSION & BACKTRACKING
// ============================================================
//
// 🔑 RECURSION CONCEPT:
// A function that calls itself to solve smaller subproblems.
// Every recursive function needs:
//   1. BASE CASE  → when to stop (prevents infinite recursion)
//   2. RECURSIVE CASE → break problem into smaller subproblem
//
// RECURSION TEMPLATE:
//   function solve(problem):
//     if (base case): return answer
//     smaller = reduce(problem)
//     return combine(solve(smaller))
//
// 🔑 BACKTRACKING CONCEPT:
// Backtracking = Recursion + Undo
// Try all possibilities, and UNDO (backtrack) when a path fails.
//
// BACKTRACKING TEMPLATE:
//   function backtrack(state, choices):
//     if (goal reached): add state to results; return
//     for each choice in choices:
//       make choice (add to state)
//       backtrack(new state, remaining choices)
//       undo choice (remove from state)  ← BACKTRACK!
//
// WHEN TO USE BACKTRACKING:
//   ✅ Generate all permutations/combinations/subsets
//   ✅ Constraint satisfaction (N-Queens, Sudoku)
//   ✅ Path finding in maze
//   ✅ Word search in grid
//
// TIME COMPLEXITY: Usually exponential O(2^n) or O(n!)
// But pruning can significantly reduce actual runtime.
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Subsets
// Generate all possible subsets (power set).
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
// ─────────────────────────────────────────────────────────────
function subsets(nums) {
  // APPROACH: Backtracking - at each step, include or exclude element
  // Time: O(2^n * n) | Space: O(2^n * n)
  const result = [];

  function backtrack(start, current) {
    result.push([...current]); // add current subset (including empty)

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);          // include nums[i]
      backtrack(i + 1, current);      // recurse with next elements
      current.pop();                  // BACKTRACK: exclude nums[i]
    }
  }

  backtrack(0, []);
  return result;
}
console.log("1. Subsets:", subsets([1,2,3]));
// [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Permutations
// Generate all permutations of distinct integers.
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// ─────────────────────────────────────────────────────────────
function permutations(nums) {
  // APPROACH: Backtracking - swap elements to generate permutations
  // Time: O(n! * n) | Space: O(n! * n)
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]); // complete permutation
      return;
    }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // swap
      backtrack(start + 1);                             // recurse
      [nums[start], nums[i]] = [nums[i], nums[start]]; // BACKTRACK: swap back
    }
  }

  backtrack(0);
  return result;
}
console.log("2. Permutations count:", permutations([1,2,3]).length); // 6

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Combinations
// Find all combinations of k numbers from 1 to n.
// Input: n = 4, k = 2 → Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
// ─────────────────────────────────────────────────────────────
function combine(n, k) {
  // APPROACH: Backtracking - choose k numbers, start from 'start' to avoid duplicates
  // Time: O(C(n,k) * k) | Space: O(C(n,k) * k)
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    // Pruning: remaining elements must be enough to fill k
    for (let i = start; i <= n - (k - current.length) + 1; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop(); // BACKTRACK
    }
  }

  backtrack(1, []);
  return result;
}
console.log("3. Combinations:", combine(4, 2));
// [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Combination Sum
// Find all combinations that sum to target (can reuse elements).
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// ─────────────────────────────────────────────────────────────
function combinationSum(candidates, target) {
  // APPROACH: Backtracking - try each candidate, allow reuse
  // Prune: if remaining < 0, stop
  // Time: O(n^(t/m)) where t=target, m=min candidate | Space: O(t/m)
  const result = [];
  candidates.sort((a, b) => a - b); // sort for pruning

  function backtrack(start, current, remaining) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // pruning: sorted, no point continuing
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]); // i (not i+1) allows reuse
      current.pop(); // BACKTRACK
    }
  }

  backtrack(0, [], target);
  return result;
}
console.log("4. Combination Sum:", combinationSum([2,3,6,7], 7)); // [[2,2,3],[7]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: N-Queens
// Place N queens on N×N board so no two queens attack each other.
// Input: n = 4 → Output: 2 solutions
// ─────────────────────────────────────────────────────────────
function solveNQueens(n) {
  // APPROACH: Backtracking - place queen row by row
  // Track: columns, diagonals, anti-diagonals used
  // Time: O(n!) | Space: O(n²)
  const result = [];
  const cols = new Set();
  const diag1 = new Set(); // row - col (top-left to bottom-right)
  const diag2 = new Set(); // row + col (top-right to bottom-left)

  function backtrack(row, board) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;

      // Place queen
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      board[row][col] = 'Q';

      backtrack(row + 1, board);

      // BACKTRACK: remove queen
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
      board[row][col] = '.';
    }
  }

  const board = Array.from({length: n}, () => new Array(n).fill('.'));
  backtrack(0, board);
  return result;
}
console.log("5. N-Queens (n=4):", solveNQueens(4).length, "solutions"); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Word Search
// Check if word exists in grid (can move up/down/left/right).
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
//        word = "ABCCED" → Output: true
// ─────────────────────────────────────────────────────────────
function wordSearch(board, word) {
  // APPROACH: DFS + Backtracking from each cell
  // Mark visited cells, unmark on backtrack
  // Time: O(m*n*4^L) where L = word length | Space: O(L)
  const m = board.length, n = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true; // found!
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;

    const temp = board[r][c];
    board[r][c] = '#'; // mark visited

    const found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) ||
                  dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1);

    board[r][c] = temp; // BACKTRACK: restore
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}
console.log("6. Word Search:", wordSearch(
  [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"
)); // true

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Palindrome Partitioning
// Partition string so every substring is a palindrome.
// Input: "aab" → Output: [["a","a","b"],["aa","b"]]
// ─────────────────────────────────────────────────────────────
function partition(s) {
  // APPROACH: Backtracking - try all possible partitions
  // Time: O(n * 2^n) | Space: O(n)
  const result = [];

  function isPalin(str, l, r) {
    while (l < r) {
      if (str[l++] !== str[r--]) return false;
    }
    return true;
  }

  function backtrack(start, current) {
    if (start === s.length) {
      result.push([...current]);
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      if (isPalin(s, start, end - 1)) {
        current.push(s.slice(start, end));
        backtrack(end, current);
        current.pop(); // BACKTRACK
      }
    }
  }

  backtrack(0, []);
  return result;
}
console.log("7. Palindrome Partition:", partition("aab")); // [["a","a","b"],["aa","b"]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Letter Combinations of Phone Number
// Return all possible letter combinations for phone digits.
// Input: "23" → Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// ─────────────────────────────────────────────────────────────
function letterCombinations(digits) {
  // APPROACH: Backtracking - for each digit, try all its letters
  // Time: O(4^n * n) | Space: O(4^n * n)
  if (!digits) return [];
  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  const result = [];

  function backtrack(idx, current) {
    if (idx === digits.length) {
      result.push(current);
      return;
    }
    for (let char of phone[digits[idx]]) {
      backtrack(idx + 1, current + char); // string concat (no need to pop)
    }
  }

  backtrack(0, '');
  return result;
}
console.log("8. Letter Combinations:", letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Generate Parentheses
// Generate all combinations of well-formed parentheses.
// Input: n = 3 → Output: ["((()))","(()())","(())()","()(())","()()()"]
// ─────────────────────────────────────────────────────────────
function generateParentheses(n) {
  // APPROACH: Backtracking with constraints
  // Add '(' if open count < n
  // Add ')' if close count < open count
  // Time: O(4^n / sqrt(n)) | Space: O(n)
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) backtrack(current + '(', open + 1, close);
    if (close < open) backtrack(current + ')', open, close + 1);
  }

  backtrack('', 0, 0);
  return result;
}
console.log("9. Generate Parentheses:", generateParentheses(3));
// ["((()))","(()())","(())()","()(())","()()()"]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Sudoku Solver
// Solve a 9×9 Sudoku puzzle.
// ─────────────────────────────────────────────────────────────
function solveSudoku(board) {
  // APPROACH: Backtracking - try digits 1-9 for each empty cell
  // Validate row, column, and 3×3 box constraints
  // Time: O(9^(empty cells)) | Space: O(1)
  function isValid(board, row, col, num) {
    const char = String(num);
    // Check row
    for (let c = 0; c < 9; c++) if (board[row][c] === char) return false;
    // Check column
    for (let r = 0; r < 9; r++) if (board[r][col] === char) return false;
    // Check 3×3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === char) return false;
      }
    }
    return true;
  }

  function solve(board) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num)) {
              board[r][c] = String(num); // place number
              if (solve(board)) return true;
              board[r][c] = '.'; // BACKTRACK
            }
          }
          return false; // no valid number found
        }
      }
    }
    return true; // all cells filled
  }

  solve(board);
  return board;
}
const sudoku = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
solveSudoku(sudoku);
console.log("10. Sudoku solved - first row:", sudoku[0].join('')); // 534678912

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                    | Approach          | Time        | Space
// ---------------------------|-------------------|-------------|------
// 1. Subsets                 | Backtracking      | O(2^n * n)  | O(2^n)
// 2. Permutations            | Backtracking      | O(n! * n)   | O(n!)
// 3. Combinations            | Backtracking      | O(C(n,k)*k) | O(k)
// 4. Combination Sum         | Backtracking      | O(n^(t/m))  | O(t/m)
// 5. N-Queens                | Backtracking      | O(n!)       | O(n²)
// 6. Word Search             | DFS+Backtracking  | O(m*n*4^L)  | O(L)
// 7. Palindrome Partition    | Backtracking      | O(n*2^n)    | O(n)
// 8. Letter Combinations     | Backtracking      | O(4^n * n)  | O(n)
// 9. Generate Parentheses    | Backtracking      | O(4^n/√n)   | O(n)
// 10. Sudoku Solver          | Backtracking      | O(9^m)      | O(1)
// ============================================================
