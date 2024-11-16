// codehelp-frontend/src/api/youtubeAPI.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const youtubeAPI = {
  getPlaylists: async () => {
    const response = await axios.get(`${API_URL}/youtube/playlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },

  addVideo: async (video) => {
    const response = await axios.post(`${API_URL}/youtube/videos`, video, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data._id;
  },

  summarizeVideo: async ({ videoId }) => {
    const response = await axios.post(
      `${API_URL}/youtube/summarize`,
      { videoId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    return response.data;
  },
};

export default youtubeAPI;
