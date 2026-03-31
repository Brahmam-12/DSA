// ============================================================
// 📚 TOPIC 6: LINKED LISTS
// ============================================================
//
// 🔑 CONCEPT:
// A Linked List is a linear data structure where elements (nodes)
// are stored in non-contiguous memory locations. Each node contains:
//   - data: the value
//   - next: pointer to the next node
//
// TYPES:
//   - Singly Linked List: each node points to next
//   - Doubly Linked List: each node points to next AND prev
//   - Circular Linked List: last node points back to head
//
// KEY OPERATIONS:
//   - Access:  O(n)  → must traverse from head
//   - Search:  O(n)  → traverse until found
//   - Insert at head: O(1)
//   - Insert at tail: O(n) or O(1) with tail pointer
//   - Delete:  O(n)  → find node first
//
// ADVANTAGES over Arrays:
//   ✅ Dynamic size (no pre-allocation)
//   ✅ O(1) insert/delete at known position
//
// DISADVANTAGES:
//   ❌ No random access (must traverse)
//   ❌ Extra memory for pointers
//   ❌ Not cache-friendly
//
// COMMON PATTERNS:
//   1. Fast & Slow Pointers → cycle detection, middle node
//   2. Dummy Head Node → simplify edge cases
//   3. Reverse in-place → reverse pointers
//   4. Merge → merge two sorted lists
//
// ============================================================

