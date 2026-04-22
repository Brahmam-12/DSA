
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║              🌳 BINARY TREE — COMPLETE DSA MASTERY GUIDE 🌳              ║
// ║                  15 Problems | Patterns | Intuition | Tests              ║
// ╚══════════════════════════════════════════════════════════════════════════╝

// ┌─────────────────────────────────────────────────────────────────────────┐
// │                     🗺️  QUICK REVISION CHEAT SHEET                      │
// ├─────────────────────────────────────────────────────────────────────────┤
// │  PATTERN              │ WHEN TO USE                                     │
// │  ─────────────────────┼────────────────────────────────────────────────│
// │  DFS (Recursion)      │ Depth, paths, subtree comparisons               │
// │  DFS Post-order       │ Need children's result BEFORE parent (LCA, dia) │
// │  DFS Pre-order        │ Need parent BEFORE children (serialize, copy)   │
// │  BFS (Queue)          │ Level-by-level, shortest path, right side view  │
// │  Inorder (BST)        │ BST problems — inorder gives SORTED sequence    │
// │  Min/Max Bounds       │ Validate BST                                    │
// │  Global Variable      │ Diameter, Max Path Sum (can't return two values)│
// └─────────────────────────────────────────────────────────────────────────┘

// ┌─────────────────────────────────────────────────────────────────────────┐
// │                    🧠 CORE MENTAL MODELS                                │
// ├─────────────────────────────────────────────────────────────────────────┤
// │  • Every tree problem = "What do I need from my children to answer      │
// │    the question at this node?"                                          │
// │  • DFS = go deep first, BFS = go wide first                             │
// │  • Recursion = trust that the function works for smaller trees          │
// │  • Base case is ALWAYS: what happens at null? what happens at a leaf?   │
// └─────────────────────────────────────────────────────────────────────────┘

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 0 — FOUNDATIONS (Building Blocks)
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
//  TreeNode Class
// ─────────────────────────────────────────────────────────────────────────
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// ─────────────────────────────────────────────────────────────────────────
//  convertTree: Array (BFS level-order) → Binary Tree
//  e.g. [3, 9, 20, null, null, 15, 7]  →  builds the tree visually below:
//
//         3
//        / \
//       9  20
//          / \
//         15   7
// ─────────────────────────────────────────────────────────────────────────
function convertTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (i < arr.length) {
        const current = queue.shift();

        // Left child
        if (arr[i] !== null && arr[i] !== undefined) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;

        // Right child
        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i++;
    }
    return root;
}

// ─────────────────────────────────────────────────────────────────────────
//  TRAVERSALS — The 4 Fundamental Ways to Walk a Tree
//
//  Think of a tree like a building:
//  • PreOrder  = enter room, then explore left wing, then right wing
//  • InOrder   = explore left wing, enter room, then right wing
//  • PostOrder = explore left wing, right wing, then enter room
//  • BFS       = floor by floor (level by level)
// ─────────────────────────────────────────────────────────────────────────

// PreOrder: Root → Left → Right
// USE CASE: Copy a tree, serialize a tree, print directory structure
function preOrder(root, result = []) {
    if (root === null) return result;   // base case: nothing to visit
    result.push(root.val);              // visit ROOT first
    preOrder(root.left, result);        // then go LEFT
    preOrder(root.right, result);       // then go RIGHT
    return result;
}

// InOrder: Left → Root → Right
// USE CASE: BST → gives SORTED output (most important BST property!)
function inOrder(root, result = []) {
    if (root === null) return result;
    inOrder(root.left, result);         // go LEFT first
    result.push(root.val);              // visit ROOT in middle
    inOrder(root.right, result);        // then go RIGHT
    return result;
}

// PostOrder: Left → Right → Root
// USE CASE: Delete a tree, calculate folder sizes, evaluate expressions
function postOrder(root, result = []) {
    if (root === null) return result;
    postOrder(root.left, result);       // go LEFT first
    postOrder(root.right, result);      // then go RIGHT
    result.push(root.val);              // visit ROOT last
    return result;
}

// BFS (Level Order): Level by level, left to right
// USE CASE: Shortest path, level-based problems, right side view
function bfs(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];               // start with root in queue

    while (queue.length > 0) {
        const node = queue.shift();     // take from front
        result.push(node.val);

        if (node.left)  queue.push(node.left);   // add children to back
        if (node.right) queue.push(node.right);
    }
    return result;
}

// Quick test for traversals
const traversalTree = convertTree([1, 2, 3, 4, 5]);
//         1
//        / \
//       2   3
//      / \
//     4   5
console.log("=== TRAVERSALS ===");
console.log("PreOrder  (Root→L→R):", preOrder(traversalTree));   // [1,2,4,5,3]
console.log("InOrder   (L→Root→R):", inOrder(traversalTree));    // [4,2,5,1,3]
console.log("PostOrder (L→R→Root):", postOrder(traversalTree));  // [4,5,2,3,1]
console.log("BFS       (Level)   :", bfs(traversalTree));        // [1,2,3,4,5]


// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 1 — CORE RECURSION PROBLEMS
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 1: Maximum Depth of Binary Tree
//  LeetCode #104
//
//  MENTAL MODEL: Imagine you're at the top of a tree and you drop a ball
//  down every branch. The depth is how far the ball falls on the longest path.
//
//  PATTERN: DFS Recursion (Post-order style)
//
//  INTUITION:
//  "The depth of a tree = 1 (for current node) + max(depth of left, depth of right)"
//  At null → depth is 0 (nothing here)
//
//  WHY POST-ORDER? Because we need children's depths BEFORE we can compute
//  the current node's depth.
//
//  TIME: O(n) — we visit every node exactly once
//  SPACE: O(h) — call stack depth = height of tree
//         O(log n) for balanced, O(n) for skewed (worst case)
//
//  COMMON MISTAKE: Returning -1 for null instead of 0
// ─────────────────────────────────────────────────────────────────────────
function maxDepth(root) {
    // BASE CASE: empty tree or we've gone past a leaf → depth is 0
    if (root === null) return 0;

    // RECURSIVE CASE:
    // Ask left subtree: "what's your depth?"
    const leftDepth = maxDepth(root.left);
    // Ask right subtree: "what's your depth?"
    const rightDepth = maxDepth(root.right);

    // Current node adds 1 level on top of the deeper subtree
    return 1 + Math.max(leftDepth, rightDepth);
}

// TEST:
//       3
//      / \
//     9  20
//        / \
//       15   7
const t1 = convertTree([3, 9, 20, null, null, 15, 7]);
console.log("\n=== PROBLEM 1: Max Depth ===");
console.log(maxDepth(t1)); // Expected: 3
console.log(maxDepth(convertTree([1, null, 2]))); // Expected: 2


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 2: Same Tree
//  LeetCode #100
//
//  MENTAL MODEL: Two trees are the same if they're both empty, OR
//  both have the same root value AND their left subtrees are the same
//  AND their right subtrees are the same.
//
//  PATTERN: DFS Recursion (Pre-order style — check root first)
//
//  INTUITION: Walk both trees simultaneously. At every step, ask:
//  "Are these two nodes equal?" If yes, recurse. If no, return false.
//
//  KEY INSIGHT: There are only 3 cases:
//  1. Both null → true (both ended at same time)
//  2. One null, one not → false (different structure)
//  3. Both exist → check value AND recurse on children
//
//  TIME: O(n) — visit every node
//  SPACE: O(h) — call stack
// ─────────────────────────────────────────────────────────────────────────
function isSameTree(p, q) {
    // CASE 1: Both are null → they match at this position
    if (p === null && q === null) return true;

    // CASE 2: One is null, other isn't → structure mismatch
    if (p === null || q === null) return false;

    // CASE 3: Both exist → check value AND recurse on both sides
    // WHY &&? All three conditions must be true simultaneously
    return (p.val === q.val) &&
           isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}

// TEST:
//  Tree1:  1      Tree2:  1
//         / \            / \
//        2   3          2   3
console.log("\n=== PROBLEM 2: Same Tree ===");
const p2 = convertTree([1, 2, 3]);
const q2 = convertTree([1, 2, 3]);
const q2b = convertTree([1, 2, 4]); // different
console.log(isSameTree(p2, q2));  // Expected: true
console.log(isSameTree(p2, q2b)); // Expected: false


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 3: Invert Binary Tree
//  LeetCode #226
//
//  MENTAL MODEL: Hold the tree up to a mirror. Every left child becomes
//  a right child and vice versa. Do this at EVERY node.
//
//  PATTERN: DFS Recursion (Pre-order — swap first, then recurse)
//
//  INTUITION:
//  At each node: swap left and right children, then recursively invert
//  each subtree. The order matters: swap THEN recurse (or recurse THEN swap
//  — both work, but swap-first is more intuitive).
//
//  TIME: O(n) — visit every node
//  SPACE: O(h) — call stack
//
//  COMMON MISTAKE: Forgetting to return the root at the end
// ─────────────────────────────────────────────────────────────────────────
function invertTree(root) {
    // BASE CASE: null node → nothing to invert
    if (root === null) return null;

    // SWAP: exchange left and right children
    // Using destructuring for clean swap (no temp variable needed)
    [root.left, root.right] = [root.right, root.left];

    // RECURSE: invert each subtree
    invertTree(root.left);
    invertTree(root.right);

    // Return root (important! caller needs the reference)
    return root;
}

