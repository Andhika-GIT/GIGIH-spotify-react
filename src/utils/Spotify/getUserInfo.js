import axios from "axios";

const getUserInfo = async () => {
  let response = {
    status: "",
  };
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    response.status === 401;
    return response;
  }
  try {
    response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    window.localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    response = err.response.data.error;
    if (response.status === 401) {
      localStorage.removeItem("token");
    }
    return response;
  }
};

export default getUserInfo;
