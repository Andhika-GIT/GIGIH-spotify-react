import axios from "axios";

const getRecommendation = async (search) => {
  let result = {
    artistId: "",
    trackId: "",
    genres: [],
  };

  let response = {
    status: "",
    data: null,
  };
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    response.status === 401;
    return response;
  }
  try {
    // get genres
    const genresResult = await axios.get(
      `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const generateRandomNumber = () => {
      let number1 = Math.floor(Math.random() * 100) + 1;
      let number2 = number1 + 3;

      return { number1, number2 };
    };

    const { number1, number2 } = generateRandomNumber();

    result.genres = genresResult.data.genres
      .slice(number1, number2)
      .join("%2C");

    // get artists and tracks id
    const searchResult = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=artist%2Ctrack&limit=8`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    result.artistId = searchResult.data.artists.items[0].id;
    result.trackId = searchResult.data.tracks.items[0].id;

    // get recommendation
    const recommendationResult = await axios.get(
      `https://api.spotify.com/v1/recommendations?&seed_artists=${result.artistId}&seed_genres=romance%C2indie%2Cpop%2Cclassical&seed_tracks=${result.trackId}&limit=20`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    response.data = recommendationResult.data.tracks;
    return response.data;
  } catch (err) {
    response = err.response.data.error;
    if (response.status === 401) {
      localStorage.removeItem("token");
    }
  }
};

export default getRecommendation;
