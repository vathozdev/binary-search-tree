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

  includes(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return false;
    }

    let current = this.root;

    while (current !== null) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return true;
      }
    }

    return false;
  }
}

export { Tree, Node };
