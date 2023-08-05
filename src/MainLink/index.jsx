import React from "react";

import { Switch, Route, Link } from "react-router-dom";

// pages
import { Home, Recommended, TopTen, MyPlaylists } from "../pages";

const MainLink = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/top-10" component={TopTen} />
      <Route path="/recommended" component={Recommended} />
      <Route path="/my-playlists" component={MyPlaylists} />
      {/* <Route path="*">
        <NotFound />
      </Route> */}
    </Switch>
  );
};

export default MainLink;
