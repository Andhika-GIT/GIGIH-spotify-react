import axios from 'axios';

const getPlaylistsDetail = async (playlistId) => {
  let response = {
    status: '',
  };
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    response.status === 401;
    return response;
  }
  try {
    response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (err) {
    response = err.response.data.error;
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    return response;
  }
};

export default getPlaylistsDetail;
