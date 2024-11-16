// codehelp-frontend/src/components/algorithms/SortingAlgorithms.jsx

import React, { useState, useEffect } from 'react';

const SortingAlgorithms = ({ arraySize = 10, visualizationSpeed = 500 }) => {
  const [array, setArray] = useState([]);
  const [inputArray, setInputArray] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState(visualizationSpeed);

  // Generate a random array
  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
  };

  useEffect(() => {
    generateArray(); // Generate array on initial render
  }, [arraySize]);

  // Parse user input for array
  const handleArrayInput = () => {
    const parsedArray = inputArray
      .split(',')
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));
    if (parsedArray.length > 0) {
      setArray(parsedArray);
    } else {
      alert('Please enter a valid array (e.g., 10, 20, 30)');
    }
  };

  // Bubble Sort Algorithm
  const bubbleSort = () => {
    const animations = [];
    const arrayCopy = [...array];
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          animations.push([j, j + 1]);
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
        }
      }
    }
    animateSorting(animations, arrayCopy);
  };

  // Animation Handler
  const animateSorting = (animations, sortedArray) => {
    animations.forEach(([i, j], idx) => {
      setTimeout(() => {
        const arrayCopy = [...array];
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        setArray(arrayCopy);
      }, idx * currentSpeed);
    });

    setTimeout(() => setArray(sortedArray), animations.length * currentSpeed);
  };
  // Selection Sort Algorithm
  const selectionSort = () => {
    const animations = [];
    const arrayCopy = [...array];
    for (let i = 0; i < arrayCopy.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arrayCopy.length; j++) {
        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        animations.push([i, minIndex]);
        [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
      }
    }
    animateSorting(animations, arrayCopy);
  };

  // Insertion Sort Algorithm
  const insertionSort = () => {
    const animations = [];
    const arrayCopy = [...array];
    for (let i = 1; i < arrayCopy.length; i++) {
      let key = arrayCopy[i];
      let j = i - 1;
      while (j >= 0 && arrayCopy[j] > key) {
        animations.push([j + 1, j]);
        arrayCopy[j + 1] = arrayCopy[j];
        j--;
      }
      arrayCopy[j + 1] = key;
    }
    animateSorting(animations, arrayCopy);
  };

  // Quick Sort Algorithm
  const quickSort = () => {
    const arrayCopy = [...array];
    const animations = [];
    const quickSortHelper = (arr, low, high) => {
      if (low < high) {
        const pivotIndex = partition(arr, low, high, animations);
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      }
    };
    const partition = (arr, low, high, animations) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          animations.push([i, j]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      animations.push([i + 1, high]);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    };
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1);
    animateSorting(animations, arrayCopy);
  };

  // const animateSorting = (animations, sortedArray) => {
  //   animations.forEach(([i, j], idx) => {
  //     setTimeout(() => {
  //       const arrayCopy = [...array];
  //       [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  //       setArray(arrayCopy);
  //     }, idx * visualizationSpeed);
  //   });

  //   setTimeout(() => setArray(sortedArray), animations.length * visualizationSpeed);
  // };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter numbers, e.g., 5, 10, 15"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
          className="border px-2 py-1 rounded-lg w-full text-black"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleArrayInput}
        >
          Set Array
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={generateArray}
        >
          Generate New Array
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={bubbleSort}>
          Bubble Sort
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={selectionSort}>
          Selection Sort
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={quickSort}>
          Quick Sort
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={bubbleSort}>
          Insert Sort
        </button>
        
      </div>
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium">Visualization Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={currentSpeed}
          onChange={(e) => setCurrentSpeed(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <span>{currentSpeed} ms</span>
      </div>
      <div className="flex justify-center items-end gap-2 h-64">
        {array.map((value, index) => (
          <div
            key={index}
            className="bg-blue-400 flex flex-col items-center"
            style={{
              height: `${value * 2}px`,
              width: '20px',
            }}
          >
            <span className="text-xs text-white mt-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingAlgorithms;
