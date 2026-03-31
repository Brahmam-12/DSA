// ============================================================
// 📚 TOPIC 2: STRINGS
// ============================================================
//
// 🔑 CONCEPT:
// A string is a sequence of characters. In JavaScript, strings
// are immutable (you can't change individual characters).
//
// KEY OPERATIONS:
//   - Access char:    O(1)  → str[i]
//   - Length:         O(1)  → str.length
//   - Substring:      O(k)  → str.slice(i, j)
//   - Concatenation:  O(n)  → str1 + str2
//   - Split:          O(n)  → str.split('')
//
// COMMON PATTERNS:
//   1. Two Pointers    → palindrome, reverse
//   2. Sliding Window  → substring problems
//   3. HashMap         → frequency count, anagram
//   4. Stack           → valid parentheses, decode
//   5. Sort            → anagram grouping
//
// USEFUL JS STRING METHODS:
//   str.split('')         → array of chars
//   str.split('').reverse().join('')  → reverse string
//   str.toLowerCase()     → lowercase
//   str.charCodeAt(i)     → ASCII code
//   str.includes(sub)     → check substring
//   str.indexOf(sub)      → find position
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Valid Palindrome
// A phrase is a palindrome if it reads the same forward and backward
// (ignoring non-alphanumeric characters and case).
// Input: "A man, a plan, a canal: Panama" → Output: true
// ─────────────────────────────────────────────────────────────
function isPalindrome(s) {
  // APPROACH: Two pointers from both ends, skip non-alphanumeric
  // Time: O(n) | Space: O(1)
  let left = 0, right = s.length - 1;
  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !isAlphanumeric(s[left])) left++;
    // Skip non-alphanumeric from right
    while (left < right && !isAlphanumeric(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}
function isAlphanumeric(c) {
  return /[a-zA-Z0-9]/.test(c);
}
console.log("1. Valid Palindrome:", isPalindrome("A man, a plan, a canal: Panama")); // true
console.log("1. Valid Palindrome:", isPalindrome("race a car")); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Valid Anagram
// Given two strings s and t, return true if t is an anagram of s.
// Input: s = "anagram", t = "nagaram" → Output: true
// ─────────────────────────────────────────────────────────────
function isAnagram(s, t) {
  // APPROACH: Count character frequencies using HashMap
  // Time: O(n) | Space: O(1) - at most 26 chars
  if (s.length !== t.length) return false;
  const count = new Map();
  for (let char of s) count.set(char, (count.get(char) || 0) + 1);
  for (let char of t) {
    if (!count.has(char) || count.get(char) === 0) return false;
    count.set(char, count.get(char) - 1);
  }
  return true;
}
console.log("2. Valid Anagram:", isAnagram("anagram", "nagaram")); // true
console.log("2. Valid Anagram:", isAnagram("rat", "car")); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Longest Substring Without Repeating Characters
// Input: "abcabcbb" → Output: 3 ("abc")
// ─────────────────────────────────────────────────────────────
function lengthOfLongestSubstring(s) {
  // APPROACH: Sliding Window with HashMap
  // Expand right, when duplicate found shrink left past the duplicate
  // Time: O(n) | Space: O(min(n, 26))
  const map = new Map(); // char → last seen index
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char)) {
      // Move left pointer past the previous occurrence
      left = Math.max(left, map.get(char) + 1);
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
console.log("3. Longest Substring:", lengthOfLongestSubstring("abcabcbb")); // 3
console.log("3. Longest Substring:", lengthOfLongestSubstring("pwwkew")); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Reverse Words in a String
// Given a string s, reverse the order of the words.
// Input: "  hello world  " → Output: "world hello"
// ─────────────────────────────────────────────────────────────
function reverseWords(s) {
  // APPROACH: Split by spaces, filter empty strings, reverse, join
  // Time: O(n) | Space: O(n)
  return s.trim().split(/\s+/).reverse().join(" ");
}
console.log("4. Reverse Words:", reverseWords("  hello world  ")); // "world hello"
console.log("4. Reverse Words:", reverseWords("the sky is blue")); // "blue is sky the"

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Longest Common Prefix
// Find the longest common prefix string amongst an array of strings.
// Input: ["flower","flow","flight"] → Output: "fl"
// ─────────────────────────────────────────────────────────────
function longestCommonPrefix(strs) {
  // APPROACH: Use first string as reference, compare char by char
  // Time: O(n * m) where m = length of shortest string | Space: O(1)
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    // Shrink prefix until it matches start of strs[i]
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}
console.log("5. Longest Common Prefix:", longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log("5. Longest Common Prefix:", longestCommonPrefix(["dog","racecar","car"])); // ""

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Valid Parentheses
// Given a string of brackets, determine if it's valid.
// Input: "()[]{}" → Output: true
// Input: "([)]"   → Output: false
// ─────────────────────────────────────────────────────────────
function isValidParentheses(s) {
  // APPROACH: Stack - push open brackets, pop and match close brackets
  // Time: O(n) | Space: O(n)
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if ('({['.includes(char)) {
      stack.push(char); // push opening bracket
    } else {
      if (stack.pop() !== map[char]) return false; // mismatch
    }
  }
  return stack.length === 0; // stack must be empty
}
console.log("6. Valid Parentheses:", isValidParentheses("()[]{}")); // true
console.log("6. Valid Parentheses:", isValidParentheses("([)]")); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: String Compression
// Compress string using counts of repeated characters.
// Input: "aabcccccaaa" → Output: "a2b1c5a3"
// ─────────────────────────────────────────────────────────────
function compressString(s) {
  // APPROACH: Count consecutive chars, build result string
  // Time: O(n) | Space: O(n)
  let result = "";
  let count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      result += s[i - 1] + count;
      count = 1;
    }
  }
  return result.length < s.length ? result : s;
}
console.log("7. String Compression:", compressString("aabcccccaaa")); // "a2b1c5a3"
console.log("7. String Compression:", compressString("abcd")); // "abcd" (no compression)

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Count and Say
// The count-and-say sequence: 1 → "1", 2 → "11", 3 → "21", 4 → "1211"
// Input: n = 4 → Output: "1211"
// ─────────────────────────────────────────────────────────────
function countAndSay(n) {
  // APPROACH: Build each term from previous term
  // Read digits and say how many of each
  // Time: O(2^n) | Space: O(2^n)
  let result = "1";
  for (let i = 1; i < n; i++) {
    let next = "";
    let count = 1;
    for (let j = 1; j <= result.length; j++) {
      if (j < result.length && result[j] === result[j - 1]) {
        count++;
      } else {
        next += count + result[j - 1];
        count = 1;
      }
    }
    result = next;
  }
  return result;
}
console.log("8. Count and Say:", countAndSay(4)); // "1211"
console.log("8. Count and Say:", countAndSay(5)); // "111221"

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Minimum Window Substring
// Find the minimum window in s which contains all chars of t.
// Input: s = "ADOBECODEBANC", t = "ABC" → Output: "BANC"
// ─────────────────────────────────────────────────────────────
function minWindow(s, t) {
  // APPROACH: Sliding Window with two frequency maps
  // Expand right until all chars found, then shrink left
  // Time: O(n) | Space: O(n)
  if (!s || !t || s.length < t.length) return "";

  const need = new Map();
  for (let char of t) need.set(char, (need.get(char) || 0) + 1);

  let have = 0, required = need.size;
  let left = 0, minLen = Infinity, minStart = 0;
  const window = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    window.set(char, (window.get(char) || 0) + 1);

    // Check if current char satisfies a requirement
    if (need.has(char) && window.get(char) === need.get(char)) have++;

    // Shrink window from left while all requirements are met
    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) have--;
      left++;
    }
  }
  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}
