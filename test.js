import assert from "node:assert/strict";
import { Tree } from "./index.js";
import { prettyPrint } from "./prettyPrint.js";

const tree = new Tree();

const testArray = [10, 5, 15, 3, 7, 12, 18, 7, 5];

tree.buildTree(testArray);

console.log("Test 1: Balanced BST");
prettyPrint(tree.root);

assert.equal(tree.root.data, 10);
assert.equal(tree.root.left.data, 5);
assert.equal(tree.root.right.data, 15);

assert.equal(tree.root.left.left.data, 3);
assert.equal(tree.root.left.right.data, 7);

assert.equal(tree.root.right.left.data, 12);
assert.equal(tree.root.right.right.data, 18);

console.log("Test 1 passed!");

const emptyTree = new Tree();
emptyTree.buildTree([]);

assert.equal(emptyTree.root, null);

console.log("Test 2 passed: Empty array");

const singleTree = new Tree();
singleTree.buildTree([42]);

assert.equal(singleTree.root.data, 42);
assert.equal(singleTree.root.left, null);
assert.equal(singleTree.root.right, null);

console.log("Test 3 passed: Single element");

const sortedTree = new Tree();
sortedTree.buildTree([1, 2, 3, 4, 5, 6, 7]);

assert.equal(sortedTree.root.data, 4);

console.log("Test 4 passed: Sorted array");

console.log("\nTesting includes()");

const includesTree = new Tree();
includesTree.buildTree([10, 5, 15, 3, 7, 12, 18]);

// Existing values
assert.equal(includesTree.includes(10), true);
assert.equal(includesTree.includes(3), true);
assert.equal(includesTree.includes(18), true);
assert.equal(includesTree.includes(7), true);

// Non-existing values
assert.equal(includesTree.includes(99), false);
assert.equal(includesTree.includes(6), false);

// Empty tree
const emptyIncludesTree = new Tree();
assert.equal(emptyIncludesTree.includes(10), false);

// Invalid inputs
assert.equal(includesTree.includes("10"), false);
assert.equal(includesTree.includes(NaN), false);
assert.equal(includesTree.includes(undefined), false);

console.log("All includes() tests passed!");

console.log("\nTesting insert()");

// Insert into an empty tree
const insertTree = new Tree();
insertTree.insert(10);

assert.equal(insertTree.root.data, 10);
assert.equal(insertTree.root.left, null);
assert.equal(insertTree.root.right, null);

// Insert to the left and right
insertTree.insert(5);
insertTree.insert(15);

assert.equal(insertTree.root.left.data, 5);
assert.equal(insertTree.root.right.data, 15);

// Insert deeper into the tree
insertTree.insert(3);
insertTree.insert(7);
insertTree.insert(12);
insertTree.insert(18);

assert.equal(insertTree.root.left.left.data, 3);
assert.equal(insertTree.root.left.right.data, 7);
assert.equal(insertTree.root.right.left.data, 12);
assert.equal(insertTree.root.right.right.data, 18);

// Duplicate values should not create new nodes
insertTree.insert(10);
insertTree.insert(7);

assert.equal(insertTree.root.data, 10);
assert.equal(insertTree.root.left.right.data, 7);

// Invalid inputs
insertTree.insert("20");
insertTree.insert(NaN);
insertTree.insert(undefined);

assert.equal(insertTree.includes(20), false);
assert.equal(insertTree.includes(10), true);

// Visual inspection
prettyPrint(insertTree.root);

console.log("All insert() tests passed!");

console.log("\nAll tests passed!");
