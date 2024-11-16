// codehelp-frontend/src/components/algorithms/TreeAlgorithms.jsx
import React, { useState } from 'react';

// TreeNode Component: Renders a tree node with arrows for visualization
const TreeNode = ({ value, left, right }) => (
  <div className="text-center relative">
    <div className="text-lg font-bold">{value}</div>
    <div className="flex justify-center gap-6 mt-2 relative">
      {left ? (
        <>
          <div className="absolute top-4 left-[-25%] transform rotate-45 w-6 h-6 border-t-2 border-l-2 border-black"></div>
          <TreeNode {...left} />
        </>
      ) : (
        <div className="text-gray-400">Null</div>
      )}
      {right ? (
        <>
          <div className="absolute top-4 right-[-25%] transform rotate-[-45deg] w-6 h-6 border-t-2 border-r-2 border-black"></div>
          <TreeNode {...right} />
        </>
      ) : (
        <div className="text-gray-400">Null</div>
      )}
    </div>
  </div>
);

const TreeAlgorithms = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [treeType, setTreeType] = useState('binary'); // binary or bst
  const [visualizationSpeed, setVisualizationSpeed] = useState(500);

  const insertNode = (node, value) => {
    if (!node) {
      return { value, left: null, right: null };
    }

    if (treeType === 'bst') {
      if (value < node.value) {
        node.left = insertNode(node.left, value);
      } else {
        node.right = insertNode(node.right, value);
      }
    } else {
      const queue = [node];
      while (queue.length > 0) {
        const current = queue.shift();
        if (!current.left) {
          current.left = { value, left: null, right: null };
          break;
        } else {
          queue.push(current.left);
        }

        if (!current.right) {
          current.right = { value, left: null, right: null };
          break;
        } else {
          queue.push(current.right);
        }
      }
    }
    return node;
  };

  const handleInsert = () => {
    if (!inputValue) return;
    const value = parseInt(inputValue);
    setRoot((prevRoot) => insertNode(prevRoot, value));
    setInputValue('');
  };

  const handleReset = () => {
    setRoot(null); // Clears the tree
  };

  const handleSpeedChange = (event) => {
    setVisualizationSpeed(parseInt(event.target.value));
  };

  return (
    <div>
      <div className="mb-6">
        <label className="mr-2">Tree Type:</label>
        <select
          value={treeType}
          onChange={(e) => setTreeType(e.target.value)}
          className="px-2 py-1 border rounded-lg text-black"
        >
          <option value="binary">Binary Tree</option>
          <option value="bst">Binary Search Tree (BST)</option>
        </select>
      </div>
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node value"
          className="border px-2 py-1 rounded-lg text-black"
        />
        <button onClick={handleInsert} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Insert Node
        </button>
        <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Reset Tree
        </button>
      </div>
      <div className="mb-4">
        <label className="mr-2">Visualization Speed (ms):</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={visualizationSpeed}
          onChange={handleSpeedChange}
          className="w-64 text-black"
        />
        <span className="ml-2">{visualizationSpeed} ms</span>
      </div>
      <div className="flex justify-center">
        {root ? <TreeNode {...root} /> : <div>No Tree Created Yet</div>}
      </div>
    </div>
  );
};

export default TreeAlgorithms;
