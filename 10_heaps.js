// ============================================================
// 📚 TOPIC 10: HEAPS & PRIORITY QUEUES
// ============================================================
//
// 🔑 CONCEPT:
// A Heap is a complete binary tree that satisfies the heap property:
//
//   MIN-HEAP: Parent ≤ Children (root = minimum element)
//   MAX-HEAP: Parent ≥ Children (root = maximum element)
//
// VISUAL (Min-Heap):
//         1
//        / \
//       3   2
//      / \ / \
//     7  4 5  6
//
// STORED AS ARRAY: [1, 3, 2, 7, 4, 5, 6]
//   Parent of i:    Math.floor((i-1)/2)
//   Left child:     2*i + 1
//   Right child:    2*i + 2
//
// KEY OPERATIONS:
//   Insert (heapify up):   O(log n)
//   Extract min/max:       O(log n)
//   Peek min/max:          O(1)
//   Build heap:            O(n)
//
// PRIORITY QUEUE = Heap (elements served by priority, not order)
//
// WHEN TO USE:
//   ✅ "Find K largest/smallest elements"
//   ✅ "Merge K sorted lists"
//   ✅ "Median of data stream"
//   ✅ Dijkstra's shortest path
//   ✅ Task scheduling by priority
//
// NOTE: JavaScript doesn't have a built-in heap/priority queue.
// We implement a MinHeap class here.
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// MinHeap Implementation (used in multiple problems)
// ─────────────────────────────────────────────────────────────
class MinHeap {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator; // custom comparator for flexibility
  }

  size() { return this.heap.length; }
  peek() { return this.heap[0]; }
  isEmpty() { return this.heap.length === 0; }

  push(val) {
    this.heap.push(val);
    this._heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._heapifyDown(0);
    }
    return min;
  }

  _heapifyUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.comparator(this.heap[i], this.heap[parent]) < 0) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  _heapifyDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.comparator(this.heap[left], this.heap[smallest]) < 0) smallest = left;
      if (right < n && this.comparator(this.heap[right], this.heap[smallest]) < 0) smallest = right;
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

// MaxHeap = MinHeap with reversed comparator
class MaxHeap extends MinHeap {
  constructor() {
    super((a, b) => b - a);
  }
}

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Kth Largest Element in an Array
// Find the kth largest element.
// Input: nums = [3,2,1,5,6,4], k = 2 → Output: 5
// ─────────────────────────────────────────────────────────────
function findKthLargest(nums, k) {
  // APPROACH: Min-Heap of size k
  // Maintain a min-heap of k largest elements seen so far
  // The root (minimum of heap) = kth largest
  // Time: O(n log k) | Space: O(k)
  const minHeap = new MinHeap();

  for (let num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) minHeap.pop(); // remove smallest
  }
  return minHeap.peek(); // root = kth largest
}
console.log("1. Kth Largest:", findKthLargest([3,2,1,5,6,4], 2)); // 5
console.log("1. Kth Largest:", findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Top K Frequent Elements
// Return the k most frequent elements.
// Input: nums = [1,1,1,2,2,3], k = 2 → Output: [1,2]
// ─────────────────────────────────────────────────────────────
function topKFrequent(nums, k) {
  // APPROACH: Count frequencies, then use min-heap of size k
  // Heap stores [frequency, num] pairs
  // Time: O(n log k) | Space: O(n)
  const freq = new Map();
  for (let num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  // Min-heap by frequency
  const heap = new MinHeap((a, b) => a[0] - b[0]);

  for (let [num, count] of freq) {
    heap.push([count, num]);
    if (heap.size() > k) heap.pop(); // remove least frequent
  }

  return heap.heap.map(([count, num]) => num);
}
console.log("2. Top K Frequent:", topKFrequent([1,1,1,2,2,3], 2)); // [1,2]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: K Closest Points to Origin
// Find k closest points to origin (0,0).
// Input: points = [[1,3],[-2,2]], k = 1 → Output: [[-2,2]]
// ─────────────────────────────────────────────────────────────
function kClosest(points, k) {
  // APPROACH: Max-heap of size k (by distance)
  // Keep k closest points - remove farthest when size > k
  // Time: O(n log k) | Space: O(k)
  const dist = ([x, y]) => x * x + y * y; // no need for sqrt

  // Max-heap by distance (we want to remove the farthest)
  const maxHeap = new MinHeap((a, b) => dist(b) - dist(a));

  for (let point of points) {
    maxHeap.push(point);
    if (maxHeap.size() > k) maxHeap.pop(); // remove farthest
  }
  return maxHeap.heap;
}
console.log("3. K Closest Points:", kClosest([[1,3],[-2,2]], 1)); // [[-2,2]]
console.log("3. K Closest Points:", kClosest([[3,3],[5,-1],[-2,4]], 2)); // [[3,3],[-2,4]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Merge K Sorted Lists
// Merge k sorted linked lists into one sorted list.
// ─────────────────────────────────────────────────────────────
class ListNode {
  constructor(val = 0, next = null) { this.val = val; this.next = next; }
}

function mergeKLists(lists) {
  // APPROACH: Min-heap - always extract the smallest node
  // Push the next node of extracted node back into heap
  // Time: O(n log k) where n = total nodes, k = number of lists
  // Space: O(k)
  const heap = new MinHeap((a, b) => a.val - b.val);

  // Initialize heap with head of each list
  for (let list of lists) {
    if (list) heap.push(list);
  }

  const dummy = new ListNode(0);
  let current = dummy;

  while (!heap.isEmpty()) {
    const node = heap.pop(); // get smallest
    current.next = node;
    current = current.next;
    if (node.next) heap.push(node.next); // push next node
  }
  return dummy.next;
}

// Create test lists: [1,4,5], [1,3,4], [2,6]
function createList(arr) {
  const dummy = new ListNode(0);
  let cur = dummy;
  for (let v of arr) { cur.next = new ListNode(v); cur = cur.next; }
  return dummy.next;
}
function listToArr(head) {
  const r = [];
  while (head) { r.push(head.val); head = head.next; }
  return r;
}
const merged = mergeKLists([createList([1,4,5]), createList([1,3,4]), createList([2,6])]);
console.log("4. Merge K Lists:", listToArr(merged)); // [1,1,2,3,4,4,5,6]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Find Median from Data Stream
// Design a data structure to find median from a stream of numbers.
// ─────────────────────────────────────────────────────────────
class MedianFinder {
  // APPROACH: Two heaps
  // maxHeap (lower half) | minHeap (upper half)
  // maxHeap.peek() ≤ minHeap.peek()
  // Median = average of tops (even) or maxHeap.peek() (odd)
  constructor() {
    this.maxHeap = new MaxHeap(); // lower half
    this.minHeap = new MinHeap(); // upper half
  }

  addNum(num) {
    // Always add to maxHeap first
    this.maxHeap.push(num);

    // Balance: maxHeap top must be ≤ minHeap top
    if (!this.minHeap.isEmpty() && this.maxHeap.peek() > this.minHeap.peek()) {
      this.minHeap.push(this.maxHeap.pop());
    }

    // Balance sizes: maxHeap can have at most 1 more element
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(this.maxHeap.pop());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
  }
}
const mf = new MedianFinder();
mf.addNum(1); mf.addNum(2);
console.log("5. Median:", mf.findMedian()); // 1.5
mf.addNum(3);
console.log("5. Median:", mf.findMedian()); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Task Scheduler
// Find minimum intervals to execute all tasks with cooldown n.
// Input: tasks = ["A","A","A","B","B","B"], n = 2 → Output: 8
// ─────────────────────────────────────────────────────────────
function leastInterval(tasks, n) {
  // APPROACH: Greedy with max-heap
  // Always execute the most frequent task available
  // Use a queue to track cooldown
  // Time: O(n log 26) = O(n) | Space: O(26) = O(1)
  const freq = new Array(26).fill(0);
  for (let task of tasks) freq[task.charCodeAt(0) - 65]++;

  const maxHeap = new MaxHeap();
  for (let f of freq) if (f > 0) maxHeap.push(f);

  let time = 0;
  const cooldown = []; // [remaining_count, available_at_time]

  while (!maxHeap.isEmpty() || cooldown.length) {
    time++;

    if (!maxHeap.isEmpty()) {
      const count = maxHeap.pop() - 1;
      if (count > 0) cooldown.push([count, time + n]);
    }

    if (cooldown.length && cooldown[0][1] === time) {
      maxHeap.push(cooldown.shift()[0]);
    }
  }
  return time;
}
console.log("6. Task Scheduler:", leastInterval(["A","A","A","B","B","B"], 2)); // 8

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Kth Smallest Element in a Sorted Matrix
// Find kth smallest element in n×n matrix where each row and column is sorted.
// Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8 → Output: 13
// ─────────────────────────────────────────────────────────────
function kthSmallest(matrix, k) {
  // APPROACH: Min-heap - start with first column, expand row by row
  // Time: O(k log n) | Space: O(n)
  const n = matrix.length;
  const heap = new MinHeap((a, b) => a[0] - b[0]); // [val, row, col]

  // Initialize with first element of each row
  for (let i = 0; i < n; i++) heap.push([matrix[i][0], i, 0]);

  let result = 0;
  for (let i = 0; i < k; i++) {
    const [val, row, col] = heap.pop();
    result = val;
    if (col + 1 < n) heap.push([matrix[row][col + 1], row, col + 1]);
  }
  return result;
}
console.log("7. Kth Smallest Matrix:", kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8)); // 13

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Reorganize String
// Rearrange string so no two adjacent characters are the same.
// Input: "aab" → Output: "aba"
// ─────────────────────────────────────────────────────────────
function reorganizeString(s) {
  // APPROACH: Max-heap by frequency
  // Always pick the most frequent character that's not the previous one
  // Time: O(n log 26) = O(n) | Space: O(26) = O(1)
  const freq = new Map();
  for (let char of s) freq.set(char, (freq.get(char) || 0) + 1);

  const maxHeap = new MaxHeap();
  for (let [char, count] of freq) maxHeap.push([count, char]);

  let result = "";
  let prev = null;

  while (!maxHeap.isEmpty()) {
    const [count, char] = maxHeap.pop();
    result += char;

    if (prev) maxHeap.push(prev); // re-add previous character
    prev = count - 1 > 0 ? [count - 1, char] : null;
  }

  return result.length === s.length ? result : "";
}
console.log("8. Reorganize String:", reorganizeString("aab")); // "aba"
console.log("8. Reorganize String:", reorganizeString("aaab")); // "" (impossible)

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Smallest Range Covering Elements from K Lists
// Find smallest range that includes at least one number from each list.
// Input: [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]] → Output: [20,24]
// ─────────────────────────────────────────────────────────────
function smallestRange(nums) {
  // APPROACH: Min-heap with current max tracking
  // Start with first element of each list
  // Expand by replacing min with next element from same list
  // Time: O(n log k) | Space: O(k)
  const heap = new MinHeap((a, b) => a[0] - b[0]); // [val, listIdx, elemIdx]
  let currentMax = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    heap.push([nums[i][0], i, 0]);
    currentMax = Math.max(currentMax, nums[i][0]);
  }

  let rangeStart = 0, rangeEnd = Infinity;

  while (!heap.isEmpty()) {
    const [min, listIdx, elemIdx] = heap.pop();

    if (currentMax - min < rangeEnd - rangeStart) {
      rangeStart = min;
      rangeEnd = currentMax;
    }

    if (elemIdx + 1 >= nums[listIdx].length) break; // one list exhausted

    const nextVal = nums[listIdx][elemIdx + 1];
    heap.push([nextVal, listIdx, elemIdx + 1]);
    currentMax = Math.max(currentMax, nextVal);
  }

  return [rangeStart, rangeEnd];
}
console.log("9. Smallest Range:", smallestRange([[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]));
// [20,24]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: IPO (Maximize Capital)
// Select at most k projects to maximize capital.
// Input: k=2, w=0, profits=[1,2,3], capital=[0,1,1] → Output: 4
// ─────────────────────────────────────────────────────────────
function findMaximizedCapital(k, w, profits, capital) {
  // APPROACH: Two heaps
  // Min-heap by capital (available projects)
  // Max-heap by profit (best project to pick)
  // Time: O(n log n) | Space: O(n)
  const n = profits.length;
  const projects = profits.map((p, i) => [capital[i], p]);
  projects.sort((a, b) => a[0] - b[0]); // sort by capital

  const minCapHeap = new MinHeap((a, b) => a[0] - b[0]); // [capital, profit]
  const maxProfitHeap = new MaxHeap(); // profit values

  let idx = 0;
  for (let i = 0; i < k; i++) {
    // Add all affordable projects to max-profit heap
    while (idx < n && projects[idx][0] <= w) {
      maxProfitHeap.push(projects[idx][1]);
      idx++;
    }
    if (maxProfitHeap.isEmpty()) break; // no affordable projects
    w += maxProfitHeap.pop(); // pick most profitable
  }
  return w;
}
console.log("10. Max Capital:", findMaximizedCapital(2, 0, [1,2,3], [0,1,1])); // 4

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                        | Heap Type      | Time       | Space
// -------------------------------|----------------|------------|------
// 1. Kth Largest Element         | Min-Heap(k)    | O(n log k) | O(k)
// 2. Top K Frequent              | Min-Heap(k)    | O(n log k) | O(n)
// 3. K Closest Points            | Max-Heap(k)    | O(n log k) | O(k)
// 4. Merge K Sorted Lists        | Min-Heap       | O(n log k) | O(k)
// 5. Median from Stream          | Two Heaps      | O(log n)   | O(n)
// 6. Task Scheduler              | Max-Heap       | O(n)       | O(1)
// 7. Kth Smallest in Matrix      | Min-Heap       | O(k log n) | O(n)
// 8. Reorganize String           | Max-Heap       | O(n)       | O(1)
// 9. Smallest Range K Lists      | Min-Heap       | O(n log k) | O(k)
// 10. IPO Maximize Capital       | Two Heaps      | O(n log n) | O(n)
// ============================================================