// Node class used in all problems
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper: Create linked list from array
function createList(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper: Convert linked list to array (for display)
function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Reverse a Linked List
// Input: 1→2→3→4→5 → Output: 5→4→3→2→1
// ─────────────────────────────────────────────────────────────
function reverseList(head) {
  // APPROACH: Iterative - keep track of prev, current, next
  // Reverse the pointer direction at each step
  //
  // VISUAL:
  // null ← 1 ← 2 ← 3 ← 4 ← 5
  //                           ↑ new head
  //
  // Time: O(n) | Space: O(1)
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next; // save next
    current.next = prev;       // reverse pointer
    prev = current;            // move prev forward
    current = next;            // move current forward
  }
  return prev; // prev is now the new head
}
const list1 = createList([1, 2, 3, 4, 5]);
console.log("1. Reverse List:", listToArray(reverseList(list1))); // [5,4,3,2,1]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Merge Two Sorted Lists
// Input: l1 = 1→2→4, l2 = 1→3→4 → Output: 1→1→2→3→4→4
// ─────────────────────────────────────────────────────────────
function mergeTwoLists(l1, l2) {
  // APPROACH: Dummy head + compare and link smaller node
  // Time: O(n + m) | Space: O(1)
  const dummy = new ListNode(0); // dummy head simplifies edge cases
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  current.next = l1 || l2; // attach remaining list
  return dummy.next;
}
const l1 = createList([1, 2, 4]);
const l2 = createList([1, 3, 4]);
console.log("2. Merge Sorted Lists:", listToArray(mergeTwoLists(l1, l2))); // [1,1,2,3,4,4]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Linked List Cycle Detection
// Return true if the linked list has a cycle.
// ─────────────────────────────────────────────────────────────
function hasCycle(head) {
  // APPROACH: Floyd's Cycle Detection (Fast & Slow pointers)
  // Fast moves 2 steps, slow moves 1 step
  // If cycle exists, they will meet
  // Time: O(n) | Space: O(1)
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
// Create cycle: 3→2→0→-4→(back to 2)
const cycleHead = createList([3, 2, 0, -4]);
cycleHead.next.next.next.next = cycleHead.next; // create cycle
console.log("3. Has Cycle:", hasCycle(cycleHead)); // true
console.log("3. No Cycle:", hasCycle(createList([1, 2]))); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Find Middle of Linked List
// Input: 1→2→3→4→5 → Output: node with value 3
// ─────────────────────────────────────────────────────────────
function middleNode(head) {
  // APPROACH: Fast & Slow pointers
  // When fast reaches end, slow is at middle
  // Time: O(n) | Space: O(1)
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
const list4 = createList([1, 2, 3, 4, 5]);
console.log("4. Middle Node:", middleNode(list4).val); // 3
const list4b = createList([1, 2, 3, 4, 5, 6]);
console.log("4. Middle Node (even):", middleNode(list4b).val); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Remove Nth Node From End
// Input: 1→2→3→4→5, n = 2 → Output: 1→2→3→5
// ─────────────────────────────────────────────────────────────
function removeNthFromEnd(head, n) {
  // APPROACH: Two pointers with n gap between them
  // When fast reaches end, slow is at the node before target
  // Time: O(n) | Space: O(1)
  const dummy = new ListNode(0);
  dummy.next = head;
  let slow = dummy, fast = dummy;

  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) fast = fast.next;

  // Move both until fast reaches end
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next; // remove the nth node
  return dummy.next;
}
const list5 = createList([1, 2, 3, 4, 5]);
console.log("5. Remove Nth From End:", listToArray(removeNthFromEnd(list5, 2))); // [1,2,3,5]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Palindrome Linked List
// Check if linked list is a palindrome.
// Input: 1→2→2→1 → Output: true
// ─────────────────────────────────────────────────────────────
function isPalindrome(head) {
  // APPROACH:
  // 1. Find middle using fast/slow pointers
  // 2. Reverse second half
  // 3. Compare first and second half
  // Time: O(n) | Space: O(1)
  let slow = head, fast = head;

  // Find middle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let prev = null, current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // Compare both halves
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
console.log("6. Palindrome:", isPalindrome(createList([1, 2, 2, 1]))); // true
console.log("6. Palindrome:", isPalindrome(createList([1, 2]))); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Intersection of Two Linked Lists
// Find the node where two linked lists intersect.
// ─────────────────────────────────────────────────────────────
function getIntersectionNode(headA, headB) {
  // APPROACH: Two pointers - when one reaches end, redirect to other list's head
  // They will meet at intersection after traversing same total distance
  // Time: O(n + m) | Space: O(1)
  let a = headA, b = headB;
  while (a !== b) {
    a = a ? a.next : headB; // redirect to headB when a reaches end
    b = b ? b.next : headA; // redirect to headA when b reaches end
  }
  return a; // null if no intersection
}
// Create intersection: A: 4→1→8→4→5, B: 5→6→1→8→4→5
const shared = createList([8, 4, 5]);
const headA = new ListNode(4);
headA.next = new ListNode(1);
headA.next.next = shared;
const headB = new ListNode(5);
headB.next = new ListNode(6);
headB.next.next = new ListNode(1);
headB.next.next.next = shared;
const intersection = getIntersectionNode(headA, headB);
console.log("7. Intersection Node:", intersection ? intersection.val : null); // 8

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Reorder List
// Reorder: L0→L1→...→Ln-1→Ln to L0→Ln→L1→Ln-1→L2→Ln-2→...
// Input: 1→2→3→4 → Output: 1→4→2→3
// ─────────────────────────────────────────────────────────────
function reorderList(head) {
  // APPROACH:
  // 1. Find middle
  // 2. Reverse second half
  // 3. Merge two halves alternately
  // Time: O(n) | Space: O(1)
  if (!head || !head.next) return;

  // Step 1: Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null, current = slow.next;
  slow.next = null; // cut the list
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // Step 3: Merge alternately
  let first = head, second = prev;
  while (second) {
    const nextFirst = first.next;
    const nextSecond = second.next;
    first.next = second;
    second.next = nextFirst;
    first = nextFirst;
    second = nextSecond;
  }
}
const list8 = createList([1, 2, 3, 4]);
reorderList(list8);
console.log("8. Reorder List:", listToArray(list8)); // [1,4,2,3]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Add Two Numbers
// Two non-empty linked lists represent two non-negative integers
// (digits stored in reverse order). Add them.
// Input: (2→4→3) + (5→6→4) → Output: 7→0→8 (342 + 465 = 807)
// ─────────────────────────────────────────────────────────────
function addTwoNumbers(l1, l2) {
  // APPROACH: Simulate addition with carry
  // Time: O(max(n,m)) | Space: O(max(n,m))
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
}
const num1 = createList([2, 4, 3]); // 342
const num2 = createList([5, 6, 4]); // 465
console.log("9. Add Two Numbers:", listToArray(addTwoNumbers(num1, num2))); // [7,0,8] = 807

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Copy List with Random Pointer
// Deep copy a linked list where each node has a random pointer.
// ─────────────────────────────────────────────────────────────
class RandomNode {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function copyRandomList(head) {
  // APPROACH: HashMap - map original nodes to their copies
  // First pass: create all copies
  // Second pass: set next and random pointers
  // Time: O(n) | Space: O(n)
  if (!head) return null;

  const map = new Map(); // original → copy

  // First pass: create copies
  let current = head;
  while (current) {
    map.set(current, new RandomNode(current.val));
    current = current.next;
  }

  // Second pass: set pointers
  current = head;
  while (current) {
    const copy = map.get(current);
    copy.next = map.get(current.next) || null;
    copy.random = map.get(current.random) || null;
    current = current.next;
  }

  return map.get(head);
}

// Create: 7→13→11→10→1 with random pointers
const rn1 = new RandomNode(7);
const rn2 = new RandomNode(13);
const rn3 = new RandomNode(11);
rn1.next = rn2; rn2.next = rn3;
rn1.random = null; rn2.random = rn1; rn3.random = rn1;
const copied = copyRandomList(rn1);
console.log("10. Copy Random List:", copied.val, copied.next.val, copied.next.random.val);
// 7, 13, 7 (random of 13 points to 7)

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                      | Pattern          | Time    | Space
// -----------------------------|------------------|---------|------
// 1. Reverse Linked List       | Iterative        | O(n)    | O(1)
// 2. Merge Two Sorted Lists    | Dummy Head       | O(n+m)  | O(1)
// 3. Cycle Detection           | Fast & Slow      | O(n)    | O(1)
// 4. Find Middle               | Fast & Slow      | O(n)    | O(1)
// 5. Remove Nth From End       | Two Pointers     | O(n)    | O(1)
// 6. Palindrome Check          | Reverse Half     | O(n)    | O(1)
// 7. Intersection              | Two Pointers     | O(n+m)  | O(1)
// 8. Reorder List              | Find+Reverse+Merge| O(n)   | O(1)
// 9. Add Two Numbers           | Simulation       | O(n)    | O(n)
// 10. Copy with Random Pointer | HashMap          | O(n)    | O(n)
// ============================================================
