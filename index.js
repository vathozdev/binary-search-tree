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

  #buildBalancedTree(array, start, end) {}
}
