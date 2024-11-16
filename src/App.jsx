import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AlgorithmVisualizer from './pages/AlgorithmVisualizer';
import TaskManager from './pages/TaskManager';
import YouTubeLearning from './pages/YoutubeLearning';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/algorithm-visualizer" element={<AlgorithmVisualizer />} />
            <Route path="/task-manager" element={<TaskManager />} />
            <Route path="/youtube-learning" element={<YouTubeLearning />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
