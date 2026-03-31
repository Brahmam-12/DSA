// ============================================================
// 📚 TOPIC 13: DYNAMIC PROGRAMMING (DP)
// ============================================================
//
// 🔑 CONCEPT:
// Dynamic Programming solves problems by breaking them into
// overlapping subproblems and storing results to avoid recomputation.
//
// DP = Recursion + Memoization (or Tabulation)
//
// TWO APPROACHES:
//
//   1. TOP-DOWN (Memoization):
//      - Start from the original problem
//      - Recursively solve subproblems
//      - Cache results in a memo table
//      - "Lazy" - only computes what's needed
//
//   2. BOTTOM-UP (Tabulation):
//      - Start from the smallest subproblems
//      - Build up to the original problem
//      - Fill a DP table iteratively
//      - "Eager" - computes all subproblems
//
// WHEN TO USE DP:
//   ✅ Optimal substructure: optimal solution uses optimal subsolutions
//   ✅ Overlapping subproblems: same subproblems solved multiple times
//   ✅ "Maximum/minimum" problems
//   ✅ "Count the number of ways"
//   ✅ "Is it possible to..."
//
// COMMON DP PATTERNS:
//   1. 1D DP (Fibonacci-like)
//   2. 2D DP (Grid problems)
//   3. Knapsack (0/1, unbounded)
//   4. Longest Common Subsequence
//   5. Interval DP
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Climbing Stairs
// How many ways to climb n stairs (1 or 2 steps at a time)?
// Input: n = 5 → Output: 8
// ─────────────────────────────────────────────────────────────
function climbStairs(n) {
  // APPROACH: Bottom-up DP (Fibonacci pattern)
  // dp[i] = ways to reach step i = dp[i-1] + dp[i-2]
  // Time: O(n) | Space: O(1)
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
console.log("1. Climb Stairs:", climbStairs(5)); // 8
console.log("1. Climb Stairs:", climbStairs(10)); // 89

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: House Robber
// Rob houses without robbing adjacent ones. Maximize amount.
// Input: [2,7,9,3,1] → Output: 12 (2+9+1)
// ─────────────────────────────────────────────────────────────
function rob(nums) {
  // APPROACH: dp[i] = max money robbing up to house i
  // dp[i] = max(dp[i-1], dp[i-2] + nums[i])
  // Time: O(n) | Space: O(1)
  if (!nums.length) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
console.log("2. House Robber:", rob([2,7,9,3,1])); // 12
console.log("2. House Robber:", rob([1,2,3,1])); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Coin Change
// Find minimum number of coins to make amount.
// Input: coins = [1,5,11], amount = 15 → Output: 3 (5+5+5)
// ─────────────────────────────────────────────────────────────
function coinChange(coins, amount) {
  // APPROACH: Bottom-up DP
  // dp[i] = min coins to make amount i
  // dp[i] = min(dp[i], dp[i - coin] + 1) for each coin
  // Time: O(amount * coins.length) | Space: O(amount)
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins needed for amount 0

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log("3. Coin Change:", coinChange([1,5,11], 15)); // 3
console.log("3. Coin Change:", coinChange([2], 3)); // -1

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Longest Increasing Subsequence (LIS)
// Find the length of the longest strictly increasing subsequence.
// Input: [10,9,2,5,3,7,101,18] → Output: 4 ([2,3,7,101])
// ─────────────────────────────────────────────────────────────
function lengthOfLIS(nums) {
  // APPROACH: dp[i] = length of LIS ending at index i
  // dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
  // Time: O(n²) | Space: O(n)
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}
console.log("4. LIS:", lengthOfLIS([10,9,2,5,3,7,101,18])); // 4
console.log("4. LIS:", lengthOfLIS([0,1,0,3,2,3])); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Longest Common Subsequence (LCS)
// Find the length of the longest common subsequence of two strings.
// Input: text1 = "abcde", text2 = "ace" → Output: 3 ("ace")
// ─────────────────────────────────────────────────────────────
function longestCommonSubsequence(text1, text2) {
  // APPROACH: 2D DP table
  // dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
  // If chars match: dp[i][j] = dp[i-1][j-1] + 1
  // Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  // Time: O(m*n) | Space: O(m*n)
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1; // chars match
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); // take best
      }
    }
  }
  return dp[m][n];
}
console.log("5. LCS:", longestCommonSubsequence("abcde", "ace")); // 3
console.log("5. LCS:", longestCommonSubsequence("abc", "abc")); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: 0/1 Knapsack
// Given weights and values, maximize value within weight capacity.
// Input: weights=[1,3,4,5], values=[1,4,5,7], capacity=7 → Output: 9
// ─────────────────────────────────────────────────────────────
function knapsack(weights, values, capacity) {
  // APPROACH: 2D DP
  // dp[i][w] = max value using first i items with capacity w
  // Include item i: dp[i-1][w-weights[i]] + values[i]
  // Exclude item i: dp[i-1][w]
  // Time: O(n * capacity) | Space: O(n * capacity)
  const n = weights.length;
  const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w]; // don't include item i
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  return dp[n][capacity];
}
console.log("6. Knapsack:", knapsack([1,3,4,5], [1,4,5,7], 7)); // 9

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Word Break
// Check if string can be segmented into dictionary words.
// Input: s = "leetcode", wordDict = ["leet","code"] → Output: true
// ─────────────────────────────────────────────────────────────
function wordBreak(s, wordDict) {
  // APPROACH: dp[i] = can s[0..i-1] be segmented?
  // dp[i] = true if dp[j] is true AND s[j..i-1] is in dict
  // Time: O(n² * m) where m = avg word length | Space: O(n)
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // empty string can always be segmented

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
console.log("7. Word Break:", wordBreak("leetcode", ["leet","code"])); // true
console.log("7. Word Break:", wordBreak("catsandog", ["cats","dog","sand","and","cat"])); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Unique Paths
// Count unique paths from top-left to bottom-right in m×n grid.
// Input: m = 3, n = 7 → Output: 28
// ─────────────────────────────────────────────────────────────
function uniquePaths(m, n) {
  // APPROACH: dp[i][j] = paths to reach cell (i,j)
  // dp[i][j] = dp[i-1][j] + dp[i][j-1] (from top + from left)
  // Time: O(m*n) | Space: O(n) - only need previous row
  const dp = new Array(n).fill(1); // first row all 1s

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j-1]; // dp[j] = from top, dp[j-1] = from left
    }
  }
  return dp[n-1];
}
console.log("8. Unique Paths:", uniquePaths(3, 7)); // 28
console.log("8. Unique Paths:", uniquePaths(3, 2)); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Edit Distance (Levenshtein Distance)
// Find minimum operations (insert, delete, replace) to convert word1 to word2.
// Input: word1 = "horse", word2 = "ros" → Output: 3
// ─────────────────────────────────────────────────────────────
function minDistance(word1, word2) {
  // APPROACH: 2D DP
  // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
  // If chars match: dp[i][j] = dp[i-1][j-1]
  // Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
  //                         (delete)    (insert)    (replace)
  // Time: O(m*n) | Space: O(m*n)
  const m = word1.length, n = word2.length;
  const dp = Array.from({length: m + 1}, (_, i) =>
    Array.from({length: n + 1}, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i-1] === word2[j-1]) {
        dp[i][j] = dp[i-1][j-1]; // no operation needed
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i-1][j],   // delete from word1
          dp[i][j-1],   // insert into word1
          dp[i-1][j-1]  // replace in word1
        );
      }
    }
  }
  return dp[m][n];
}
console.log("9. Edit Distance:", minDistance("horse", "ros")); // 3
console.log("9. Edit Distance:", minDistance("intention", "execution")); // 5

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Partition Equal Subset Sum
// Check if array can be partitioned into two equal-sum subsets.
// Input: [1,5,11,5] → Output: true ([1,5,5] and [11])
// ─────────────────────────────────────────────────────────────
function canPartition(nums) {
  // APPROACH: 0/1 Knapsack variant
  // Target = total sum / 2
  // dp[j] = can we achieve sum j using some elements?
  // Time: O(n * sum) | Space: O(sum)
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false; // odd sum can't be split equally

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // sum 0 is always achievable

  for (let num of nums) {
    // Traverse backwards to avoid using same element twice
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}
console.log("10. Can Partition:", canPartition([1,5,11,5])); // true
console.log("10. Can Partition:", canPartition([1,2,3,5])); // false

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                    | DP Type       | Time        | Space
// ---------------------------|---------------|-------------|------
// 1. Climbing Stairs         | 1D (Fibonacci)| O(n)        | O(1)
// 2. House Robber            | 1D            | O(n)        | O(1)
// 3. Coin Change             | 1D Unbounded  | O(n*amount) | O(amount)
// 4. LIS                     | 1D            | O(n²)       | O(n)
// 5. LCS                     | 2D            | O(m*n)      | O(m*n)
// 6. 0/1 Knapsack            | 2D            | O(n*W)      | O(n*W)
// 7. Word Break              | 1D            | O(n²)       | O(n)
// 8. Unique Paths            | 2D Grid       | O(m*n)      | O(n)
// 9. Edit Distance           | 2D            | O(m*n)      | O(m*n)
// 10. Partition Equal Subset | 1D Knapsack   | O(n*sum)    | O(sum)
// ============================================================
