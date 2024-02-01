class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    this.root = Math.floor((start + end) / 2);
    stringList += `(${array[this.root]}) -> `;
    const newNode = new Node(array[this.root]);
    newNode.left = this.buildTree(array, start, this.root - 1);
    newNode.right = this.buildTree(array, (this.root += 1), end);

    // console.log(stringList);

    return newNode;
  }

  insert(value, current = this.root) {
    if (value < current.data) {
      if (current.left == null) {
        current.left = new Node(value);
        return current;
      }
      current = current.left;
      this.insert(value, current);
    }
    if (value > current.data) {
      if (current.right == null) {
        current.right = new Node(value);
        return current;
      }
      current = current.right;
      this.insert(value, current);
    }
  }

  delete(value, current = this.root) {
    if (current === null) {
      return current;
    }
    if (value < current.data) {
      current.left = this.delete(value, current.left);
    } else if (value > current.data) {
      current.right = this.delete(value, current.right);
    } else {
      if (!current.left && !current.right) {
        return null;
      }
      if (current.left === null) {
        return current.right;
      }
      if (current.right === null) {
        return current.left;
      }

      let succesor = findMinVal(current.right);
      current.data = succesor.data;
    }
    return current;
  }

  find(value, current = this.root) {
    if (value < current.data) {
      this.find(value, current.left);
    } else if (value > current.data) {
      this.find(value, current.right);
    } else {
      console.log(current);
    }
  }

  levelOrder() {
    if (this.root === null) {
      return;
    }
    let result = [];
    let queue = [this.root];
    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current.data);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return result;
  }

  inOrder(current = this.root, result = []) {
    if (current === null) {
      return current;
    }
    if (current.left) {
      this.inOrder(current.left, result);
    }
    result.push(current.data);
    if (current.right) {
      this.inOrder(current.right, result);
    }
    return result;
  }

  preOrder(current = this.root, result = []) {
    if (current === null) {
      return;
    }
    result.push(current.data);
    if (current.left) {
      this.preOrder(current.left, result);
    }
    if (current.right) {
      this.preOrder(current.right, result);
    }
    return result;
  }

  postOrder(current = this.root, result = []) {
    if (current === null) {
      return current;
    }
    if (current.left) {
      this.postOrder(current.left, result);
    }
    if (current.right) {
      this.postOrder(current.right, result);
    }
    result.push(current.data);
    return result;
  }

  depth(value, current = this.root, count = 0) {
    if (value < current.data) {
      count++;
      this.depth(value, current.left, count);
    } else if (value > current.data) {
      count++;
      this.depth(value, current.right, count);
    } else {
      console.log(count);
    }
  }

  height(current = this.root) {
    if (current === null) {
      return 0;
    }

    const leftHeight = this.height(current.left);
    const rightHeight = this.height(current.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(current = this.root) {
    const lHeight = this.height(current.left);
    const rHeight = this.height(current.right);
    const diff = Math.abs(lHeight - rHeight);
    return diff < 2 ? "true" : "false";
  }

  rebalance() {
    let array = this.inOrder();
    this.root = this.buildTree(array);
  }
}

let findMinVal = function (current) {
  let found = null;
  while (current.left != null) {
    found = current.left;
    current.left = null;
  }
  return found;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let stringList = "";
let array = [10, 20, 30, 75, 77, 79];
// let array = [10, 20, 30, 40, 50, 60, 70]; // 40 20 10 30 60 50 70  Expected Result
// let array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const newTree = new Tree(array);
// prettyPrint(newTree.root);
// console.log("-------------------------------------------------");
newTree.insert(80);
// prettyPrint(newTree.root);
// console.log("-------------------------------------------------");
// newTree.delete(30);
// prettyPrint(newTree.root);
// console.log("-------------------------------------------------");
// newTree.delete(79);
// prettyPrint(newTree.root);
// console.log("-------------------------------------------------");
// newTree.delete(80);
// prettyPrint(newTree.root);
// newTree.find(10);
// console.log(newTree.levelOrder());
// console.log(newTree.preOrder());
// console.log(newTree.inOrder());
// console.log(newTree.postOrder());
// newTree.depth(10);
// console.log(newTree.height());
// console.log(newTree.isBalanced());
newTree.insert(81);
prettyPrint(newTree.root);
console.log("-------------------------------------------------");
newTree.rebalance();
prettyPrint(newTree.root);