// TEST:
//  Before:     4          After:      4
//             / \                    / \
//            2   7                  7   2
//           / \ / \                / \ / \
//          1  3 6  9              9  6 3  1
console.log("\n=== PROBLEM 3: Invert Binary Tree ===");
const t3 = convertTree([4, 2, 7, 1, 3, 6, 9]);
console.log("Before invert:", inOrder(t3));  // [1,2,3,4,6,7,9]
invertTree(t3);
console.log("After invert: ", inOrder(t3));  // [9,7,6,4,3,2,1]


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 4: Balanced Binary Tree
//  LeetCode #110
//
//  DEFINITION: A tree is balanced if for EVERY node, the height difference
//  between left and right subtrees is at most 1.
//
//  MENTAL MODEL: Think of a balanced tree like a balanced scale — at every
//  node, neither side can be more than 1 level taller than the other.
//
//  PATTERN: DFS Post-order + Early termination trick
//
//  NAIVE APPROACH (O(n²)): For each node, compute height separately.
//  OPTIMAL APPROACH (O(n)): Compute height AND check balance in ONE pass.
//
//  KEY TRICK: Return -1 as a "poison value" to signal "already unbalanced".
//  Once we detect imbalance anywhere, propagate -1 upward — no need to
//  continue checking.
//
//  TIME: O(n) — each node visited once
//  SPACE: O(h) — call stack
// ─────────────────────────────────────────────────────────────────────────
function isBalanced(root) {
    // Helper: returns height if balanced, -1 if unbalanced
    function checkHeight(node) {
        // BASE CASE: null node has height 0, and is trivially balanced
        if (node === null) return 0;

        // Get left subtree height (or -1 if already unbalanced)
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1; // EARLY EXIT: left is unbalanced

        // Get right subtree height (or -1 if already unbalanced)
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1; // EARLY EXIT: right is unbalanced

        // Check balance at THIS node
        if (Math.abs(leftHeight - rightHeight) > 1) return -1; // THIS node unbalanced

        // Return actual height of this subtree
        return 1 + Math.max(leftHeight, rightHeight);
    }

    return checkHeight(root) !== -1;
}

// TEST:
//  Balanced:     3        Unbalanced:   1
//               / \                     \
//              9  20                     2
//                 / \                     \
//                15   7                    3
console.log("\n=== PROBLEM 4: Balanced Binary Tree ===");
console.log(isBalanced(convertTree([3, 9, 20, null, null, 15, 7]))); // true
console.log(isBalanced(convertTree([1, null, 2, null, 3])));          // false


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 5: Diameter of Binary Tree
//  LeetCode #543
//
//  DEFINITION: Diameter = the length of the LONGEST path between any two
//  nodes. The path may or may not pass through the root.
//
//  MENTAL MODEL: Imagine stretching a rubber band between the two farthest
//  leaves. The diameter is how long that rubber band is (in edges).
//
//  PATTERN: DFS Post-order + Global Maximum variable
//
//  KEY INSIGHT: The longest path through any node = leftHeight + rightHeight
//  (the path goes down the left side and down the right side).
//  But the GLOBAL diameter might be in a subtree, not through the root!
//  That's why we need a global variable to track the maximum seen so far.
//
//  WHY CAN'T WE JUST RETURN THE DIAMETER? Because we need to return HEIGHT
//  to the parent (so it can compute its own diameter), but we also need to
//  track the max diameter. Two different values → use a closure/global.
//
//  TIME: O(n)
//  SPACE: O(h)
// ─────────────────────────────────────────────────────────────────────────
function diameterOfBinaryTree(root) {
    let maxDiameter = 0; // global tracker — updated as we recurse

    function height(node) {
        if (node === null) return 0;

        const leftH = height(node.left);
        const rightH = height(node.right);

        // The diameter THROUGH this node = leftH + rightH
        // Update global max if this path is longer
        maxDiameter = Math.max(maxDiameter, leftH + rightH);

        // Return HEIGHT (not diameter!) to the parent
        return 1 + Math.max(leftH, rightH);
    }

    height(root);
    return maxDiameter;
}

