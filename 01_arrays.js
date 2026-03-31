// ============================================================
// 📚 TOPIC 1: ARRAYS
// ============================================================
//
// 🔑 CONCEPT:
// An array is a collection of elements stored at contiguous
// memory locations. It's the most basic data structure.
//
// KEY OPERATIONS:
//   - Access:  O(1)  → arr[i]
//   - Search:  O(n)  → loop through
//   - Insert:  O(n)  → shift elements
//   - Delete:  O(n)  → shift elements
//
// COMMON PATTERNS:
//   1. Prefix Sum      → precompute cumulative sums
//   2. Kadane's Algo   → max subarray
//   3. Two Pointers    → sorted array problems
//   4. Sorting         → sort then solve
//   5. HashMap         → O(1) lookups
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Two Sum
// Given an array of integers nums and a target, return indices
// of the two numbers that add up to target.
// Input: nums = [2,7,11,15], target = 9 → Output: [0,1]
// ─────────────────────────────────────────────────────────────
function twoSum(nums, target) {
  // APPROACH: HashMap - store each number's index
  // For each num, check if (target - num) already exists in map
  // Time: O(n) | Space: O(n)
  const map = new Map();
  for (let [i, num] of nums.entries()) {
    const diff = target - num;
    if (map.has(diff)) return [map.get(diff), i];
    map.set(num, i);
  }
  return [];
}
console.log("1. Two Sum:", twoSum([2, 7, 11, 15], 9)); // [0,1]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Best Time to Buy and Sell Stock
// Find the maximum profit from buying and selling once.
// Input: [7,1,5,3,6,4] → Output: 5 (buy at 1, sell at 6)
// ─────────────────────────────────────────────────────────────
function maxProfit(prices) {
  // APPROACH: Track minimum price seen so far, update max profit
  // Time: O(n) | Space: O(1)
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }
  return maxProfit;
}
console.log("2. Max Profit:", maxProfit([7, 1, 5, 3, 6, 4])); // 5

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Maximum Subarray (Kadane's Algorithm)
// Find the contiguous subarray with the largest sum.
// Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6 ([4,-1,2,1])
// ─────────────────────────────────────────────────────────────
function maxSubArray(nums) {
  // APPROACH: Kadane's - keep running sum, reset if negative
  // currentSum = max(num, currentSum + num)
  // Time: O(n) | Space: O(1)
  let currentSum = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}
console.log("3. Max Subarray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Contains Duplicate
// Return true if any value appears at least twice.
// Input: [1,2,3,1] → Output: true
// ─────────────────────────────────────────────────────────────
function containsDuplicate(nums) {
  // APPROACH: HashSet - if element already in set, duplicate found
  // Time: O(n) | Space: O(n)
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}
console.log("4. Contains Duplicate:", containsDuplicate([1, 2, 3, 1])); // true

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Product of Array Except Self
// Return array where output[i] = product of all elements except nums[i]
// Input: [1,2,3,4] → Output: [24,12,8,6]
// ─────────────────────────────────────────────────────────────
function productExceptSelf(nums) {
  // APPROACH: Left pass (prefix products) × Right pass (suffix products)
  // Time: O(n) | Space: O(n)
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left pass: result[i] = product of all elements to the LEFT of i
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right pass: multiply by product of all elements to the RIGHT of i
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}
console.log("5. Product Except Self:", productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Merge Intervals
// Merge all overlapping intervals.
// Input: [[1,3],[2,6],[8,10],[15,18]] → Output: [[1,6],[8,10],[15,18]]
// ─────────────────────────────────────────────────────────────
function mergeIntervals(intervals) {
  // APPROACH: Sort by start time, then merge overlapping
  // Time: O(n log n) | Space: O(n)
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      // Overlapping: extend the end
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}
console.log("6. Merge Intervals:", mergeIntervals([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Find Minimum in Rotated Sorted Array
// Input: [3,4,5,1,2] → Output: 1
// ─────────────────────────────────────────────────────────────
function findMin(nums) {
  // APPROACH: Binary Search - compare mid with right
  // If mid > right, minimum is in right half
  // Time: O(log n) | Space: O(1)
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1; // min is in right half
    } else {
      right = mid; // min is in left half (including mid)
    }
  }
  return nums[left];
}
console.log("7. Find Min in Rotated:", findMin([3, 4, 5, 1, 2])); // 1

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Move Zeroes
// Move all 0s to end while maintaining relative order of non-zero elements.
// Input: [0,1,0,3,12] → Output: [1,3,12,0,0]
// ─────────────────────────────────────────────────────────────
function moveZeroes(nums) {
  // APPROACH: Two pointers - insertPos tracks where next non-zero goes
  // Time: O(n) | Space: O(1)
  let insertPos = 0;
  for (let num of nums) {
    if (num !== 0) nums[insertPos++] = num;
  }
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
  return nums;
}
console.log("8. Move Zeroes:", moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Rotate Array
// Rotate array to the right by k steps.
// Input: nums = [1,2,3,4,5,6,7], k = 3 → Output: [5,6,7,1,2,3,4]
// ─────────────────────────────────────────────────────────────
function rotateArray(nums, k) {
  // APPROACH: Reverse trick
  // 1. Reverse entire array
  // 2. Reverse first k elements
  // 3. Reverse remaining elements
  // Time: O(n) | Space: O(1)
  k = k % nums.length;
  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
}
console.log("9. Rotate Array:", rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Find All Duplicates in an Array
// Given array of n integers where 1 ≤ a[i] ≤ n, find all duplicates.
// Input: [4,3,2,7,8,2,3,1] → Output: [2,3]
// ─────────────────────────────────────────────────────────────
function findDuplicates(nums) {
  // APPROACH: Use index as hash - negate visited index
  // If we visit index and it's already negative → duplicate!
  // Time: O(n) | Space: O(1) (output array doesn't count)
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] < 0) {
      result.push(idx + 1); // duplicate found
    } else {
      nums[idx] = -nums[idx]; // mark as visited
    }
  }
  return result;
}
console.log("10. Find Duplicates:", findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2,3]

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                        | Pattern          | Time    | Space
// -------------------------------|------------------|---------|------
// 1. Two Sum                     | HashMap          | O(n)    | O(n)
// 2. Best Time to Buy/Sell Stock | Greedy           | O(n)    | O(1)
// 3. Maximum Subarray            | Kadane's         | O(n)    | O(1)
// 4. Contains Duplicate          | HashSet          | O(n)    | O(n)
// 5. Product Except Self         | Prefix/Suffix    | O(n)    | O(n)
// 6. Merge Intervals             | Sort + Merge     | O(nlogn)| O(n)
// 7. Find Min in Rotated Array   | Binary Search    | O(logn) | O(1)
// 8. Move Zeroes                 | Two Pointers     | O(n)    | O(1)
// 9. Rotate Array                | Reverse Trick    | O(n)    | O(1)
// 10. Find All Duplicates        | Index as Hash    | O(n)    | O(1)
// ============================================================
