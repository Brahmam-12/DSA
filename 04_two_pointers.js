// ============================================================
// 📚 TOPIC 4: TWO POINTERS
// ============================================================
//
// 🔑 CONCEPT:
// Two Pointers technique uses two indices to traverse an array/string.
// It reduces O(n²) brute force to O(n) in many problems.
//
// TYPES OF TWO POINTERS:
//
//   1. OPPOSITE DIRECTION (Left & Right)
//      left = 0, right = n-1
//      Move toward each other based on condition
//      Use for: sorted arrays, palindromes, container problems
//
//      [←————————————→]
//       L              R
//
//   2. SAME DIRECTION (Fast & Slow)
//      slow = 0, fast = 0 (or fast = 1)
//      Both move forward, fast moves faster
//      Use for: remove duplicates, cycle detection, nth from end
//
//      [→→→→→→→→→→→→→]
//       S    F
//
//   3. SLIDING WINDOW (see 05_sliding_window.js)
//      Variable window size
//
// WHEN TO USE:
//   ✅ Array is SORTED (or can be sorted)
//   ✅ Need to find pairs/triplets with a condition
//   ✅ Need to remove/move elements in-place
//   ✅ Palindrome checking
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Two Sum II (Sorted Array)
// Array is sorted. Find two numbers that add up to target.
// Input: numbers = [2,7,11,15], target = 9 → Output: [1,2] (1-indexed)
// ─────────────────────────────────────────────────────────────
function twoSumSorted(numbers, target) {
  // APPROACH: Left + Right pointers
  // If sum < target → move left right (increase sum)
  // If sum > target → move right left (decrease sum)
  // Time: O(n) | Space: O(1)
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1]; // 1-indexed
    else if (sum < target) left++;
    else right--;
  }
  return [];
}
console.log("1. Two Sum Sorted:", twoSumSorted([2, 7, 11, 15], 9)); // [1,2]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Three Sum
// Find all unique triplets that sum to zero.
// Input: [-1,0,1,2,-1,-4] → Output: [[-1,-1,2],[-1,0,1]]
// ─────────────────────────────────────────────────────────────
function threeSum(nums) {
  // APPROACH: Sort + fix one element + two pointers for the rest
  // Skip duplicates to avoid repeated triplets
  // Time: O(n²) | Space: O(1) (output not counted)
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for i
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // Early exit: smallest possible sum > 0
    if (nums[i] > 0) break;

    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates for left and right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}
