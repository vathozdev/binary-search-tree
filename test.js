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

console.log("\nTesting deleteItem()");

const deleteTree = new Tree();
deleteTree.buildTree([10, 5, 15, 3, 7, 12, 18]);

// Delete a leaf node
deleteTree.deleteItem(3);
assert.equal(deleteTree.includes(3), false);
assert.equal(deleteTree.includes(5), true);

// Delete a node with one child
deleteTree.deleteItem(5);
assert.equal(deleteTree.includes(5), false);
assert.equal(deleteTree.includes(7), true);

// Delete a node with two children (root)
deleteTree.deleteItem(10);
assert.equal(deleteTree.includes(10), false);
assert.equal(deleteTree.includes(7), true);
assert.equal(deleteTree.includes(15), true);
assert.equal(deleteTree.includes(12), true);
assert.equal(deleteTree.includes(18), true);

// Delete a value that doesn't exist
deleteTree.deleteItem(99);
assert.equal(deleteTree.includes(99), false);

// Delete root when it has one child
const singleChildTree = new Tree();
singleChildTree.buildTree([10, 5]);

singleChildTree.deleteItem(10);

assert.equal(singleChildTree.root.data, 5);
assert.equal(singleChildTree.includes(10), false);

console.log("All deleteItem() tests passed!");

console.log("\nTesting tree traversals");

const traversalTree = new Tree();
traversalTree.buildTree([10, 5, 15, 3, 7, 12, 18]);

// Level Order
const levelOrder = [];
traversalTree.levelOrderForEach((value) => levelOrder.push(value));

assert.deepEqual(levelOrder, [10, 5, 15, 3, 7, 12, 18]);

// In Order
const inOrder = [];
traversalTree.inOrderForEach((value) => inOrder.push(value));

assert.deepEqual(inOrder, [3, 5, 7, 10, 12, 15, 18]);

// Pre Order
const preOrder = [];
traversalTree.preOrderForEach((value) => preOrder.push(value));

assert.deepEqual(preOrder, [10, 5, 3, 7, 15, 12, 18]);

// Post Order
const postOrder = [];
traversalTree.postOrderForEach((value) => postOrder.push(value));

assert.deepEqual(postOrder, [3, 7, 5, 12, 18, 15, 10]);

console.log("All traversal tests passed!");

console.log("\nTesting height()");

const heightTree = new Tree();
heightTree.buildTree([10, 5, 15, 3, 7, 12, 18]);

// Root
assert.equal(heightTree.height(10), 2);

// Internal nodes
assert.equal(heightTree.height(5), 1);
assert.equal(heightTree.height(15), 1);

// Leaf nodes
assert.equal(heightTree.height(3), 0);
assert.equal(heightTree.height(7), 0);
assert.equal(heightTree.height(12), 0);
assert.equal(heightTree.height(18), 0);

// Non-existing value
assert.equal(heightTree.height(99), undefined);

// Invalid inputs
assert.equal(heightTree.height("10"), undefined);
assert.equal(heightTree.height(NaN), undefined);
assert.equal(heightTree.height(undefined), undefined);

// Empty tree
const emptyHeightTree = new Tree();
assert.equal(emptyHeightTree.height(10), undefined);

console.log("All height() tests passed!");

console.log("\nAll tests passed!");
