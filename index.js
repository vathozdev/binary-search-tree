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

  insert(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return;
    }

    let current = this.root;
    const newNode = new Node(value);

    if (current === null) {
      this.root = newNode;
      return;
    }

    let parent = current;

    while (current !== null) {
      if (current.data > value) {
        parent = current;
        current = current.left;
      } else if (current.data < value) {
        parent = current;
        current = current.right;
      } else if (current.data === value) {
        return;
      }
    }

    if (value > parent.data) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
  }

  /* deleteItem(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return;
    }

    let current = this.root;

    if (current === null) {
      return;
    }

    let parent = current;

    while (current !== null) {
      if (current.data > value) {
        parent = current;
        current = current.left;
      } else if (current.data < value) {
        parent = current;
        current = current.right;
      } else if (current.data === value) {
      }
    }
  }*/

  levelOrderForEach(cb) {
    if (typeof cb !== "function") {
      throw new Error(`A function is required.`);
    }
    if (this.root === null) {
      return;
    }
    const arr = [];
    arr.push(this.root);
    while (arr.length > 0) {
      let current = arr.shift();
      cb(current.data);
      if (current.left !== null) {
        arr.push(current.left);
      }
      if (current.right !== null) {
        arr.push(current.right);
      }
    }
  }

  inOrderForEach(cb) {
    if (typeof cb !== "function") {
      throw new Error("A function is required.");
    }

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      cb(node.data);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrderForEach(cb) {
    if (typeof cb !== "function") {
      throw new Error("A function is required.");
    }

    function traverse(node) {
      if (node === null) {
        return;
      }

      cb(node.data);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(cb) {
    if (typeof cb !== "function") {
      throw new Error("A function is required.");
    }

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      cb(node.data);
    }

    traverse(this.root);
  }

  height(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return;
    }

    function measure(current) {
      if (current === null) {
        return -1;
      }

      return 1 + Math.max(measure(current.left), measure(current.right));
    }

    let current = this.root;

    while (current !== null) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return measure(current);
      }
    }

    return;
  }

  depth(value) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return;
    }

    let depthCounter = 0;
    let current = this.root;

    while (current !== null) {
      if (current.data > value) {
        current = current.left;
        depthCounter++;
      } else if (current.data < value) {
        current = current.right;
        depthCounter++;
      } else {
        return depthCounter;
      }
    }

    return;
  }

  isBalanced() {
    function measure(current) {
      if (current === null) {
        return -1;
      }

      return 1 + Math.max(measure(current.left), measure(current.right));
    }

    function checkBalance(current) {
      if (current === null) {
        return true;
      }

      const leftHeight = measure(current.left);
      const rightHeight = measure(current.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return checkBalance(current.left) && checkBalance(current.right);
    }

    return checkBalance(this.root);
  }
}

export { Tree, Node };
