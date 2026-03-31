// ============================================================
// 📚 TOPIC 3: HASHING (HashMap & HashSet)
// ============================================================
//
// 🔑 CONCEPT:
// Hashing maps data to a fixed-size value (hash) for O(1) lookup.
// JavaScript provides:
//   - Map  → key-value pairs (any type as key)
//   - Set  → unique values only
//   - {}   → object (string keys only)
//
// KEY OPERATIONS (Average Case):
//   - Insert:  O(1)
//   - Delete:  O(1)
//   - Search:  O(1)
//   - Worst case (collision): O(n)
//
// WHEN TO USE HASHING:
//   ✅ Count frequencies
//   ✅ Check if element exists (O(1) vs O(n) for array)
//   ✅ Group elements by property
//   ✅ Cache/memoize results
//   ✅ Find pairs/complements
//
// MAP vs SET:
//   Map  → need to store key-value pairs (e.g., char → count)
//   Set  → only need to track existence (e.g., seen elements)
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Two Sum (Classic HashMap)
// Return indices of two numbers that add up to target.
// Input: nums = [2,7,11,15], target = 9 → Output: [0,1]
// ─────────────────────────────────────────────────────────────
function twoSum(nums, target) {
  // KEY INSIGHT: For each num, we need (target - num)
  // Store num → index in map, check if complement exists
  // Time: O(n) | Space: O(n)
  const map = new Map(); // num → index
  for (let [i, num] of nums.entries()) {
    const complement = target - num;
    if (map.has(complement)) return [map.get(complement), i];
    map.set(num, i);
  }
  return [];
}
console.log("1. Two Sum:", twoSum([2, 7, 11, 15], 9)); // [0,1]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Group Anagrams
// Group strings that are anagrams of each other.
// Input: ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// ─────────────────────────────────────────────────────────────
function groupAnagrams(strs) {
  // KEY INSIGHT: Anagrams have the same sorted characters
  // Use sorted string as key in HashMap
  // Time: O(n * k log k) where k = max string length | Space: O(n*k)
  const map = new Map();
  for (let str of strs) {
    const key = str.split('').sort().join(''); // sorted chars = key
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}
console.log("2. Group Anagrams:", groupAnagrams(["eat","tea","tan","ate","nat","bat"]));

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Top K Frequent Elements
// Return the k most frequent elements.
// Input: nums = [1,1,1,2,2,3], k = 2 → Output: [1,2]
// ─────────────────────────────────────────────────────────────
function topKFrequent(nums, k) {
  // KEY INSIGHT: Count frequencies, then use bucket sort
  // Bucket index = frequency, collect from highest bucket
  // Time: O(n) | Space: O(n)
  const freq = new Map();
  for (let num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  // Bucket sort: index = frequency
  const buckets = Array(nums.length + 1).fill(null).map(() => []);
  for (let [num, count] of freq) buckets[count].push(num);

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}
console.log("3. Top K Frequent:", topKFrequent([1,1,1,2,2,3], 2)); // [1,2]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Longest Consecutive Sequence
// Find the length of the longest consecutive elements sequence.
// Input: [100,4,200,1,3,2] → Output: 4 (sequence: 1,2,3,4)
// ─────────────────────────────────────────────────────────────
function longestConsecutive(nums) {
  // KEY INSIGHT: Use Set for O(1) lookup
  // Only start counting from the beginning of a sequence (num-1 not in set)
  // Time: O(n) | Space: O(n)
  const set = new Set(nums);
  let maxLen = 0;

  for (let num of set) {
    // Only start from the beginning of a sequence
    if (!set.has(num - 1)) {
      let current = num;
      let length = 1;
      while (set.has(current + 1)) {
        current++;
        length++;
      }
      maxLen = Math.max(maxLen, length);
    }
  }
  return maxLen;
}
console.log("4. Longest Consecutive:", longestConsecutive([100,4,200,1,3,2])); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Subarray Sum Equals K
// Count the number of subarrays that sum to k.
// Input: nums = [1,1,1], k = 2 → Output: 2
// ─────────────────────────────────────────────────────────────
function subarraySum(nums, k) {
  // KEY INSIGHT: Prefix sum + HashMap
  // If prefixSum[j] - prefixSum[i] = k, then subarray [i+1..j] sums to k
  // Store count of each prefix sum seen so far
  // Time: O(n) | Space: O(n)
  const map = new Map();
  map.set(0, 1); // empty subarray has sum 0
  let prefixSum = 0, count = 0;

  for (let num of nums) {
    prefixSum += num;
    // Check if (prefixSum - k) exists → means a subarray sums to k
    if (map.has(prefixSum - k)) count += map.get(prefixSum - k);
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
}
console.log("5. Subarray Sum = K:", subarraySum([1,1,1], 2)); // 2
console.log("5. Subarray Sum = K:", subarraySum([1,2,3], 3)); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: First Non-Repeating Character
// Find the first character that appears only once.
// Input: "leetcode" → Output: 0 (index of 'l')
// ─────────────────────────────────────────────────────────────
function firstUniqChar(s) {
  // KEY INSIGHT: Count frequencies, then find first with count = 1
  // Time: O(n) | Space: O(1) - at most 26 chars
  const freq = new Map();
  for (let char of s) freq.set(char, (freq.get(char) || 0) + 1);
  for (let [i, char] of [...s].entries()) {
    if (freq.get(char) === 1) return i;
  }
  return -1;
}
console.log("6. First Unique Char:", firstUniqChar("leetcode")); // 0
console.log("6. First Unique Char:", firstUniqChar("aabb")); // -1

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Intersection of Two Arrays
// Return array of unique elements that appear in both arrays.
// Input: nums1 = [1,2,2,1], nums2 = [2,2] → Output: [2]
// ─────────────────────────────────────────────────────────────
function intersection(nums1, nums2) {
  // KEY INSIGHT: Put nums1 in a Set, check each nums2 element
  // Time: O(n + m) | Space: O(n)
  const set1 = new Set(nums1);
  const result = new Set();
  for (let num of nums2) {
    if (set1.has(num)) result.add(num);
  }
  return [...result];
}
console.log("7. Intersection:", intersection([1,2,2,1], [2,2])); // [2]
console.log("7. Intersection:", intersection([4,9,5], [9,4,9,8,4])); // [9,4]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Happy Number
// A happy number: replace number with sum of squares of its digits,
// repeat until 1 (happy) or cycle (not happy).
// Input: 19 → Output: true (1² + 9² = 82 → 8²+2² = 68 → ... → 1)
// ─────────────────────────────────────────────────────────────
function isHappy(n) {
  // KEY INSIGHT: Use Set to detect cycles
  // If we see a number we've seen before → cycle → not happy
  // Time: O(log n) | Space: O(log n)
  const seen = new Set();
  while (n !== 1) {
    if (seen.has(n)) return false; // cycle detected
    seen.add(n);
    n = sumOfSquares(n);
  }
  return true;
}
function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}
console.log("8. Happy Number:", isHappy(19)); // true
console.log("8. Happy Number:", isHappy(2)); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Word Pattern
// Check if string s follows the same pattern.
// Input: pattern = "abba", s = "dog cat cat dog" → Output: true
// ─────────────────────────────────────────────────────────────
function wordPattern(pattern, s) {
  // KEY INSIGHT: Bijection - each pattern char maps to exactly one word
  // Use two maps: char→word and word→char
  // Time: O(n) | Space: O(n)
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (charToWord.has(char) && charToWord.get(char) !== word) return false;
    if (wordToChar.has(word) && wordToChar.get(word) !== char) return false;

    charToWord.set(char, word);
    wordToChar.set(word, char);
  }
  return true;
}
console.log("9. Word Pattern:", wordPattern("abba", "dog cat cat dog")); // true
console.log("9. Word Pattern:", wordPattern("abba", "dog cat cat fish")); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Four Sum Count (4Sum II)
// Count tuples (i,j,k,l) such that nums1[i]+nums2[j]+nums3[k]+nums4[l] = 0
// Input: nums1=[1,2], nums2=[-2,-1], nums3=[-1,2], nums4=[0,2] → Output: 2
// ─────────────────────────────────────────────────────────────
function fourSumCount(nums1, nums2, nums3, nums4) {
  // KEY INSIGHT: Split into two pairs, store sums of first pair in map
  // For each sum in second pair, check if its negation exists in map
  // Time: O(n²) | Space: O(n²)
  const map = new Map();
  for (let a of nums1) {
    for (let b of nums2) {
      const sum = a + b;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }
  let count = 0;
  for (let c of nums3) {
    for (let d of nums4) {
      const target = -(c + d);
      if (map.has(target)) count += map.get(target);
    }
  }
  return count;
}
console.log("10. Four Sum Count:", fourSumCount([1,2],[-2,-1],[-1,2],[0,2])); // 2

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                    | Data Structure | Time    | Space
// ---------------------------|----------------|---------|------
// 1. Two Sum                 | Map            | O(n)    | O(n)
// 2. Group Anagrams          | Map            | O(nklogk)| O(nk)
// 3. Top K Frequent          | Map + Bucket   | O(n)    | O(n)
// 4. Longest Consecutive     | Set            | O(n)    | O(n)
// 5. Subarray Sum = K        | Map (prefix)   | O(n)    | O(n)
// 6. First Unique Char       | Map            | O(n)    | O(1)
// 7. Intersection            | Set            | O(n+m)  | O(n)
// 8. Happy Number            | Set            | O(logn) | O(logn)
// 9. Word Pattern            | Map + Map      | O(n)    | O(n)
// 10. Four Sum Count         | Map            | O(n²)   | O(n²)
// ============================================================
