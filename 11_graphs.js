// ============================================================
// 📚 TOPIC 11: GRAPHS
// ============================================================
//
// 🔑 CONCEPT:
// A Graph is a collection of nodes (vertices) connected by edges.
//
// TYPES:
//   Directed   → edges have direction (A → B)
//   Undirected → edges are bidirectional (A — B)
//   Weighted   → edges have weights/costs
//   Unweighted → all edges equal
//   Cyclic     → contains cycles
//   Acyclic    → no cycles (DAG = Directed Acyclic Graph)
//
// REPRESENTATIONS:
//   1. Adjacency List  → Map/Array of arrays (most common)
//      { 0: [1,2], 1: [0,3], 2: [0], 3: [1] }
//      Space: O(V + E)
//
//   2. Adjacency Matrix → 2D array
//      matrix[i][j] = 1 if edge exists
//      Space: O(V²)
//
// TRAVERSALS:
//   BFS (Breadth First Search):
//     - Use Queue
//     - Explores level by level
//     - Finds SHORTEST PATH in unweighted graphs
//     - Time: O(V + E)
//
//   DFS (Depth First Search):
//     - Use Stack (or recursion)
//     - Explores as deep as possible before backtracking
//     - Finds connected components, cycles, topological sort
//     - Time: O(V + E)
//
// KEY ALGORITHMS:
//   - BFS: Shortest path (unweighted)
//   - DFS: Cycle detection, topological sort, connected components
//   - Union-Find: Connected components, cycle detection
//   - Dijkstra: Shortest path (weighted, non-negative)
//   - Topological Sort: Ordering of DAG
//
// ============================================================

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 1: Number of Islands
// Count the number of islands (connected 1s) in a 2D grid.
// Input: [["1","1","0"],["0","1","0"],["0","0","1"]] → Output: 2
// ─────────────────────────────────────────────────────────────
function numIslands(grid) {
  // APPROACH: DFS - when we find a '1', flood fill it to '0'
  // Each flood fill = one island
  // Time: O(m*n) | Space: O(m*n) for recursion stack
  if (!grid || !grid.length) return 0;
  const m = grid.length, n = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark as visited
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c); // sink the island
      }
    }
  }
  return count;
}
console.log("1. Number of Islands:", numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // 3

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 2: Clone Graph
// Deep copy a graph where each node has a value and neighbors list.
// ─────────────────────────────────────────────────────────────
class GraphNode {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  // APPROACH: DFS with HashMap (original → clone)
  // Time: O(V + E) | Space: O(V)
  if (!node) return null;
  const map = new Map(); // original → clone

  function dfs(node) {
    if (map.has(node)) return map.get(node); // already cloned
    const clone = new GraphNode(node.val);
    map.set(node, clone);
    for (let neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor)); // clone neighbors
    }
    return clone;
  }
  return dfs(node);
}
// Create graph: 1-2-3-4-1 (cycle)
const g1 = new GraphNode(1);
const g2 = new GraphNode(2);
const g3 = new GraphNode(3);
const g4 = new GraphNode(4);
g1.neighbors = [g2, g4]; g2.neighbors = [g1, g3];
g3.neighbors = [g2, g4]; g4.neighbors = [g1, g3];
const cloned = cloneGraph(g1);
console.log("2. Clone Graph: node val =", cloned.val, "neighbors:", cloned.neighbors.map(n => n.val));

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 3: Course Schedule (Cycle Detection in Directed Graph)
// Can you finish all courses given prerequisites?
// Input: numCourses = 2, prerequisites = [[1,0]] → Output: true
// Input: numCourses = 2, prerequisites = [[1,0],[0,1]] → Output: false (cycle)
// ─────────────────────────────────────────────────────────────
function canFinish(numCourses, prerequisites) {
  // APPROACH: DFS cycle detection
  // State: 0 = unvisited, 1 = visiting (in current path), 2 = visited
  // If we reach a node with state 1 → cycle!
  // Time: O(V + E) | Space: O(V + E)
  const graph = Array.from({length: numCourses}, () => []);
  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  const state = new Array(numCourses).fill(0); // 0=unvisited, 1=visiting, 2=done

  function hasCycle(node) {
    if (state[node] === 1) return true;  // cycle!
    if (state[node] === 2) return false; // already processed

    state[node] = 1; // mark as visiting
    for (let neighbor of graph[node]) {
      if (hasCycle(neighbor)) return true;
    }
    state[node] = 2; // mark as done
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}
console.log("3. Can Finish:", canFinish(2, [[1,0]])); // true
console.log("3. Can Finish:", canFinish(2, [[1,0],[0,1]])); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 4: Course Schedule II (Topological Sort)
// Return the order to finish all courses.
// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,1,2,3] or [0,2,1,3]
// ─────────────────────────────────────────────────────────────
function findOrder(numCourses, prerequisites) {
  // APPROACH: Kahn's Algorithm (BFS Topological Sort)
  // Use in-degree array: count prerequisites for each course
  // Start with courses that have no prerequisites (in-degree = 0)
  // Time: O(V + E) | Space: O(V + E)
  const graph = Array.from({length: numCourses}, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i); // no prerequisites
  }

  const order = [];
  while (queue.length) {
    const course = queue.shift();
    order.push(course);
    for (let next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return order.length === numCourses ? order : []; // empty if cycle
}
console.log("4. Course Order:", findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3]

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 5: Number of Connected Components in Undirected Graph
// Count connected components using Union-Find.
// Input: n = 5, edges = [[0,1],[1,2],[3,4]] → Output: 2
// ─────────────────────────────────────────────────────────────
function countComponents(n, edges) {
  // APPROACH: Union-Find (Disjoint Set Union)
  // Each node starts as its own component
  // Union connected nodes, count remaining components
  // Time: O(E * α(n)) ≈ O(E) | Space: O(n)
  const parent = Array.from({length: n}, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
    return parent[x];
  }

  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false; // already connected
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }

  let components = n;
  for (let [u, v] of edges) {
    if (union(u, v)) components--; // merged two components
  }
  return components;
}
console.log("5. Connected Components:", countComponents(5, [[0,1],[1,2],[3,4]])); // 2

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 6: Rotting Oranges (Multi-source BFS)
// Find minimum minutes until all oranges rot (or -1 if impossible).
// 0 = empty, 1 = fresh, 2 = rotten
// Input: [[2,1,1],[1,1,0],[0,1,1]] → Output: 4
// ─────────────────────────────────────────────────────────────
function orangesRotting(grid) {
  // APPROACH: Multi-source BFS starting from all rotten oranges
  // Time: O(m*n) | Space: O(m*n)
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;

  // Find all rotten oranges and count fresh ones
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c, 0]); // [row, col, time]
      if (grid[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let maxTime = 0;

  while (queue.length) {
    const [r, c, time] = queue.shift();
    for (let [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
        grid[nr][nc] = 2; // rot it
        fresh--;
        maxTime = Math.max(maxTime, time + 1);
        queue.push([nr, nc, time + 1]);
      }
    }
  }
  return fresh === 0 ? maxTime : -1;
}
console.log("6. Rotting Oranges:", orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 7: Pacific Atlantic Water Flow
// Find cells where water can flow to both Pacific and Atlantic oceans.
// ─────────────────────────────────────────────────────────────
function pacificAtlantic(heights) {
  // APPROACH: Reverse BFS from ocean borders
  // Pacific: top row + left col
  // Atlantic: bottom row + right col
  // Find cells reachable from both
  // Time: O(m*n) | Space: O(m*n)
  const m = heights.length, n = heights[0].length;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  function bfs(starts) {
    const visited = Array.from({length: m}, () => new Array(n).fill(false));
    const queue = [...starts];
    for (let [r, c] of starts) visited[r][c] = true;

    while (queue.length) {
      const [r, c] = queue.shift();
      for (let [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n &&
            !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    return visited;
  }

  const pacificStarts = [], atlanticStarts = [];
  for (let r = 0; r < m; r++) {
    pacificStarts.push([r, 0]);
    atlanticStarts.push([r, n - 1]);
  }
  for (let c = 0; c < n; c++) {
    pacificStarts.push([0, c]);
    atlanticStarts.push([m - 1, c]);
  }

  const pacific = bfs(pacificStarts);
  const atlantic = bfs(atlanticStarts);

  const result = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
    }
  }
  return result;
}
const heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
console.log("7. Pacific Atlantic:", pacificAtlantic(heights).length, "cells");

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 8: Shortest Path in Binary Matrix
// Find shortest path from top-left to bottom-right (0s only).
// Input: [[0,1],[1,0]] → Output: 2
// ─────────────────────────────────────────────────────────────
function shortestPathBinaryMatrix(grid) {
  // APPROACH: BFS (guarantees shortest path in unweighted graph)
  // 8-directional movement
  // Time: O(n²) | Space: O(n²)
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
  if (n === 1) return 1;

  const queue = [[0, 0, 1]]; // [row, col, distance]
  grid[0][0] = 1; // mark visited
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

  while (queue.length) {
    const [r, c, dist] = queue.shift();
    for (let [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        if (nr === n-1 && nc === n-1) return dist + 1;
        grid[nr][nc] = 1; // mark visited
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}
console.log("8. Shortest Path:", shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // 4

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 9: Graph Valid Tree
// Check if n nodes and edges form a valid tree.
// Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]] → Output: true
// ─────────────────────────────────────────────────────────────
function validTree(n, edges) {
  // APPROACH: Valid tree = connected + no cycles
  // Use Union-Find: if union fails (already connected) → cycle
  // Also check: edges.length must equal n-1
  // Time: O(E * α(n)) | Space: O(n)
  if (edges.length !== n - 1) return false; // tree has exactly n-1 edges

  const parent = Array.from({length: n}, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (let [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return false; // cycle detected
    parent[pu] = pv;
  }
  return true;
}
console.log("9. Valid Tree:", validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log("9. Valid Tree:", validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false

// ─────────────────────────────────────────────────────────────
// ✅ PROBLEM 10: Word Ladder (BFS Shortest Transformation)
// Find shortest transformation sequence from beginWord to endWord.
// Input: beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]
// Output: 5 (hit→hot→dot→dog→cog)
// ─────────────────────────────────────────────────────────────
function ladderLength(beginWord, endWord, wordList) {
  // APPROACH: BFS - each word is a node, edge if differ by 1 char
  // BFS guarantees shortest path
  // Time: O(M² * N) where M = word length, N = wordList size
  // Space: O(M² * N)
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]]; // [word, steps]
  const visited = new Set([beginWord]);

  while (queue.length) {
    const [word, steps] = queue.shift();

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) { // try all 26 letters
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (newWord === endWord) return steps + 1;
        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, steps + 1]);
        }
      }
    }
  }
  return 0;
}
console.log("10. Word Ladder:", ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // 5

// ============================================================
// 📊 SUMMARY TABLE
// ============================================================
// Problem                        | Algorithm      | Time      | Space
// -------------------------------|----------------|-----------|------
// 1. Number of Islands           | DFS            | O(m*n)    | O(m*n)
// 2. Clone Graph                 | DFS + HashMap  | O(V+E)    | O(V)
// 3. Course Schedule             | DFS Cycle Det  | O(V+E)    | O(V+E)
// 4. Course Schedule II          | Kahn's BFS     | O(V+E)    | O(V+E)
// 5. Connected Components        | Union-Find     | O(E*α(n)) | O(n)
// 6. Rotting Oranges             | Multi-BFS      | O(m*n)    | O(m*n)
// 7. Pacific Atlantic            | Reverse BFS    | O(m*n)    | O(m*n)
// 8. Shortest Path Binary Matrix | BFS            | O(n²)     | O(n²)
// 9. Graph Valid Tree            | Union-Find     | O(E*α(n)) | O(n)
// 10. Word Ladder                | BFS            | O(M²*N)   | O(M²*N)
// ============================================================
