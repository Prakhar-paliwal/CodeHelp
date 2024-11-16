import React, { useState } from "react";
import { Plus, Play, Download, X } from "lucide-react";

const YouTubeLearning = () => {
  const GROQ_API_KEY = "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";

  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [summaries, setSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Function to extract video ID from various YouTube URL formats
  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);

      // Handle different URL formats
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1); // e.g., "https://youtu.be/<id>"
      }
      if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v"); // e.g., "https://www.youtube.com/watch?v=<id>"
      }
      return null;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };

  // Handle adding a new video
  const addVideo = () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert("Invalid YouTube URL. Please ensure it is a valid link.");
      return;
    }

    const videoData = {
      id: videos.length + 1,
      title: `Video ${videos.length + 1}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrl: `https://www.youtube.com/embed/${videoId}`,
      watchedTime: "Just added",
    };

    setVideos([...videos, videoData]);
    setVideoUrl("");
    setIsModalOpen(false);
  };

  // Handle summary generation
 // Handle summary generation
const generateSummary = async (video) => {
  setLoadingSummary(true);
  try {
    const response = await fetch("https://api.groq.io/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        videoUrl: video.videoUrl.replace("embed/", "watch?v="), // Convert embed URL to standard format for API
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to summarize the video.");
    }

    const data = await response.json();
    setSummaries((prev) => ({
      ...prev,
      [video.id]: data.summary || "Summary not available.",
    }));
  } catch (error) {
    console.error("Error generating summary:", error);
    setSummaries((prev) => ({
      ...prev,
      [video.id]: "Failed to generate summary. Please try again.",
    }));
  } finally {
    setLoadingSummary(false);
  }
};
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">YouTube Learning & Summarization</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Video</span>
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-[#1E1E1E] rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
                onClick={() => window.open(video.videoUrl, "_blank")}
              >
                <Play className="w-12 h-12 text-white" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{video.title}</h3>
              <p className="text-sm text-gray-400 mb-4">Watched {video.watchedTime}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateSummary(video)}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  disabled={loadingSummary}
                >
                  <Play className="w-4 h-4" />
                  <span>Generate Summary</span>
                </button>
                <button
                  onClick={() => window.open(video.videoUrl, "_blank")}
                  className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
              {/* Display Summary for the Video */}
              {summaries[video.id] && (
                <div className="mt-4 bg-[#121212] rounded-lg p-4">
                  <h4 className="text-md font-semibold mb-2">Summary:</h4>
                  <p className="text-gray-400">{summaries[video.id]}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1E1E1E] rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Video</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Paste YouTube URL here"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2 bg-[#121212] rounded-md focus:outline-none text-white"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addVideo}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeLearning;