// ============================================================
// 📚 TOPIC 9: TREES & BINARY TREES
// ============================================================
//
// 🔑 CONCEPT:
// A Tree is a hierarchical data structure with nodes connected
// by edges. A Binary Tree has at most 2 children per node.
//
// TERMINOLOGY:
//   Root     → topmost node (no parent)
//   Leaf     → node with no children
//   Height   → longest path from root to leaf
//   Depth    → distance from root to a node
//   Parent   → node directly above
//   Children → nodes directly below
//
// BINARY TREE TYPES:
//   Full BT      → every node has 0 or 2 children
//   Complete BT  → all levels filled except possibly last (left-filled)
//   Perfect BT   → all internal nodes have 2 children, all leaves same level
//   BST          → left < root < right (Binary Search Tree)
//   Balanced BST → height = O(log n) (AVL, Red-Black)
//
// TRAVERSALS:
//   DFS (Depth First):
//     Inorder   (Left → Root → Right) → sorted order for BST
//     Preorder  (Root → Left → Right) → copy tree, serialize
//     Postorder (Left → Right → Root) → delete tree, evaluate expression
//
//   BFS (Breadth First):
//     Level Order → process level by level using Queue
//
// KEY OPERATIONS (BST):
//   Search:  O(log n) avg, O(n) worst
//   Insert:  O(log n) avg, O(n) worst
//   Delete:  O(log n) avg, O(n) worst
//
// ============================================================

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: Build tree from array (level-order)
function buildTree(arr) {
  if (!arr || !arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Maximum Depth of Binary Tree
// Input: [3,9,20,null,null,15,7] → Output: 3
//       3
//      / \
//     9  20
//        / \
//       15   7
// ─────────────────────────────────────────────────────────────
function maxDepth(root) {
  // APPROACH: DFS - depth = 1 + max(left depth, right depth)
  // Base case: null node has depth 0
  // Time: O(n) | Space: O(h) where h = height
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
const tree1 = buildTree([3,9,20,null,null,15,7]);
console.log("1. Max Depth:", maxDepth(tree1)); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Invert Binary Tree
// Flip the tree (mirror image).
// Input: [4,2,7,1,3,6,9] → Output: [4,7,2,9,6,3,1]
// ─────────────────────────────────────────────────────────────
function invertTree(root) {
  // APPROACH: DFS - swap left and right children recursively
  // Time: O(n) | Space: O(h)
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}
const tree2 = buildTree([4,2,7,1,3,6,9]);
const inverted = invertTree(tree2);
// Verify by level order
function levelOrderFlat(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}
console.log("2. Invert Tree:", levelOrderFlat(inverted)); // [4,7,2,9,6,3,1]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Symmetric Tree
// Check if a binary tree is a mirror of itself.
// Input: [1,2,2,3,4,4,3] → Output: true
// ─────────────────────────────────────────────────────────────
function isSymmetric(root) {
  // APPROACH: Recursively check if left and right subtrees are mirrors
  // Time: O(n) | Space: O(h)
  function isMirror(left, right) {
    if (!left && !right) return true;  // both null
    if (!left || !right) return false; // one null
    return left.val === right.val &&
           isMirror(left.left, right.right) &&  // outer pair
           isMirror(left.right, right.left);    // inner pair
  }
  return isMirror(root.left, root.right);
}
console.log("3. Symmetric:", isSymmetric(buildTree([1,2,2,3,4,4,3]))); // true
console.log("3. Symmetric:", isSymmetric(buildTree([1,2,2,null,3,null,3]))); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Binary Tree Level Order Traversal
// Return values level by level.
// Input: [3,9,20,null,null,15,7] → Output: [[3],[9,20],[15,7]]
// ─────────────────────────────────────────────────────────────
function levelOrder(root) {
  // APPROACH: BFS with Queue, process level by level
  // Time: O(n) | Space: O(n)
  if (!root) return [];
  const result = [], queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
console.log("4. Level Order:", levelOrder(buildTree([3,9,20,null,null,15,7])));
// [[3],[9,20],[15,7]]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Validate Binary Search Tree
// Check if a binary tree is a valid BST.
// Input: [2,1,3] → Output: true
// Input: [5,1,4,null,null,3,6] → Output: false
// ─────────────────────────────────────────────────────────────
function isValidBST(root) {
  // APPROACH: DFS with min/max bounds
  // Each node must be within (min, max) range
  // Time: O(n) | Space: O(h)
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) &&   // left must be < node.val
           validate(node.right, node.val, max);    // right must be > node.val
  }
  return validate(root, -Infinity, Infinity);
}
console.log("5. Valid BST:", isValidBST(buildTree([2,1,3]))); // true
console.log("5. Valid BST:", isValidBST(buildTree([5,1,4,null,null,3,6]))); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Lowest Common Ancestor of BST
// Find the LCA of two nodes in a BST.
// Input: root = [6,2,8,0,4,7,9], p = 2, q = 8 → Output: 6
// ─────────────────────────────────────────────────────────────
function lowestCommonAncestorBST(root, p, q) {
  // APPROACH: Use BST property
  // If both p and q are less than root → LCA is in left subtree
  // If both p and q are greater than root → LCA is in right subtree
  // Otherwise → root is the LCA
  // Time: O(h) | Space: O(1)
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;  // both in left subtree
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right; // both in right subtree
    } else {
      return root; // split point = LCA
    }
  }
  return null;
}
const bst = buildTree([6,2,8,0,4,7,9,null,null,3,5]);
const p = new TreeNode(2), q = new TreeNode(8);
// Note: In real usage, p and q would be actual nodes from the tree
console.log("6. LCA BST: (concept demonstrated - returns root node)");

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Binary Tree Right Side View
// Return values visible from the right side.
// Input: [1,2,3,null,5,null,4] → Output: [1,3,4]
// ─────────────────────────────────────────────────────────────
function rightSideView(root) {
  // APPROACH: BFS - take the last element of each level
  // Time: O(n) | Space: O(n)
  if (!root) return [];
  const result = [], queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (i === levelSize - 1) result.push(node.val); // last node in level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}
console.log("7. Right Side View:", rightSideView(buildTree([1,2,3,null,5,null,4]))); // [1,3,4]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Path Sum
// Check if tree has a root-to-leaf path with given sum.
// Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true (5→4→11→2)
// ─────────────────────────────────────────────────────────────
function hasPathSum(root, targetSum) {
  // APPROACH: DFS - subtract node value from target, check at leaf
  // Time: O(n) | Space: O(h)
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum; // leaf node
  return hasPathSum(root.left, targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val);
}
const pathTree = buildTree([5,4,8,11,null,13,4,7,2,null,null,null,1]);
console.log("8. Has Path Sum:", hasPathSum(pathTree, 22)); // true
console.log("8. Has Path Sum:", hasPathSum(pathTree, 5)); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Diameter of Binary Tree
// Find the length of the longest path between any two nodes.
// Input: [1,2,3,4,5] → Output: 3 (path: 4→2→1→3 or 5→2→1→3)
// ─────────────────────────────────────────────────────────────
function diameterOfBinaryTree(root) {
  // APPROACH: DFS - at each node, diameter = left height + right height
  // Track global maximum
  // Time: O(n) | Space: O(h)
  let maxDiameter = 0;

  function height(node) {
    if (!node) return 0;
    const leftH = height(node.left);
    const rightH = height(node.right);
    maxDiameter = Math.max(maxDiameter, leftH + rightH); // update diameter
    return 1 + Math.max(leftH, rightH); // return height
  }

  height(root);
  return maxDiameter;
}
console.log("9. Diameter:", diameterOfBinaryTree(buildTree([1,2,3,4,5]))); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Construct Binary Tree from Preorder and Inorder
// Build tree from preorder = [3,9,20,15,7] and inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
// ─────────────────────────────────────────────────────────────
function buildTreeFromTraversals(preorder, inorder) {
  // APPROACH:
  // preorder[0] = root
  // Find root in inorder → splits into left and right subtrees
  // Recursively build left and right
  // Time: O(n) | Space: O(n)
  if (!preorder.length || !inorder.length) return null;

  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const mid = inorder.indexOf(rootVal); // split point

  root.left = buildTreeFromTraversals(
    preorder.slice(1, mid + 1),  // left preorder
    inorder.slice(0, mid)         // left inorder
  );
  root.right = buildTreeFromTraversals(
    preorder.slice(mid + 1),     // right preorder
    inorder.slice(mid + 1)        // right inorder
  );
  return root;
}
const builtTree = buildTreeFromTraversals([3,9,20,15,7], [9,3,15,20,7]);
console.log("10. Build Tree:", levelOrderFlat(builtTree)); // [3,9,20,15,7]

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                        | Traversal | Time  | Space
// -------------------------------|-----------|-------|------
// 1. Max Depth                   | DFS       | O(n)  | O(h)
// 2. Invert Tree                 | DFS       | O(n)  | O(h)
// 3. Symmetric Tree              | DFS       | O(n)  | O(h)
// 4. Level Order Traversal       | BFS       | O(n)  | O(n)
// 5. Validate BST                | DFS       | O(n)  | O(h)
// 6. LCA of BST                  | Iterative | O(h)  | O(1)
// 7. Right Side View             | BFS       | O(n)  | O(n)
// 8. Path Sum                    | DFS       | O(n)  | O(h)
// 9. Diameter                    | DFS       | O(n)  | O(h)
// 10. Build from Traversals      | DFS       | O(n²) | O(n)
// ============================================================
//
// h = height of tree
// For balanced tree: h = O(log n)
// For skewed tree:   h = O(n)
// ============================================================
