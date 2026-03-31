// ============================================================
// 📚 TOPIC 7: STACKS & QUEUES
// ============================================================
//
// 🔑 STACK CONCEPT:
// LIFO - Last In, First Out
// Think of a stack of plates: you add/remove from the TOP.
//
//   Push → add to top
//   Pop  → remove from top
//   Peek → view top without removing
//
//   [bottom] 1 | 2 | 3 [top]
//                       ↑ push/pop here
//
// In JavaScript: use Array with push() and pop()
//
// 🔑 QUEUE CONCEPT:
// FIFO - First In, First Out
// Think of a line at a store: first person in is first served.
//
//   Enqueue → add to back
//   Dequeue → remove from front
//
//   [front] 1 | 2 | 3 [back]
//      ↑ dequeue          ↑ enqueue
//
// In JavaScript: use Array with push() and shift()
// (For performance, use a proper deque or linked list)
//
// KEY OPERATIONS:
//   Stack: push O(1), pop O(1), peek O(1)
//   Queue: enqueue O(1), dequeue O(1) with proper impl
//
// WHEN TO USE STACK:
//   ✅ Undo/redo operations
//   ✅ Balanced parentheses
//   ✅ DFS traversal
//   ✅ Monotonic stack (next greater element)
//   ✅ Expression evaluation
//
// WHEN TO USE QUEUE:
//   ✅ BFS traversal
//   ✅ Level-order tree traversal
//   ✅ Task scheduling
//   ✅ Sliding window maximum (deque)
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Valid Parentheses
// Given a string of brackets, determine if it's valid.
// Input: "()[]{}" → Output: true
// Input: "([)]"   → Output: false
// ─────────────────────────────────────────────────────────────
function isValid(s) {
  // APPROACH: Stack - push open brackets, match with close brackets
  // Time: O(n) | Space: O(n)
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (let char of s) {
    if ('({['.includes(char)) {
      stack.push(char); // push opening bracket
    } else {
      // Check if top of stack matches
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0; // all brackets matched
}
console.log("1. Valid Parentheses:", isValid("()[]{}")); // true
console.log("1. Valid Parentheses:", isValid("([)]")); // false
console.log("1. Valid Parentheses:", isValid("{[]}")); // true

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Min Stack
// Design a stack that supports push, pop, top, and getMin in O(1).
// ─────────────────────────────────────────────────────────────
class MinStack {
  // APPROACH: Use two stacks - one for values, one for minimums
  // minStack always has the current minimum at its top
  constructor() {
    this.stack = [];
    this.minStack = []; // tracks minimums
  }

  push(val) {
    this.stack.push(val);
    // Push to minStack if it's empty or val is new minimum
    const currentMin = this.minStack.length
      ? this.minStack[this.minStack.length - 1]
      : Infinity;
    this.minStack.push(Math.min(val, currentMin));
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
const minStack = new MinStack();
minStack.push(-2); minStack.push(0); minStack.push(-3);
console.log("2. Min Stack getMin:", minStack.getMin()); // -3
minStack.pop();
console.log("2. Min Stack top:", minStack.top()); // 0
console.log("2. Min Stack getMin:", minStack.getMin()); // -2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Daily Temperatures
// Find how many days until a warmer temperature.
// Input: [73,74,75,71,69,72,76,73] → Output: [1,1,4,2,1,1,0,0]
// ─────────────────────────────────────────────────────────────
function dailyTemperatures(temperatures) {
  // APPROACH: Monotonic Stack (decreasing)
  // Stack stores indices of temperatures waiting for warmer day
  // When we find a warmer temp, pop and calculate days
  // Time: O(n) | Space: O(n)
  const result = new Array(temperatures.length).fill(0);
  const stack = []; // stores indices

  for (let i = 0; i < temperatures.length; i++) {
    // Pop all indices with temperature less than current
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx; // days until warmer
    }
    stack.push(i);
  }
  return result;
}
console.log("3. Daily Temperatures:", dailyTemperatures([73,74,75,71,69,72,76,73]));
// [1,1,4,2,1,1,0,0]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Next Greater Element
// For each element in nums1, find the next greater element in nums2.
// Input: nums1 = [4,1,2], nums2 = [1,3,4,2] → Output: [-1,3,-1]
// ─────────────────────────────────────────────────────────────
function nextGreaterElement(nums1, nums2) {
  // APPROACH: Monotonic stack on nums2, store results in HashMap
  // Time: O(n + m) | Space: O(n)
  const map = new Map(); // num → next greater element
  const stack = [];

  for (let num of nums2) {
    while (stack.length && stack[stack.length - 1] < num) {
      map.set(stack.pop(), num); // found next greater
    }
    stack.push(num);
  }
  // Remaining in stack have no next greater element
  while (stack.length) map.set(stack.pop(), -1);

  return nums1.map(num => map.get(num));
}
console.log("4. Next Greater Element:", nextGreaterElement([4,1,2], [1,3,4,2])); // [-1,3,-1]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Implement Queue using Stacks
// Implement a FIFO queue using only two stacks.
// ─────────────────────────────────────────────────────────────
class MyQueue {
  // APPROACH: Two stacks - inbox and outbox
  // Push to inbox, pop from outbox
  // When outbox is empty, transfer all from inbox to outbox
  constructor() {
    this.inbox = [];  // for push
    this.outbox = []; // for pop/peek
  }

  push(x) {
    this.inbox.push(x);
  }

  pop() {
    this._transfer();
    return this.outbox.pop();
  }

  peek() {
    this._transfer();
    return this.outbox[this.outbox.length - 1];
  }

  empty() {
    return this.inbox.length === 0 && this.outbox.length === 0;
  }

  _transfer() {
    if (this.outbox.length === 0) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop()); // reverse order
      }
    }
  }
}
const queue = new MyQueue();
queue.push(1); queue.push(2);
console.log("5. Queue peek:", queue.peek()); // 1
console.log("5. Queue pop:", queue.pop()); // 1
console.log("5. Queue empty:", queue.empty()); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Evaluate Reverse Polish Notation
// Evaluate expression in Reverse Polish Notation.
// Input: ["2","1","+","3","*"] → Output: 9 ((2+1)*3)
// ─────────────────────────────────────────────────────────────
function evalRPN(tokens) {
  // APPROACH: Stack - push numbers, pop two when operator found
  // Time: O(n) | Space: O(n)
  const stack = [];
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b) // truncate toward zero
  };

  for (let token of tokens) {
    if (ops[token]) {
      const b = stack.pop(); // second operand
      const a = stack.pop(); // first operand
      stack.push(ops[token](a, b));
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack[0];
}
console.log("6. Eval RPN:", evalRPN(["2","1","+","3","*"])); // 9
console.log("6. Eval RPN:", evalRPN(["4","13","5","/","+"])); // 6

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Largest Rectangle in Histogram
// Find the largest rectangle in a histogram.
// Input: [2,1,5,6,2,3] → Output: 10
// ─────────────────────────────────────────────────────────────
function largestRectangleArea(heights) {
  // APPROACH: Monotonic Stack (increasing)
  // For each bar, find how far left and right it can extend
  // Time: O(n) | Space: O(n)
  const stack = []; // stores indices
  let maxArea = 0;
  heights.push(0); // sentinel to flush remaining stack

  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  heights.pop(); // restore original array
  return maxArea;
}
console.log("7. Largest Rectangle:", largestRectangleArea([2,1,5,6,2,3])); // 10

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Binary Tree Level Order Traversal (BFS with Queue)
// Return level-by-level values of a binary tree.
// ─────────────────────────────────────────────────────────────
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  // APPROACH: BFS using Queue
  // Process level by level, add children to queue
  // Time: O(n) | Space: O(n)
  if (!root) return [];
  const result = [];
  const queue = [root]; // start with root

  while (queue.length) {
    const levelSize = queue.length; // number of nodes at current level
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // dequeue
      level.push(node.val);
      if (node.left) queue.push(node.left);   // enqueue children
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
//       3
//      / \
//     9  20
//        / \
//       15   7
const tree = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log("8. Level Order:", levelOrder(tree)); // [[3],[9,20],[15,7]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Implement Stack using Queues
// Implement a LIFO stack using only queues.
// ─────────────────────────────────────────────────────────────
class MyStack {
  // APPROACH: Single queue - when pushing, rotate queue so new element is at front
  constructor() {
    this.queue = [];
  }

  push(x) {
    this.queue.push(x);
    // Rotate: move all elements before x to the back
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}
const myStack = new MyStack();
myStack.push(1); myStack.push(2);
console.log("9. Stack top:", myStack.top()); // 2
console.log("9. Stack pop:", myStack.pop()); // 2
console.log("9. Stack empty:", myStack.empty()); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Car Fleet
// Cars driving to destination. A fleet forms when a faster car
// catches up to a slower car. Count number of fleets.
// Input: target=12, position=[10,8,0,5,3], speed=[2,4,1,1,3]
// Output: 3
// ─────────────────────────────────────────────────────────────
function carFleet(target, position, speed) {
  // APPROACH: Sort by position (descending), use stack to track fleets
  // Calculate time to reach target for each car
  // If a car behind takes less time, it joins the fleet ahead
  // Time: O(n log n) | Space: O(n)
  const n = position.length;
  const cars = position.map((pos, i) => [pos, speed[i]]);
  cars.sort((a, b) => b[0] - a[0]); // sort by position descending

  const stack = []; // stores time to reach target
  for (let [pos, spd] of cars) {
    const time = (target - pos) / spd;
    // If this car takes longer than the car ahead, it forms a new fleet
    if (!stack.length || time > stack[stack.length - 1]) {
      stack.push(time);
    }
    // Otherwise, it catches up and joins the fleet (don't push)
  }
  return stack.length; // number of fleets
}
console.log("10. Car Fleet:", carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // 3

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                        | Data Structure | Time      | Space
// -------------------------------|----------------|-----------|------
// 1. Valid Parentheses           | Stack          | O(n)      | O(n)
// 2. Min Stack                   | Two Stacks     | O(1) all  | O(n)
// 3. Daily Temperatures          | Mono Stack     | O(n)      | O(n)
// 4. Next Greater Element        | Mono Stack     | O(n+m)    | O(n)
// 5. Queue using Stacks          | Two Stacks     | O(1) amort| O(n)
// 6. Evaluate RPN                | Stack          | O(n)      | O(n)
// 7. Largest Rectangle           | Mono Stack     | O(n)      | O(n)
// 8. Level Order Traversal       | Queue (BFS)    | O(n)      | O(n)
// 9. Stack using Queues          | Queue          | O(n) push | O(n)
// 10. Car Fleet                  | Stack          | O(nlogn)  | O(n)
// ============================================================
