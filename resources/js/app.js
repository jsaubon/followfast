require("./bootstrap");

import { render } from "react-dom";
import React, { useContext, useReducer } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import LayoutContent from "./components/layout/layoutContent";
import "antd/dist/antd.css";
import "./style/custom.css";
import StateProvider from "./Provider";
import Login from "./components/pages/public/login";
import PageArtist from "./components/pages/public/pageArtist";
import PlatformSpotify from "./components/pages/public/platforms/platformSpotify";
import PlatformAppleMusic from "./components/pages/public/platforms/platformAppleMusic";
import PageArtistAlbum from "./components/pages/public/pageArtistAlbum";
import PageArtistTrack from "./components/pages/public/pageArtistTrack";
import PlatformSpotifyCallback from "./components/pages/public/platforms/platformSpotifyCallback";
import Page404 from "./components/pages/public/page404";

const App = () => {
    let isLogged = localStorage.getItem("token");
    if (window.location.href.indexOf("http:") !== -1) {
        if (
            window.location.href.indexOf(".test") === -1 &&
            window.location.href.indexOf(":8000") === -1
        ) {
            window.location.href = window.location.href.replace(
                "http",
                "https"
            );
        }
    }
    return (
        <StateProvider>
            <Router>
                <Switch>
                    <Route
                        path="/artist/:song"
                        name="Artist"
                        exact
                        component={PageArtist}
                    />
                    <Route
                        path="/platform/spotify"
                        name="Spotify"
                        exact
                        component={PlatformSpotify}
                    />

                    <Route
                        path="/platform/applemusic"
                        name="Apple Music"
                        exact
                        component={PlatformAppleMusic}
                    />
                    <Route
                        exact
                        path="/platform/spotify/callback"
                        component={PlatformSpotifyCallback}
                    />
                    <Route
                        path="/artist/:id/album/:album"
                        name="Artist Album"
                        exact
                        component={PageArtistAlbum}
                    />
                    <Route
                        path="/artist/:id/track/:track"
                        name="Artist Track"
                        exact
                        component={PageArtistTrack}
                    />
                    <Route exact path="/404" component={Page404} />
                    <Route
                        path="/"
                        name="Home"
                        component={isLogged ? LayoutContent : Login}
                    />
                    <Route
                        exact
                        path="/login"
                        name="Login Page"
                        render={props => <Login {...props} />}
                    />
                </Switch>
            </Router>
        </StateProvider>
    );
};

export default App;

render(<App />, document.getElementById("app"));