// TEST:
//       1
//      / \
//     2   3
//    / \
//   4   5
// Longest path: 4→2→1→3 or 5→2→1→3 = 3 edges
console.log("\n=== PROBLEM 5: Diameter of Binary Tree ===");
console.log(diameterOfBinaryTree(convertTree([1, 2, 3, 4, 5]))); // Expected: 3
console.log(diameterOfBinaryTree(convertTree([1, 2]))); // Expected: 1


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 6: Path Sum
//  LeetCode #112
//
//  PROBLEM: Does there exist a root-to-leaf path where the sum of values
//  equals the target?
//
//  MENTAL MODEL: You're hiking from the mountain top (root) to the valley
//  (leaf). At each step, subtract the current node's value from your budget.
//  If you reach a leaf with exactly 0 budget left → success!
//
//  PATTERN: DFS Recursion — subtract as you go down
//
//  KEY INSIGHT: Instead of carrying a running sum, SUBTRACT from target.
//  When you reach a leaf, check if remaining == 0.
//  This avoids needing to pass both current sum AND target.
//
//  IMPORTANT: Path must end at a LEAF (node with no children), not just
//  any node. This is a common mistake!
//
//  TIME: O(n)
//  SPACE: O(h)
// ─────────────────────────────────────────────────────────────────────────
function hasPathSum(root, targetSum) {
    // BASE CASE 1: null node → no path here
    if (root === null) return false;

    // Subtract current node's value from remaining target
    const remaining = targetSum - root.val;

    // BASE CASE 2: We're at a LEAF (no children)
    // Check if we've exactly used up the target
    if (root.left === null && root.right === null) {
        return remaining === 0;
    }

    // RECURSIVE CASE: Check if either subtree has a valid path
    // WHY ||? We only need ONE valid path to return true
    return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

// TEST:
//         5
//        / \
//       4   8
//      /   / \
//     11  13   4
//    /  \       \
//   7    2       1
// Path 5→4→11→2 = 22 ✓
console.log("\n=== PROBLEM 6: Path Sum ===");
const t6 = convertTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);
console.log(hasPathSum(t6, 22)); // Expected: true
console.log(hasPathSum(t6, 27)); // Expected: false


// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 2 — BFS / LEVEL ORDER PROBLEMS
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 7: Binary Tree Level Order Traversal
//  LeetCode #102
//
//  MENTAL MODEL: Photograph the tree floor by floor. Each photo (array)
//  contains all nodes on that floor (level).
//
//  PATTERN: BFS with Queue — process level by level
//
//  KEY TRICK: How do we know when one level ends and the next begins?
//  → Snapshot the queue SIZE at the start of each level.
//    Process exactly that many nodes → that's one complete level.
//
//  TIME: O(n) — visit every node
//  SPACE: O(n) — queue can hold up to n/2 nodes (last level of full tree)
// ─────────────────────────────────────────────────────────────────────────
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length; // SNAPSHOT: how many nodes are on this level?
        const currentLevel = [];

        // Process EXACTLY levelSize nodes (one complete level)
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // Add children for the NEXT level
            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel); // save this level's values
    }

    return result;
}

// TEST:
//       3
//      / \
//     9  20
//        / \
//       15   7
// Expected: [[3], [9,20], [15,7]]
console.log("\n=== PROBLEM 7: Level Order Traversal ===");
console.log(JSON.stringify(levelOrder(convertTree([3, 9, 20, null, null, 15, 7]))));
// [[3],[9,20],[15,7]]


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 8: Binary Tree Right Side View
//  LeetCode #199
//
//  MENTAL MODEL: Stand to the right of the tree and look left. You see
//  exactly one node per level — the rightmost one.
//
//  PATTERN: BFS — take the LAST node of each level
//
//  ALTERNATIVE: DFS — visit right child first, record first node at each depth
//
//  KEY INSIGHT: In BFS level order, the LAST node processed in each level
//  is the rightmost node visible from the right side.
//
//  TIME: O(n)
//  SPACE: O(n)
// ─────────────────────────────────────────────────────────────────────────
function rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Only add to result if this is the LAST node of the level
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}

// TEST:
//       1
//      / \
//     2   3
//      \   \
//       5   4
// Right side: [1, 3, 4]
console.log("\n=== PROBLEM 8: Right Side View ===");
console.log(rightSideView(convertTree([1, 2, 3, null, 5, null, 4]))); // [1,3,4]
console.log(rightSideView(convertTree([1, null, 3]))); // [1,3]


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 9: Binary Tree Zigzag Level Order Traversal
//  LeetCode #103
//
//  MENTAL MODEL: Read level 1 left→right, level 2 right→left, level 3
//  left→right, and so on — like a snake going back and forth.
//
//  PATTERN: BFS + direction flag
//
//  KEY TRICK: Instead of reversing the queue (expensive), just reverse
//  the collected level array before pushing to result when going right→left.
//  OR use a deque and add to front/back based on direction.
//
//  TIME: O(n)
//  SPACE: O(n)
// ─────────────────────────────────────────────────────────────────────────
function zigzagLevelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let leftToRight = true; // direction flag: starts left→right

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left)  queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // If going right→left, reverse the level before adding
        if (!leftToRight) currentLevel.reverse();

        result.push(currentLevel);
        leftToRight = !leftToRight; // flip direction for next level
    }

    return result;
}

