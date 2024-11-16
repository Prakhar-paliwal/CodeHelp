// codehelp-frontend/src/components/algorithms/AlgorithmVisualizer.jsx
import React, { useState } from 'react';
import SortingAlgorithms from '../components/algorithms/SortingAlgorithms';
import TreeAlgorithms from '../components/algorithms/TreeAlgorithms';

const AlgorithmVisualizer = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('sorting');
  const [arraySize, setArraySize] = useState(10);
  const [visualizationSpeed, setVisualizationSpeed] = useState(500);

  const handleArraySizeChange = (event) => {
    const size = parseInt(event.target.value, 10);
    if (size >= 5 && size <= 200) {
      setArraySize(size);
    } else {
      alert('Please enter a size between 5 and 200.');
    }
  };

  const handleSpeedChange = (event) => {
    setVisualizationSpeed(parseInt(event.target.value, 10));
  };

  return (
    <div className="p-4">
      {/* Algorithm Toggle Buttons */}
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

      {/* Array Size Input */}
      {activeAlgorithm === 'sorting' && (
        <div className="mb-6 ">
          <label htmlFor="array-size" className="mr-2">
            Array Size (5-200):
          </label>
          <input
            id="array-size"
            type="number"
            min="5"
            max="200"
            value={arraySize}
            onChange={handleArraySizeChange}
            className="px-2 py-1 border rounded-lg text-black"
          />
        </div>
      )}

      {/* Visualization Speed Input */}
      {/* <div className="mb-6">
        <label htmlFor="visualization-speed" className="mr-2">
          Visualization Speed (ms):
        </label>
        <input
          id="visualization-speed"
          type="range"
          min="100"
          max="2000"
          step="100"
          value={visualizationSpeed}
          onChange={handleSpeedChange}
          className="w-64"
        />
        <span className="ml-2">{visualizationSpeed} ms</span>
      </div> */}

      {/* Render Active Algorithm Component */}
      <div>
        {activeAlgorithm === 'sorting' ? (
          <SortingAlgorithms arraySize={arraySize} visualizationSpeed={visualizationSpeed} />
        ) : (
          <TreeAlgorithms visualizationSpeed={visualizationSpeed} />
        )}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
