// ============================================================
// 📚 TOPIC 5: SLIDING WINDOW
// ============================================================
//
// 🔑 CONCEPT:
// Sliding Window maintains a "window" (subarray/substring) and
// slides it across the data to avoid redundant computation.
// Instead of recalculating from scratch, we ADD the new element
// and REMOVE the old element as the window slides.
//
// TYPES:
//
//   1. FIXED SIZE WINDOW (size = k)
//      ┌─────────┐
//      │ k items │ → slide right
//      └─────────┘
//      - Initialize first window
//      - Slide: add nums[right], remove nums[left]
//      - Use for: max/min/avg of k-size subarray
//
//   2. VARIABLE SIZE WINDOW
//      ┌──────────────────┐
//      │ expand/shrink    │
//      └──────────────────┘
//      - Expand right pointer
//      - Shrink left when condition violated
//      - Use for: longest/shortest subarray with condition
//
// TEMPLATE (Variable Window):
//   left = 0
//   for right = 0 to n-1:
//     add nums[right] to window
//     while window is invalid:
//       remove nums[left] from window
//       left++
//     update answer (right - left + 1)
//
// WHEN TO USE:
//   ✅ Contiguous subarray/substring problems
//   ✅ "Longest/shortest subarray with condition"
//   ✅ "Maximum/minimum sum of k elements"
//   ✅ "Number of distinct characters ≤ k"
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Maximum Sum Subarray of Size K (Fixed Window)
// Find the maximum sum of any contiguous subarray of size k.
// Input: nums = [2,1,5,1,3,2], k = 3 → Output: 9 ([5,1,3])
// ─────────────────────────────────────────────────────────────
function maxSumSubarrayK(nums, k) {
  // APPROACH: Fixed window - compute first window, then slide
  // Time: O(n) | Space: O(1)
  let windowSum = 0;
  // Compute sum of first window
  for (let i = 0; i < k; i++) windowSum += nums[i];

  let maxSum = windowSum;
  // Slide window: add right element, remove left element
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
console.log("1. Max Sum Subarray K:", maxSumSubarrayK([2,1,5,1,3,2], 3)); // 9

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Average of Subarrays of Size K (Fixed Window)
// Find the average of all contiguous subarrays of size k.
// Input: nums = [1,3,2,6,-1,4,1,8,2], k = 5
// Output: [2.2, 2.8, 2.4, 3.6, 2.8]
// ─────────────────────────────────────────────────────────────
function avgSubarrayK(nums, k) {
  // APPROACH: Fixed window - slide and compute average
  // Time: O(n) | Space: O(n)
  const result = [];
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  result.push(windowSum / k);

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    result.push(windowSum / k);
  }
  return result;
}
console.log("2. Avg Subarray K:", avgSubarrayK([1,3,2,6,-1,4,1,8,2], 5));
// [2.2, 2.8, 2.4, 3.6, 2.8]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Longest Substring Without Repeating Characters (Variable)
// Input: "abcabcbb" → Output: 3 ("abc")
// ─────────────────────────────────────────────────────────────
function longestSubstringNoRepeat(s) {
  // APPROACH: Variable window with HashMap
  // Expand right, when duplicate found shrink left past it
  // Time: O(n) | Space: O(min(n,26))
  const map = new Map(); // char → last seen index
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1; // shrink window past duplicate
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
console.log("3. Longest No Repeat:", longestSubstringNoRepeat("abcabcbb")); // 3
console.log("3. Longest No Repeat:", longestSubstringNoRepeat("pwwkew")); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Minimum Size Subarray Sum (Variable Window)
// Find minimum length subarray with sum ≥ target.
// Input: target = 7, nums = [2,3,1,2,4,3] → Output: 2 ([4,3])
// ─────────────────────────────────────────────────────────────
function minSubArrayLen(target, nums) {
  // APPROACH: Variable window - expand right, shrink left when sum >= target
  // Time: O(n) | Space: O(1)
  let left = 0, sum = 0, minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // expand window
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left]; // shrink window
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
console.log("4. Min Subarray Sum:", minSubArrayLen(7, [2,3,1,2,4,3])); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Longest Substring with At Most K Distinct Characters
// Input: s = "eceba", k = 2 → Output: 3 ("ece")
// ─────────────────────────────────────────────────────────────
function longestSubstringKDistinct(s, k) {
  // APPROACH: Variable window with frequency map
  // Expand right, when distinct chars > k, shrink left
  // Time: O(n) | Space: O(k)
  const freq = new Map();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    freq.set(char, (freq.get(char) || 0) + 1); // add to window

    while (freq.size > k) { // too many distinct chars
      const leftChar = s[left];
      freq.set(leftChar, freq.get(leftChar) - 1);
      if (freq.get(leftChar) === 0) freq.delete(leftChar);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
console.log("5. Longest K Distinct:", longestSubstringKDistinct("eceba", 2)); // 3
console.log("5. Longest K Distinct:", longestSubstringKDistinct("aa", 1)); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Permutation in String
// Check if s2 contains a permutation of s1.
// Input: s1 = "ab", s2 = "eidbaooo" → Output: true ("ba" is in s2)
// ─────────────────────────────────────────────────────────────
function checkInclusion(s1, s2) {
  // APPROACH: Fixed window of size s1.length
  // Compare frequency maps of window and s1
  // Time: O(n) | Space: O(1) - 26 chars
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);

  for (let char of s1) need[char.charCodeAt(0) - a]++;

  for (let i = 0; i < s2.length; i++) {
    window[s2.charCodeAt(i) - a]++; // add right char

    if (i >= s1.length) {
      window[s2.charCodeAt(i - s1.length) - a]--; // remove left char
    }

    if (window.join(',') === need.join(',')) return true;
  }
  return false;
}
console.log("6. Permutation in String:", checkInclusion("ab", "eidbaooo")); // true
console.log("6. Permutation in String:", checkInclusion("ab", "eidboaoo")); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Maximum Number of Vowels in Substring of Length K
// Input: s = "abciiidef", k = 3 → Output: 3 ("iii")
// ─────────────────────────────────────────────────────────────
function maxVowels(s, k) {
  // APPROACH: Fixed window - count vowels, slide
  // Time: O(n) | Space: O(1)
  const vowels = new Set(['a','e','i','o','u']);
  let count = 0, maxCount = 0;

  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i])) count++; // add right
    if (i >= k && vowels.has(s[i - k])) count--; // remove left
    maxCount = Math.max(maxCount, count);
  }
  return maxCount;
}
console.log("7. Max Vowels:", maxVowels("abciiidef", 3)); // 3
console.log("7. Max Vowels:", maxVowels("aeiou", 2)); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Longest Repeating Character Replacement
// Replace at most k characters to get longest substring of same char.
// Input: s = "AABABBA", k = 1 → Output: 4
// ─────────────────────────────────────────────────────────────
function characterReplacement(s, k) {
  // APPROACH: Variable window
  // Window is valid if: (window size - max frequency char) <= k
  // We only need to replace the non-dominant characters
  // Time: O(n) | Space: O(1)
  const freq = new Array(26).fill(0);
  const A = 'A'.charCodeAt(0);
  let left = 0, maxFreq = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    freq[s.charCodeAt(right) - A]++;
    maxFreq = Math.max(maxFreq, freq[s.charCodeAt(right) - A]);

    // If replacements needed > k, shrink window
    while ((right - left + 1) - maxFreq > k) {
      freq[s.charCodeAt(left) - A]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
console.log("8. Char Replacement:", characterReplacement("AABABBA", 1)); // 4
console.log("8. Char Replacement:", characterReplacement("ABAB", 2)); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Max Consecutive Ones III
// Flip at most k 0s to 1s. Find max consecutive 1s.
// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2 → Output: 6
// ─────────────────────────────────────────────────────────────
function longestOnes(nums, k) {
  // APPROACH: Variable window - count zeros in window
  // When zeros > k, shrink from left
  // Time: O(n) | Space: O(1)
  let left = 0, zeros = 0, maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;

    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
console.log("9. Max Consecutive Ones:", longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // 6

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Sliding Window Maximum
// Find the maximum in each sliding window of size k.
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// ─────────────────────────────────────────────────────────────
function maxSlidingWindow(nums, k) {
  // APPROACH: Deque (monotonic decreasing queue)
  // Deque stores indices, front always has the max
  // Remove elements outside window, remove smaller elements from back
  // Time: O(n) | Space: O(k)
  const deque = []; // stores indices
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside the window
    while (deque.length && deque[0] < i - k + 1) deque.shift();

    // Remove smaller elements from back (they'll never be max)
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Start adding results once first window is complete
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}
console.log("10. Sliding Window Max:", maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
// [3,3,5,5,6,7]

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                          | Type     | Time  | Space
// ---------------------------------|----------|-------|------
// 1. Max Sum Subarray K            | Fixed    | O(n)  | O(1)
// 2. Average Subarray K            | Fixed    | O(n)  | O(n)
// 3. Longest No Repeat Substring   | Variable | O(n)  | O(n)
// 4. Min Size Subarray Sum         | Variable | O(n)  | O(1)
// 5. Longest K Distinct Chars      | Variable | O(n)  | O(k)
// 6. Permutation in String         | Fixed    | O(n)  | O(1)
// 7. Max Vowels in K Length        | Fixed    | O(n)  | O(1)
// 8. Char Replacement              | Variable | O(n)  | O(1)
// 9. Max Consecutive Ones III      | Variable | O(n)  | O(1)
// 10. Sliding Window Maximum       | Fixed+DQ | O(n)  | O(k)
// ============================================================