// TEST:
//       3
//      / \
//     9  20
//        / \
//       15   7
// Expected: [[3], [20,9], [15,7]]
console.log("\n=== PROBLEM 9: Zigzag Level Order ===");
console.log(JSON.stringify(zigzagLevelOrder(convertTree([3, 9, 20, null, null, 15, 7]))));
// [[3],[20,9],[15,7]]


// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 3 — ADVANCED TREE PROBLEMS
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 10: Lowest Common Ancestor of a Binary Tree
//  LeetCode #236
//
//  DEFINITION: LCA(p, q) = the deepest node that has both p and q as
//  descendants (a node is a descendant of itself).
//
//  MENTAL MODEL: Two people (p and q) are climbing up a family tree.
//  The LCA is the first ancestor they share — the point where their
//  paths first meet going upward.
//
//  PATTERN: DFS Post-order — children report back to parent
//
//  KEY INSIGHT (The Magic Logic):
//  At each node, ask: "Is p or q in my left subtree? In my right subtree?"
//  • If p is on left AND q is on right (or vice versa) → THIS node is LCA
//  • If both are on the same side → LCA is deeper, return what that side found
//  • If current node IS p or q → return current node (it could be the LCA)
//
//  WHY POST-ORDER? We need to know what's in the subtrees BEFORE deciding
//  if the current node is the LCA.
//
//  TIME: O(n)
//  SPACE: O(h)
// ─────────────────────────────────────────────────────────────────────────
function lowestCommonAncestor(root, p, q) {
    // BASE CASE: reached null → p/q not found in this path
    if (root === null) return null;

    // BASE CASE: current node IS p or q → return it
    // (even if the other is in its subtree, this node is still the LCA)
    if (root.val === p.val || root.val === q.val) return root;

    // RECURSE: search both subtrees
    const leftResult  = lowestCommonAncestor(root.left, p, q);
    const rightResult = lowestCommonAncestor(root.right, p, q);

    // DECISION:
    // If both sides returned something → p is on one side, q on the other
    // → THIS node is the LCA!
    if (leftResult !== null && rightResult !== null) return root;

    // If only one side found something → LCA is deeper on that side
    return leftResult !== null ? leftResult : rightResult;
}

// TEST:
//         3
//        / \
//       5   1
//      / \ / \
//     6  2 0  8
//       / \
//      7   4
// LCA(5, 1) = 3,  LCA(5, 4) = 5
console.log("\n=== PROBLEM 10: Lowest Common Ancestor (BT) ===");
const t10 = convertTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
const p10a = t10.left;          // node 5
const q10a = t10.right;         // node 1
const p10b = t10.left;          // node 5
const q10b = t10.left.right.right; // node 4
console.log(lowestCommonAncestor(t10, p10a, q10a).val); // Expected: 3
console.log(lowestCommonAncestor(t10, p10b, q10b).val); // Expected: 5


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 11: Binary Tree Maximum Path Sum
//  LeetCode #124
//
//  DEFINITION: A path is any sequence of nodes where each pair of adjacent
//  nodes has an edge. The path does NOT need to pass through the root.
//  Find the path with the maximum sum.
//
//  MENTAL MODEL: Imagine water flowing through the tree. At each node,
//  water can flow from the left branch, through the node, and out the right
//  branch. The "maximum path sum" is the most valuable route water can take.
//
//  PATTERN: DFS Post-order + Global Maximum (same pattern as Diameter!)
//
//  KEY INSIGHT:
//  At each node, the best path THROUGH it = node.val + leftGain + rightGain
//  But we can only RETURN one direction to the parent (a path can't fork).
//  So we return: node.val + max(leftGain, rightGain)
//
//  TRICKY PART: Negative values! If a subtree has negative sum, we're
//  better off NOT including it. So we use Math.max(gain, 0) to "prune"
//  negative contributions.
//
//  TIME: O(n)
//  SPACE: O(h)
// ─────────────────────────────────────────────────────────────────────────
function maxPathSum(root) {
    let globalMax = -Infinity; // can be negative if all nodes are negative

    function maxGain(node) {
        if (node === null) return 0;

        // Get the best gain from each side (ignore negative contributions)
        const leftGain  = Math.max(maxGain(node.left), 0);  // 0 = don't use left
        const rightGain = Math.max(maxGain(node.right), 0); // 0 = don't use right

        // Best path THROUGH this node (can use both sides)
        const pathThroughNode = node.val + leftGain + rightGain;

        // Update global max
        globalMax = Math.max(globalMax, pathThroughNode);

        // Return to parent: can only extend in ONE direction
        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    return globalMax;
}

// TEST:
//    -10
//    / \
//   9  20
//      / \
//     15   7
// Best path: 15→20→7 = 42
console.log("\n=== PROBLEM 11: Binary Tree Maximum Path Sum ===");
console.log(maxPathSum(convertTree([-10, 9, 20, null, null, 15, 7]))); // Expected: 42
console.log(maxPathSum(convertTree([1, 2, 3]))); // Expected: 6 (2+1+3)
console.log(maxPathSum(convertTree([-3]))); // Expected: -3 (only node)


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 12: Serialize and Deserialize Binary Tree
//  LeetCode #297
//
//  PROBLEM: Convert a tree to a string (serialize) and back (deserialize).
//  This is used in databases, network transmission, file storage.
//
//  MENTAL MODEL: Serialize = take a photo of the tree (flatten to string).
//  Deserialize = rebuild the tree from the photo.
//
//  PATTERN: BFS for serialize, BFS for deserialize
//  (PreOrder DFS also works — see comments)
//
//  KEY INSIGHT FOR DESERIALIZE:
//  We use a queue of values. For each node we create, we pull the next
//  two values from the queue to be its left and right children.
//  "null" markers tell us where the tree ends.
//
//  TIME: O(n) for both
//  SPACE: O(n) for both
// ─────────────────────────────────────────────────────────────────────────

// SERIALIZE: Tree → String
// Format: "3,9,20,null,null,15,7" (BFS level order with nulls)
function serialize(root) {
    if (!root) return "null";

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === null) {
            result.push("null");
        } else {
            result.push(String(node.val));
            queue.push(node.left);   // push even if null (we need the marker)
            queue.push(node.right);
        }
    }

    return result.join(",");
}

