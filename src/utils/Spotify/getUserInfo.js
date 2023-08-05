import axios from 'axios';

const getUserInfo = async () => {
  let response;
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    response.status === 401;
    return response;
  }
  try {
    response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    window.localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    let errorInfo = err.response.data.error;
    if (errorInfo.status === 401) {
      localStorage.removeItem('token');
    }
    return errorInfo;
  }
};

export default getUserInfo;
