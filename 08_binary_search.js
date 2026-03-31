// ============================================================
// 📚 TOPIC 8: BINARY SEARCH
// ============================================================
//
// 🔑 CONCEPT:
// Binary Search works on SORTED arrays by repeatedly halving
// the search space. Instead of checking every element O(n),
// we eliminate half the elements each step → O(log n).
//
// CORE TEMPLATE:
//   left = 0, right = n - 1
//   while (left <= right):
//     mid = left + Math.floor((right - left) / 2)
//     if arr[mid] === target: return mid
//     if arr[mid] < target:  left = mid + 1   (search right half)
//     else:                  right = mid - 1  (search left half)
//
// WHY (right - left) / 2 instead of (left + right) / 2?
//   → Prevents integer overflow (important in other languages)
//
// VARIANTS:
//   1. Find exact target
//   2. Find leftmost position (lower bound)
//   3. Find rightmost position (upper bound)
//   4. Binary search on answer (search space is not an array)
//
// WHEN TO USE:
//   ✅ Array is SORTED
//   ✅ "Find target in sorted array"
//   ✅ "Find minimum/maximum satisfying a condition"
//   ✅ "Search in rotated sorted array"
//   ✅ Monotonic function → binary search on answer
//
// KEY INSIGHT: Binary search works whenever you can determine
// which half of the search space to eliminate.
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Binary Search (Classic)
// Search for target in sorted array. Return index or -1.
// Input: nums = [-1,0,3,5,9,12], target = 9 → Output: 4
// ─────────────────────────────────────────────────────────────
function binarySearch(nums, target) {
  // APPROACH: Classic binary search template
  // Time: O(log n) | Space: O(1)
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;  // target in right half
    else right = mid - 1;                          // target in left half
  }
  return -1; // not found
}
console.log("1. Binary Search:", binarySearch([-1,0,3,5,9,12], 9)); // 4
console.log("1. Binary Search:", binarySearch([-1,0,3,5,9,12], 2)); // -1

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Search in Rotated Sorted Array
// Array was sorted then rotated. Find target.
// Input: nums = [4,5,6,7,0,1,2], target = 0 → Output: 4
// ─────────────────────────────────────────────────────────────
function searchRotated(nums, target) {
  // APPROACH: Modified binary search
  // One half is always sorted - determine which half and search there
  // Time: O(log n) | Space: O(1)
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // target in left sorted half
      } else {
        left = mid + 1;  // target in right half
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;  // target in right sorted half
      } else {
        right = mid - 1; // target in left half
      }
    }
  }
  return -1;
}
console.log("2. Search Rotated:", searchRotated([4,5,6,7,0,1,2], 0)); // 4
console.log("2. Search Rotated:", searchRotated([4,5,6,7,0,1,2], 3)); // -1

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Find Minimum in Rotated Sorted Array
// Input: [3,4,5,1,2] → Output: 1
// ─────────────────────────────────────────────────────────────
function findMin(nums) {
  // APPROACH: Binary search - compare mid with right
  // If nums[mid] > nums[right], minimum is in right half
  // Time: O(log n) | Space: O(1)
  let left = 0, right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1; // min is in right half
    } else {
      right = mid;    // min is in left half (including mid)
    }
  }
  return nums[left];
}
console.log("3. Find Min Rotated:", findMin([3,4,5,1,2])); // 1
console.log("3. Find Min Rotated:", findMin([4,5,6,7,0,1,2])); // 0

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Find First and Last Position (Search Range)
// Find starting and ending position of target in sorted array.
// Input: nums = [5,7,7,8,8,10], target = 8 → Output: [3,4]
// ─────────────────────────────────────────────────────────────
function searchRange(nums, target) {
  // APPROACH: Two binary searches - find leftmost and rightmost
  // Time: O(log n) | Space: O(1)
  function findLeft(nums, target) {
    let left = 0, right = nums.length - 1, result = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (nums[mid] === target) {
        result = mid;
        right = mid - 1; // keep searching left
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  function findRight(nums, target) {
    let left = 0, right = nums.length - 1, result = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (nums[mid] === target) {
        result = mid;
        left = mid + 1; // keep searching right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  return [findLeft(nums, target), findRight(nums, target)];
}
console.log("4. Search Range:", searchRange([5,7,7,8,8,10], 8)); // [3,4]
console.log("4. Search Range:", searchRange([5,7,7,8,8,10], 6)); // [-1,-1]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Koko Eating Bananas
// Find minimum eating speed k to eat all bananas within h hours.
// Input: piles = [3,6,7,11], h = 8 → Output: 4
// ─────────────────────────────────────────────────────────────
function minEatingSpeed(piles, h) {
  // APPROACH: Binary search on ANSWER (speed k)
  // Search space: 1 to max(piles)
  // Check if speed k is feasible (can finish in h hours)
  // Time: O(n log m) where m = max pile | Space: O(1)
  let left = 1, right = Math.max(...piles);

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const hours = piles.reduce((sum, pile) => sum + Math.ceil(pile / mid), 0);

    if (hours <= h) {
      right = mid; // can eat slower, try smaller speed
    } else {
      left = mid + 1; // too slow, need faster speed
    }
  }
  return left;
}
console.log("5. Koko Eating:", minEatingSpeed([3,6,7,11], 8)); // 4
console.log("5. Koko Eating:", minEatingSpeed([30,11,23,4,20], 5)); // 30

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Sqrt(x) - Integer Square Root
// Compute and return the square root of x (integer part only).
// Input: x = 8 → Output: 2 (√8 = 2.82..., floor = 2)
// ─────────────────────────────────────────────────────────────
function mySqrt(x) {
  // APPROACH: Binary search for largest n where n*n <= x
  // Time: O(log x) | Space: O(1)
  if (x < 2) return x;
  let left = 1, right = Math.floor(x / 2);

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (mid * mid === x) return mid;
    else if (mid * mid < x) left = mid + 1;
    else right = mid - 1;
  }
  return right; // right is the floor of sqrt
}
console.log("6. Sqrt:", mySqrt(4)); // 2
console.log("6. Sqrt:", mySqrt(8)); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Search a 2D Matrix
// Search for target in m×n matrix where each row is sorted
// and first element of each row > last element of previous row.
// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true
// ─────────────────────────────────────────────────────────────
function searchMatrix(matrix, target) {
  // APPROACH: Treat 2D matrix as 1D sorted array
  // Map 1D index to 2D: row = Math.floor(mid/cols), col = mid % cols
  // Time: O(log(m*n)) | Space: O(1)
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];

    if (val === target) return true;
    else if (val < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
console.log("7. Search Matrix:", searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // true
console.log("7. Search Matrix:", searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Capacity To Ship Packages Within D Days
// Find minimum weight capacity to ship all packages within D days.
// Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5 → Output: 15
// ─────────────────────────────────────────────────────────────
function shipWithinDays(weights, days) {
  // APPROACH: Binary search on ANSWER (capacity)
  // Min capacity = max weight, Max capacity = sum of all weights
  // Time: O(n log(sum)) | Space: O(1)
  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b, 0);

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    let daysNeeded = 1, currentLoad = 0;

    for (let w of weights) {
      if (currentLoad + w > mid) {
        daysNeeded++;
        currentLoad = 0;
      }
      currentLoad += w;
    }

    if (daysNeeded <= days) right = mid;
    else left = mid + 1;
  }
  return left;
}
console.log("8. Ship Packages:", shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // 15

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Peak Index in Mountain Array
// Find the peak element index in a mountain array.
// Input: [0,1,0] → Output: 1
// Input: [0,2,1,0] → Output: 1
// ─────────────────────────────────────────────────────────────
function peakIndexInMountainArray(arr) {
  // APPROACH: Binary search - if arr[mid] < arr[mid+1], peak is to the right
  // Time: O(log n) | Space: O(1)
  let left = 0, right = arr.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1; // ascending, peak is to the right
    } else {
      right = mid;    // descending, peak is at mid or to the left
    }
  }
  return left;
}
console.log("9. Peak Index:", peakIndexInMountainArray([0,1,0])); // 1
console.log("9. Peak Index:", peakIndexInMountainArray([0,10,5,2])); // 1

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Find K Closest Elements
// Find k closest elements to x in sorted array.
// Input: arr = [1,2,3,4,5], k = 4, x = 3 → Output: [1,2,3,4]
// ─────────────────────────────────────────────────────────────
function findClosestElements(arr, k, x) {
  // APPROACH: Binary search for the left boundary of the window
  // Compare arr[mid] vs arr[mid+k]: which is closer to x?
  // Time: O(log(n-k)) | Space: O(1)
  let left = 0, right = arr.length - k;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    // Compare distance of arr[mid] and arr[mid+k] from x
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1; // arr[mid+k] is closer, shift window right
    } else {
      right = mid;    // arr[mid] is closer or equal, shift window left
    }
  }
  return arr.slice(left, left + k);
}
console.log("10. K Closest:", findClosestElements([1,2,3,4,5], 4, 3)); // [1,2,3,4]
console.log("10. K Closest:", findClosestElements([1,2,3,4,5], 4, -1)); // [1,2,3,4]

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                        | Type              | Time       | Space
// -------------------------------|-------------------|------------|------
// 1. Classic Binary Search       | Standard          | O(log n)   | O(1)
// 2. Search Rotated Array        | Modified BS       | O(log n)   | O(1)
// 3. Find Min in Rotated         | Modified BS       | O(log n)   | O(1)
// 4. Search Range                | Two BS            | O(log n)   | O(1)
// 5. Koko Eating Bananas         | BS on Answer      | O(n log m) | O(1)
// 6. Integer Sqrt                | BS on Answer      | O(log x)   | O(1)
// 7. Search 2D Matrix            | 2D → 1D BS        | O(log mn)  | O(1)
// 8. Ship Packages               | BS on Answer      | O(n log s) | O(1)
// 9. Peak in Mountain Array      | Modified BS       | O(log n)   | O(1)
// 10. K Closest Elements         | BS on Window      | O(log n)   | O(1)
// ============================================================
