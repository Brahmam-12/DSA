// ============================================================
// 📚 TOPIC 14: SORTING ALGORITHMS
// ============================================================
//
// 🔑 CONCEPT:
// Sorting arranges elements in a specific order (ascending/descending).
// Understanding sorting algorithms helps you understand:
//   - Time/Space complexity tradeoffs
//   - Divide & Conquer
//   - Recursion
//   - Stability (equal elements maintain relative order)
//
// ALGORITHM COMPARISON:
// ┌─────────────────┬──────────┬──────────┬──────────┬─────────┐
// │ Algorithm       │ Best     │ Average  │ Worst    │ Space   │
// ├─────────────────┼──────────┼──────────┼──────────┼─────────┤
// │ Bubble Sort     │ O(n)     │ O(n²)    │ O(n²)    │ O(1)    │
// │ Selection Sort  │ O(n²)    │ O(n²)    │ O(n²)    │ O(1)    │
// │ Insertion Sort  │ O(n)     │ O(n²)    │ O(n²)    │ O(1)    │
// │ Merge Sort      │ O(nlogn) │ O(nlogn) │ O(nlogn) │ O(n)    │
// │ Quick Sort      │ O(nlogn) │ O(nlogn) │ O(n²)    │ O(logn) │
// │ Heap Sort       │ O(nlogn) │ O(nlogn) │ O(nlogn) │ O(1)    │
// │ Counting Sort   │ O(n+k)   │ O(n+k)   │ O(n+k)   │ O(k)    │
// │ Radix Sort      │ O(nk)    │ O(nk)    │ O(nk)    │ O(n+k)  │
// └─────────────────┴──────────┴──────────┴──────────┴─────────┘
//
// STABLE SORTS: Merge Sort, Insertion Sort, Bubble Sort, Counting Sort
// UNSTABLE SORTS: Quick Sort, Heap Sort, Selection Sort
//
// WHEN TO USE:
//   Small arrays (n < 20):  Insertion Sort
//   General purpose:        Quick Sort or Merge Sort
//   Guaranteed O(nlogn):    Merge Sort or Heap Sort
//   Integer range known:    Counting Sort or Radix Sort
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ ALGORITHM 1: Bubble Sort
// Repeatedly swap adjacent elements if they're in wrong order.
// ─────────────────────────────────────────────────────────────
function bubbleSort(arr) {
  // APPROACH: Each pass bubbles the largest element to the end
  // Optimization: stop early if no swaps in a pass
  // Time: O(n²) avg, O(n) best | Space: O(1)
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // swap
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted!
  }
  return arr;
}
console.log("1. Bubble Sort:", bubbleSort([64,34,25,12,22,11,90]));
// [11,12,22,25,34,64,90]

// ─────────────────────────────────────────────────────────────
// ✅ ALGORITHM 2: Selection Sort
// Find minimum element and place it at the beginning.
// ─────────────────────────────────────────────────────────────
function selectionSort(arr) {
  // APPROACH: Divide array into sorted and unsorted parts
  // Find min in unsorted, swap with first unsorted element
  // Time: O(n²) | Space: O(1)
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
console.log("2. Selection Sort:", selectionSort([64,25,12,22,11]));
// [11,12,22,25,64]

// ─────────────────────────────────────────────────────────────
// ✅ ALGORITHM 3: Insertion Sort
// Build sorted array one element at a time.
// ─────────────────────────────────────────────────────────────
function insertionSort(arr) {
  // APPROACH: Like sorting playing cards
  // Take each element and insert it into its correct position
  // Time: O(n²) avg, O(n) best (nearly sorted) | Space: O(1)
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    // Shift elements greater than key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key; // insert key in correct position
  }
  return arr;
}
console.log("3. Insertion Sort:", insertionSort([12,11,13,5,6]));
// [5,6,11,12,13]