console.log("9. Min Window Substring:", minWindow("ADOBECODEBANC", "ABC")); // "BANC"

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Decode String
// Decode encoded string: "3[a2[c]]" → "accaccacc"
// ─────────────────────────────────────────────────────────────
function decodeString(s) {
  // APPROACH: Stack - push current string and count when '[' found
  // When ']' found, pop and repeat
  // Time: O(n * max_k) | Space: O(n)
  const stack = [];
  let currentStr = "";
  let currentNum = 0;

  for (let char of s) {
    if (char >= '0' && char <= '9') {
      currentNum = currentNum * 10 + parseInt(char); // handle multi-digit numbers
    } else if (char === '[') {
      stack.push([currentStr, currentNum]); // save current state
      currentStr = "";
      currentNum = 0;
    } else if (char === ']') {
      const [prevStr, num] = stack.pop();
      currentStr = prevStr + currentStr.repeat(num); // repeat and append
    } else {
      currentStr += char;
    }
  }
  return currentStr;
}
console.log("10. Decode String:", decodeString("3[a2[c]]")); // "accaccacc"
console.log("10. Decode String:", decodeString("2[abc]3[cd]ef")); // "abcabccdcdcdef"

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                          | Pattern          | Time      | Space
// ---------------------------------|------------------|-----------|------
// 1. Valid Palindrome              | Two Pointers     | O(n)      | O(1)
// 2. Valid Anagram                 | HashMap          | O(n)      | O(1)
// 3. Longest Substring No Repeat   | Sliding Window   | O(n)      | O(n)
// 4. Reverse Words                 | Split/Reverse    | O(n)      | O(n)
// 5. Longest Common Prefix         | Horizontal Scan  | O(n*m)    | O(1)
// 6. Valid Parentheses             | Stack            | O(n)      | O(n)
// 7. String Compression            | Two Pointers     | O(n)      | O(n)
// 8. Count and Say                 | Simulation       | O(2^n)    | O(2^n)
// 9. Minimum Window Substring      | Sliding Window   | O(n)      | O(n)
// 10. Decode String                | Stack            | O(n*k)    | O(n)
// ============================================================
