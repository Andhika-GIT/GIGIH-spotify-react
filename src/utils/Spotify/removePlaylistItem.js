import axios from "axios";

const removePlaylistItem = async (playlistId, trackUri) => {
  let response = {
    status: "",
  };
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    response.status === 401;
    return response;
  }
  try {
    response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          tracks: [
            {
              uri: trackUri,
            },
          ],
        },
      }
    );

    return response;
  } catch (err) {
    response = err.response.data.error;
    if (response.status === 401) {
      localStorage.removeItem("token");
    }
    return response;
  }
};

export default removePlaylistItem;