// ─────────────────────────────────────────────────────────────
// ✅ ALGORITHM 4: Merge Sort
// Divide array in half, sort each half, merge them.
// ─────────────────────────────────────────────────────────────
function mergeSort(arr) {
  // APPROACH: Divide & Conquer
  // Split → Sort left → Sort right → Merge
  // Time: O(n log n) | Space: O(n)
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
console.log("4. Merge Sort:", mergeSort([38,27,43,3,9,82,10]));
// [3,9,10,27,38,43,82]

// ─────────────────────────────────────────────────────────────
// ✅ ALGORITHM 5: Quick Sort
// Pick a pivot, partition array around it, recursively sort.
// ─────────────────────────────────────────────────────────────
function quickSort(arr, low = 0, high = arr.length - 1) {
  // APPROACH: Divide & Conquer with in-place partitioning
  // Pivot: elements < pivot go left, elements > pivot go right
  // Time: O(n log n) avg, O(n²) worst | Space: O(log n)
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // choose last element as pivot
  let i = low - 1; // index of smaller element

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // place pivot
  return i + 1;
}
console.log("5. Quick Sort:", quickSort([10,7,8,9,1,5]));
// [1,5,7,8,9,10]

// ─────────────────────────────────────────────────────────────
// ✅ ALGORITHM 6: Counting Sort
// Count occurrences of each element, reconstruct sorted array.
// ─────────────────────────────────────────────────────────────
function countingSort(arr) {
  // APPROACH: Count frequency of each element
  // Works only for non-negative integers with known range
  // Time: O(n + k) | Space: O(k) where k = max element
  if (!arr.length) return arr;
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  for (let num of arr) count[num]++;

  const result = [];
  for (let i = 0; i <= max; i++) {
    while (count[i]-- > 0) result.push(i);
  }
  return result;
}
console.log("6. Counting Sort:", countingSort([4,2,2,8,3,3,1]));
// [1,2,2,3,3,4,8]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Sort Colors (Dutch National Flag)
// Sort array of 0s, 1s, 2s in-place in one pass.
// Input: [2,0,2,1,1,0] → Output: [0,0,1,1,2,2]
// ─────────────────────────────────────────────────────────────
function sortColors(nums) {
  // APPROACH: Three pointers (Dutch National Flag algorithm)
  // low: boundary of 0s, mid: current, high: boundary of 2s
  // Time: O(n) | Space: O(1)
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}
console.log("7. Sort Colors:", sortColors([2,0,2,1,1,0])); // [0,0,1,1,2,2]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Merge Sorted Arrays
// Merge two sorted arrays into one sorted array.
// Input: nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3
// Output: [1,2,2,3,5,6]
// ─────────────────────────────────────────────────────────────
function mergeSortedArrays(nums1, m, nums2, n) {
  // APPROACH: Start from the end to avoid overwriting
  // Three pointers: p1 (end of nums1), p2 (end of nums2), p (end of merged)
  // Time: O(m + n) | Space: O(1)
  let p1 = m - 1, p2 = n - 1, p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p--] = nums1[p1--];
    } else {
      nums1[p--] = nums2[p2--];
    }
  }
  while (p2 >= 0) nums1[p--] = nums2[p2--]; // remaining nums2
  return nums1;
}
console.log("8. Merge Sorted Arrays:", mergeSortedArrays([1,2,3,0,0,0], 3, [2,5,6], 3));
// [1,2,2,3,5,6]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Largest Number
// Arrange numbers to form the largest possible number.
// Input: [3,30,34,5,9] → Output: "9534330"
// ─────────────────────────────────────────────────────────────
function largestNumber(nums) {
  // APPROACH: Custom sort - compare concatenations
  // If "ab" > "ba", then a should come before b
  // Time: O(n log n) | Space: O(n)
  const result = nums
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b)) // custom comparator
    .join('');

  return result[0] === '0' ? '0' : result; // handle [0,0] case
}
console.log("9. Largest Number:", largestNumber([3,30,34,5,9])); // "9534330"
console.log("9. Largest Number:", largestNumber([10,2])); // "210"

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Meeting Rooms II (Minimum Meeting Rooms)
// Find minimum number of meeting rooms required.
// Input: [[0,30],[5,10],[15,20]] → Output: 2
// ─────────────────────────────────────────────────────────────
function minMeetingRooms(intervals) {
  // APPROACH: Sort start and end times separately
  // Use two pointers to track overlapping meetings
  // Time: O(n log n) | Space: O(n)
  if (!intervals.length) return 0;

  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

  let rooms = 0, endPtr = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endPtr]) {
      rooms++; // need a new room
    } else {
      endPtr++; // reuse a room (a meeting ended)
    }
  }
  return rooms;
}
console.log("10. Min Meeting Rooms:", minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log("10. Min Meeting Rooms:", minMeetingRooms([[7,10],[2,4]])); // 1

// ============================================================
// 📊 ALGORITHM SUMMARY
// ============================================================
// Algorithm        | Best     | Average  | Worst    | Space  | Stable
// -----------------|----------|----------|----------|--------|-------
// Bubble Sort      | O(n)     | O(n²)    | O(n²)    | O(1)   | Yes
// Selection Sort   | O(n²)    | O(n²)    | O(n²)    | O(1)   | No
// Insertion Sort   | O(n)     | O(n²)    | O(n²)    | O(1)   | Yes
// Merge Sort       | O(nlogn) | O(nlogn) | O(nlogn) | O(n)   | Yes
// Quick Sort       | O(nlogn) | O(nlogn) | O(n²)    | O(logn)| No
// Counting Sort    | O(n+k)   | O(n+k)   | O(n+k)   | O(k)   | Yes
// Sort Colors      | O(n)     | O(n)     | O(n)     | O(1)   | No
// Merge Sorted Arr | O(m+n)   | O(m+n)   | O(m+n)   | O(1)   | Yes
// Largest Number   | O(nlogn) | O(nlogn) | O(nlogn) | O(n)   | -
// Meeting Rooms II | O(nlogn) | O(nlogn) | O(nlogn) | O(n)   | -
// ============================================================
