import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Layout from "./layouts";

// pages
import SignIn from "./pages/auth/SignIn";

// react-router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// switch-link
import MainLink from "./MainLink";

function App() {
  const [token, setToken] = useState(null);

  const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const auth_endpoint = import.meta.env.VITE_APP_SPOTIFY_TOKEN_AUTHORIZE;
  const redirect_url = import.meta.env.VITE_APP_SPOTIFY_REDIRECT_URI;

  // configure the parameters
  const scope = "playlist-modify-private";
  const response_type = "token";

  const loginUrl = `${auth_endpoint}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope}`;

  useEffect(() => {
    const hash = window.location.hash;
    let getToken = window.localStorage.getItem("token");

    if (!getToken && hash) {
      getToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", getToken);
    }

    setToken(getToken);
  }, []);

  return (
    <>
      {token ? (
        <Router>
          <Layout>
            <MainLink />
          </Layout>
        </Router>
      ) : (
        <SignIn loginUrl={loginUrl} />
      )}
    </>
  );
}

export default App;