// DESERIALIZE: String → Tree
function deserialize(data) {
    if (data === "null") return null;

    const values = data.split(",");
    const root = new TreeNode(parseInt(values[0]));
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
        const node = queue.shift();

        // Left child
        if (values[i] !== "null") {
            node.left = new TreeNode(parseInt(values[i]));
            queue.push(node.left);
        }
        i++;

        // Right child
        if (i < values.length && values[i] !== "null") {
            node.right = new TreeNode(parseInt(values[i]));
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

// TEST:
console.log("\n=== PROBLEM 12: Serialize & Deserialize ===");
const t12 = convertTree([1, 2, 3, null, null, 4, 5]);
const serialized = serialize(t12);
console.log("Serialized:", serialized);
const deserialized = deserialize(serialized);
console.log("Deserialized (level order):", bfs(deserialized)); // Should match original


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 13: Construct Binary Tree from Preorder and Inorder Traversal
//  LeetCode #105
//
//  GIVEN: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
//  BUILD: The original binary tree
//
//  MENTAL MODEL:
//  • PreOrder's FIRST element is always the ROOT
//  • In InOrder, find that root → everything LEFT of it is the left subtree,
//    everything RIGHT of it is the right subtree
//  • Repeat recursively for each subtree
//
//  PATTERN: Recursion + HashMap for O(1) index lookup
//
//  DRY RUN:
//  preorder = [3, 9, 20, 15, 7]
//  inorder  = [9, 3, 15, 20, 7]
//
//  Step 1: root = 3 (first of preorder)
//          inorder index of 3 = 1
//          left subtree inorder:  [9]       (indices 0..0)
//          right subtree inorder: [15,20,7] (indices 2..4)
//          left subtree preorder:  [9]       (next 1 element)
//          right subtree preorder: [20,15,7] (remaining)
//
//  Step 2: Build left: root=9, no children
//  Step 3: Build right: root=20, left=15, right=7
//
//  TIME: O(n) with HashMap, O(n²) without
//  SPACE: O(n) for HashMap + O(h) call stack
// ─────────────────────────────────────────────────────────────────────────
function buildTree(preorder, inorder) {
    // Build a map: value → index in inorder (for O(1) lookup)
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    // preIndex tracks which element of preorder we're currently using as root
    let preIndex = 0;

    function build(left, right) {
        // BASE CASE: no elements to build from
        if (left > right) return null;

        // The current root is always the next element in preorder
        const rootVal = preorder[preIndex++];
        const root = new TreeNode(rootVal);

        // Find where this root sits in inorder
        const mid = inorderMap.get(rootVal);

        // Elements to the LEFT of mid in inorder → left subtree
        // Elements to the RIGHT of mid in inorder → right subtree
        // IMPORTANT: Build LEFT first (because preorder goes left before right)
        root.left  = build(left, mid - 1);
        root.right = build(mid + 1, right);

        return root;
    }

    return build(0, inorder.length - 1);
}

// TEST:
console.log("\n=== PROBLEM 13: Construct Tree from Traversals ===");
const t13 = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log("Level order:", bfs(t13));    // Expected: [3,9,20,15,7]
console.log("Inorder:    ", inOrder(t13)); // Expected: [9,3,15,20,7]


// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 4 — BST (Binary Search Tree) PROBLEMS
//
//  🔑 THE GOLDEN RULE OF BST:
//  For every node:
//    • ALL values in LEFT subtree < node.val
//    • ALL values in RIGHT subtree > node.val
//  This means: INORDER traversal of a BST gives a SORTED array!
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 14: Validate Binary Search Tree
//  LeetCode #98
//
//  PROBLEM: Given a binary tree, determine if it is a valid BST.
//
//  MENTAL MODEL: Each node has an "allowed range" [min, max].
//  • Root can be anything: (-∞, +∞)
//  • Left child must be in (-∞, parent.val)
//  • Right child must be in (parent.val, +∞)
//  As we go deeper, the range gets tighter.
//
//  PATTERN: DFS with min/max bounds passed down
//
//  COMMON MISTAKE: Only checking immediate parent-child relationship.
//  Example:     5
//              / \
//             1   4
//                / \
//               3   6
//  Node 3 < 5 (root), so it CANNOT be in the right subtree of 5!
//  Just checking 3 < 4 (parent) is NOT enough.
//  We need to pass down the constraint that right subtree of 5 must be > 5.
//
//  TIME: O(n)
//  SPACE: O(h)
// ─────────────────────────────────────────────────────────────────────────
function isValidBST(root) {
    function validate(node, min, max) {
        // BASE CASE: null node is always valid
        if (node === null) return true;

        // Check if current node's value is within allowed range
        if (node.val <= min || node.val >= max) return false;

        // Recurse:
        // Left child: must be LESS than current node → update max to node.val
        // Right child: must be GREATER than current node → update min to node.val
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }

    return validate(root, -Infinity, Infinity);
}

// TEST:
//  Valid BST:    2        Invalid BST:   5
//               / \                    / \
//              1   3                  1   4
//                                        / \
//                                       3   6
console.log("\n=== PROBLEM 14: Validate BST ===");
console.log(isValidBST(convertTree([2, 1, 3])));          // Expected: true
console.log(isValidBST(convertTree([5, 1, 4, null, null, 3, 6]))); // Expected: false


// ─────────────────────────────────────────────────────────────────────────
//  PROBLEM 15: Kth Smallest Element in a BST
//  LeetCode #230
//
//  MENTAL MODEL: Remember the golden rule — inorder traversal of a BST
//  gives values in SORTED (ascending) order. So the Kth smallest is just
//  the Kth element in the inorder traversal!
//
//  PATTERN: Inorder DFS with early termination
//
//  APPROACH 1 (Simple): Collect all inorder values, return index k-1.
//  APPROACH 2 (Optimal): Stop as soon as we've visited k nodes.
//
//  We'll implement Approach 2 (optimal) — stops early, doesn't need extra array.
//
//  TIME: O(h + k) — go to leftmost node (h steps), then k steps
//  SPACE: O(h) — call stack
// ─────────────────────────────────────────────────────────────────────────
function kthSmallest(root, k) {
    let count = 0;   // how many nodes we've visited so far
    let result = 0;  // the answer

    function inorder(node) {
        if (node === null) return;

        // Go LEFT first (smaller values)
        inorder(node.left);

        // Visit current node
        count++;
        if (count === k) {
            result = node.val;
            return; // found it! (recursion continues but does nothing)
        }

        // Go RIGHT (larger values)
        inorder(node.right);
    }

    inorder(root);
    return result;
}

// TEST:
//  BST:    3        k=1 → 1
//         / \       k=2 → 2
//        1   4      k=3 → 3
//         \
//          2
console.log("\n=== PROBLEM 15: Kth Smallest in BST ===");
console.log(kthSmallest(convertTree([3, 1, 4, null, 2]), 1)); // Expected: 1
console.log(kthSmallest(convertTree([5, 3, 6, 2, 4, null, null, 1]), 3)); // Expected: 3


// ─────────────────────────────────────────────────────────────────────────
//  BONUS PROBLEM 16: Lowest Common Ancestor of a BST
//  LeetCode #235
//
//  MENTAL MODEL: In a BST, we can use the BST property to navigate
//  directly to the LCA — no need to search the whole tree!
//
//  PATTERN: BST property navigation
//
//  KEY INSIGHT:
//  • If both p and q are LESS than root → LCA is in LEFT subtree
//  • If both p and q are GREATER than root → LCA is in RIGHT subtree
//  • Otherwise (one on each side, or one equals root) → root IS the LCA
//
//  This is much faster than the general BT LCA because we can skip subtrees!
//
//  TIME: O(h) — O(log n) balanced, O(n) skewed
//  SPACE: O(1) iterative, O(h) recursive
// ─────────────────────────────────────────────────────────────────────────
function lcaBST(root, p, q) {
    // Iterative approach (O(1) space — no call stack!)
    let current = root;

    while (current !== null) {
        if (p.val < current.val && q.val < current.val) {
            // Both are smaller → go LEFT
            current = current.left;
        } else if (p.val > current.val && q.val > current.val) {
            // Both are larger → go RIGHT
            current = current.right;
        } else {
            // Split point! One on each side (or one equals current)
            // This node IS the LCA
            return current;
        }
    }

    return null;
}

// TEST:
//  BST:      6
//           / \
//          2   8
//         / \ / \
//        0  4 7  9
//          / \
//         3   5
// LCA(2, 8) = 6,  LCA(2, 4) = 2
console.log("\n=== BONUS PROBLEM 16: LCA of BST ===");
const t16 = convertTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
const p16a = t16.left;          // node 2
const q16a = t16.right;         // node 8
const p16b = t16.left;          // node 2
const q16b = t16.left.right;    // node 4
console.log(lcaBST(t16, p16a, q16a).val); // Expected: 6
console.log(lcaBST(t16, p16b, q16b).val); // Expected: 2


// ═══════════════════════════════════════════════════════════════════════════
//  🎯 MASTER PATTERN SUMMARY
// ═══════════════════════════════════════════════════════════════════════════
//
//  ┌──────────────────────────────────────────────────────────────────────┐
//  │  PROBLEM TYPE                    │ PATTERN TO USE                   │
//  ├──────────────────────────────────┼──────────────────────────────────┤
//  │  Depth / Height                  │ DFS Post-order recursion         │
//  │  Path problems (root to leaf)    │ DFS, subtract from target        │
//  │  Compare two trees               │ DFS, check both simultaneously   │
//  │  Mirror / Invert                 │ DFS, swap children               │
//  │  Level-based output              │ BFS with queue + levelSize trick │
//  │  Rightmost / Leftmost per level  │ BFS, take last/first of level    │
//  │  Diameter / Max Path Sum         │ DFS + global variable            │
//  │  LCA (Binary Tree)               │ DFS Post-order, return node      │
//  │  LCA (BST)                       │ BST property, iterative          │
//  │  Validate BST                    │ DFS with min/max bounds          │
//  │  Kth element in BST              │ Inorder = sorted, count to k     │
//  │  Serialize / Deserialize         │ BFS with null markers            │
//  │  Construct from traversals       │ Preorder root + Inorder split    │
//  └──────────────────────────────────┴──────────────────────────────────┘
//
//  ┌──────────────────────────────────────────────────────────────────────┐
//  │  WHEN YOU SEE...                 │ THINK...                         │
//  ├──────────────────────────────────┼──────────────────────────────────┤
//  │  "depth", "height", "balanced"   │ DFS, return height               │
//  │  "level", "floor", "row"         │ BFS with queue                   │
//  │  "path", "sum", "root to leaf"   │ DFS, carry running value         │
//  │  "BST" + "find" / "kth"          │ Inorder traversal                │
//  │  "BST" + "validate"              │ Min/max bounds                   │
//  │  "ancestor", "common"            │ Post-order DFS                   │
//  │  "maximum" across whole tree     │ DFS + global variable            │
//  │  "serialize", "encode"           │ BFS with null markers            │
//  └──────────────────────────────────┴──────────────────────────────────┘
//
//  ┌──────────────────────────────────────────────────────────────────────┐
//  │  RECURSION TEMPLATE (use this every time!)                          │
//  │                                                                      │
//  │  function solve(node) {                                              │
//  │      // 1. BASE CASE: what happens at null?                         │
//  │      if (node === null) return <base_value>;                        │
//  │                                                                      │
//  │      // 2. RECURSE: get answers from children                       │
//  │      const left  = solve(node.left);                                │
//  │      const right = solve(node.right);                               │
//  │                                                                      │
//  │      // 3. COMBINE: use children's answers to answer for this node  │
//  │      return <combine(node.val, left, right)>;                       │
//  │  }                                                                   │
//  └──────────────────────────────────────────────────────────────────────┘
//
//  ┌──────────────────────────────────────────────────────────────────────┐
//  │  BFS TEMPLATE (use this every time!)                                │
//  │                                                                      │
//  │  function bfsSolve(root) {                                          │
//  │      if (!root) return [];                                          │
//  │      const queue = [root];                                          │
//  │      while (queue.length > 0) {                                     │
//  │          const levelSize = queue.length;  // ← KEY: snapshot size  │
//  │          for (let i = 0; i < levelSize; i++) {                     │
//  │              const node = queue.shift();                            │
//  │              // process node                                        │
//  │              if (node.left)  queue.push(node.left);                │
//  │              if (node.right) queue.push(node.right);               │
//  │          }                                                          │
//  │      }                                                              │
//  │  }                                                                   │
//  └──────────────────────────────────────────────────────────────────────┘
