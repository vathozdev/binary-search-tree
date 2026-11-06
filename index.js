class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);

    this.root = this.#buildBalancedTree(
      sortedUniqueArray,
      0,
      sortedUniqueArray.length - 1,
    );
  }

  #buildBalancedTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor(start + (end - start) / 2);
    const root = new Node(array[mid]);

    root.left = this.#buildBalancedTree(array, start, mid - 1);
    root.right = this.#buildBalancedTree(array, mid + 1, end);

    return root;
  }
}

export { Tree, Node };