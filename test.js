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

console.log("\nAll tests passed!");
