const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._addNode(this.rootNode, data);
  }

  _addNode(node, data) {
    if (!node) {
      return new Node(data);
    }
    if (data < node.data) {
      node.left = this._addNode(node.left, data);
    } else {
      node.right = this._addNode(node.right, data);
    }
    return node;
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(node, data) {
    if (!node) {
      return null;
    }
    if (data === node.data) {
      return node;
    }
    if (data < node.data) {
      return this._findNode(node.left, data);
    } else {
      return this._findNode(node.right, data);
    }
  }

  has(data) {
    return this._findNode(this.rootNode, data) !== null;
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data === node.data) {
      // Node to be removed found
      if (!node.left && !node.right) {
        // Case 1: No children
        return null;
      }
      if (!node.left) {
        // Case 2: One child (right)
        return node.right;
      }
      if (!node.right) {
        // Case 2: One child (left)
        return node.left;
      }
      // Case 3: Two children
      const minRight = this._findMinNode(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
    } else if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else {
      node.right = this._removeNode(node.right, data);
    }
    return node;
  }

  min() {
    return this._findMinNode(this.rootNode)?.data || null;
  }

  max() {
    return this._findMaxNode(this.rootNode)?.data || null;
  }
  _findMinNode(node) {
    if (!node) {
      return null;
    }
    if (node.left) {
      return this._findMinNode(node.left);
    }
    return node;
  }

  _findMaxNode(node) {
    if (!node) {
      return null;
    }
    if (node.right) {
      return this._findMaxNode(node.right);
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};