import axios from 'axios';

const getTracks = async (search) => {
  let response;
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    response.status === 401;
    return response;
  }
  try {
    response = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=8`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data.tracks.items;
  } catch (err) {
    let errorInfo = err.response.data.error;
    if (errorInfo.status === 401) {
      localStorage.removeItem('token');
    }
    return errorInfo;
  }
};

export default getTracks;
