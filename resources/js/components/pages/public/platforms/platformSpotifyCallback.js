import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { fetchData } from "../../../../axios";

const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
const PlatformSpotifyCallback = () => {
    let history = useHistory();
    useEffect(() => {
        localStorage.spotify_token = hash.access_token;
        window.location.href = localStorage.back_location;
        return () => {};
    }, []);
    return <div></div>;
};

export default PlatformSpotifyCallback;
