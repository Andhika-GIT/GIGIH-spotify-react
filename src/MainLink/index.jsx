import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';

// pages
import { Home, Recommended, TopTen, MyPlaylists, Playlists, PlaylistDetail, Search } from '../pages';

const MainLink = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search-song" component={Search} />
      <Route exact path="/my-playlists" component={MyPlaylists} />
      <Route path="/my-playlists/:playlistId" component={PlaylistDetail} />
      {/* <Route path="/top-10" component={TopTen} />
      <Route path="/recommended" component={Recommended} />
      <Route path="/playlists" component={Playlists} /> */}

      {/* <Route path="*">
        <NotFound />
      </Route> */}
    </Switch>
  );
};

export default MainLink;
