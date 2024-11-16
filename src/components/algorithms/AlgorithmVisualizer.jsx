// codehelp-frontend/src/components/algorithms/AlgorithmVisualizer.jsx

import React, { useState } from 'react';
import SortingAlgorithms from './SortingAlgorithms';
import TreeAlgorithms from './TreeAlgorithms';

const AlgorithmVisualizer = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('sorting');

  return (
    <div>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeAlgorithm === 'sorting' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveAlgorithm('sorting')}
        >
          Sorting Algorithms
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeAlgorithm === 'tree' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveAlgorithm('tree')}
        >
          Tree Algorithms
        </button>
      </div>

      <div>
        {activeAlgorithm === 'sorting' && <SortingAlgorithms />}
        {activeAlgorithm === 'tree' && <TreeAlgorithms />}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