console.log("2. Three Sum:", threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Container With Most Water
// Find two lines that together with x-axis forms a container with most water.
// Input: [1,8,6,2,5,4,8,3,7] → Output: 49
// ─────────────────────────────────────────────────────────────
function maxArea(height) {
  // APPROACH: Left + Right pointers
  // Area = min(height[L], height[R]) * (R - L)
  // Move the pointer with smaller height (can only improve by moving it)
  // Time: O(n) | Space: O(1)
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}
console.log("3. Container With Most Water:", maxArea([1,8,6,2,5,4,8,3,7])); // 49

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Remove Duplicates from Sorted Array
// Remove duplicates in-place, return new length.
// Input: [1,1,2] → Output: 2, array becomes [1,2,_]
// ─────────────────────────────────────────────────────────────
function removeDuplicates(nums) {
  // APPROACH: Slow pointer tracks position for next unique element
  // Fast pointer scans ahead
  // Time: O(n) | Space: O(1)
  if (!nums.length) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast]; // place unique element
    }
  }
  return slow + 1; // length of unique elements
}
console.log("4. Remove Duplicates:", removeDuplicates([1, 1, 2])); // 2
console.log("4. Remove Duplicates:", removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Squares of a Sorted Array
// Return sorted array of squares.
// Input: [-4,-1,0,3,10] → Output: [0,1,9,16,100]
// ─────────────────────────────────────────────────────────────
function sortedSquares(nums) {
  // APPROACH: Two pointers from both ends
  // Largest square is always at one of the ends
  // Fill result array from right to left
  // Time: O(n) | Space: O(n)
  const n = nums.length;
  const result = new Array(n);
  let left = 0, right = n - 1, pos = n - 1;

  while (left <= right) {
    const leftSq = nums[left] * nums[left];
    const rightSq = nums[right] * nums[right];
    if (leftSq > rightSq) {
      result[pos--] = leftSq;
      left++;
    } else {
      result[pos--] = rightSq;
      right--;
    }
  }
  return result;
}
console.log("5. Sorted Squares:", sortedSquares([-4, -1, 0, 3, 10])); // [0,1,9,16,100]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Reverse String
// Reverse a string in-place.
// Input: ['h','e','l','l','o'] → Output: ['o','l','l','e','h']
// ─────────────────────────────────────────────────────────────
function reverseString(s) {
  // APPROACH: Swap characters from both ends moving inward
  // Time: O(n) | Space: O(1)
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}
console.log("6. Reverse String:", reverseString(['h','e','l','l','o'])); // ['o','l','l','e','h']

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Linked List Cycle Detection (Floyd's Algorithm)
// Detect if a linked list has a cycle.
// Uses Fast & Slow pointers (conceptual - using array simulation)
// ─────────────────────────────────────────────────────────────
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function hasCycle(head) {
  // APPROACH: Fast pointer moves 2 steps, slow moves 1 step
  // If there's a cycle, fast will eventually catch slow
  // Time: O(n) | Space: O(1)
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;       // move 1 step
    fast = fast.next.next;  // move 2 steps
    if (slow === fast) return true; // cycle detected!
  }
  return false;
}

// Create a cycle: 1 → 2 → 3 → 4 → 2 (cycle back to node 2)
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
const n4 = new ListNode(4);
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2; // cycle!
console.log("7. Has Cycle:", hasCycle(n1)); // true

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Trapping Rain Water
// Calculate how much water can be trapped between bars.
// Input: [0,1,0,2,1,0,1,3,2,1,2,1] → Output: 6
// ─────────────────────────────────────────────────────────────
function trap(height) {
  // APPROACH: Two pointers with max heights tracked
  // Water at position i = min(maxLeft, maxRight) - height[i]
  // Time: O(n) | Space: O(1)
  let left = 0, right = height.length - 1;
  let maxLeft = 0, maxRight = 0;
  let water = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left]; // update max
      } else {
        water += maxLeft - height[left]; // trap water
      }
      left++;
    } else {
      if (height[right] >= maxRight) {
        maxRight = height[right]; // update max
      } else {
        water += maxRight - height[right]; // trap water
      }
      right--;
    }
  }
  return water;
}
console.log("8. Trapping Rain Water:", trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Sort Colors (Dutch National Flag)
// Sort array containing only 0s, 1s, and 2s in-place.
// Input: [2,0,2,1,1,0] → Output: [0,0,1,1,2,2]
// ─────────────────────────────────────────────────────────────
function sortColors(nums) {
  // APPROACH: Three pointers - low, mid, high
  // low: boundary of 0s, high: boundary of 2s, mid: current
  // Time: O(n) | Space: O(1)
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else { // nums[mid] === 2
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // Don't increment mid - need to check swapped element
    }
  }
  return nums;
}
console.log("9. Sort Colors:", sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Four Sum
// Find all unique quadruplets that sum to target.
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// ─────────────────────────────────────────────────────────────
function fourSum(nums, target) {
  // APPROACH: Sort + fix two elements + two pointers
  // Extension of Three Sum with one more outer loop
  // Time: O(n³) | Space: O(1)
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates

    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // skip duplicates

      let left = j + 1, right = nums.length - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return result;
}
console.log("10. Four Sum:", fourSum([1,0,-1,0,-2,2], 0));
// [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                      | Type           | Time    | Space
// -----------------------------|----------------|---------|------
// 1. Two Sum II (Sorted)       | Opposite Dir   | O(n)    | O(1)
// 2. Three Sum                 | Sort + 2ptr    | O(n²)   | O(1)
// 3. Container With Most Water | Opposite Dir   | O(n)    | O(1)
// 4. Remove Duplicates         | Fast & Slow    | O(n)    | O(1)
// 5. Sorted Squares            | Opposite Dir   | O(n)    | O(n)
// 6. Reverse String            | Opposite Dir   | O(n)    | O(1)
// 7. Linked List Cycle         | Fast & Slow    | O(n)    | O(1)
// 8. Trapping Rain Water       | Opposite Dir   | O(n)    | O(1)
// 9. Sort Colors               | 3 Pointers     | O(n)    | O(1)
// 10. Four Sum                 | Sort + 2ptr    | O(n³)   | O(1)
// ============================================================
