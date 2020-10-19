import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { fetchData } from "../../../axios";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "09f5bed2a09e492e93979f2a45b90d39";
const redirectUri = `${window.location.origin}/spotifytest`;
const scopes = [
    "user-follow-read",
    "user-follow-modify",
    "user-library-read",
    "user-library-modify",
    "user-read-email"
];
// window.location.hash = "";

// Get the hash of the url
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

const SpotifyTest = () => {
    let spotify_token = localStorage.spotify_token;
    useEffect(() => {
        if (hash.access_token) {
            localStorage.spotify_token = hash.access_token;
            window.location.href = redirectUri;
        }

        if (spotify_token) {
            var spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(spotify_token);
            spotifyApi.getMe().then(me => {
                console.log(me, me.email, me.display_name);
                spotifyApi
                    .followArtists([localStorage.spotify_id])
                    .then(res => {
                        let data = {
                            artist_id: localStorage.artist_id,
                            display_name: me.display_name,
                            email: me.email,
                            user_url: me.external_urls.spotify,
                            platform: "Spotify"
                        };
                        fetchData("POST", "api/artist_follower", data).then(
                            res => {
                                console.log("res");
                            }
                        );
                        location.href =
                            "https://open.spotify.com/artist/" +
                            localStorage.artist_id;
                    });
            });
        }
        return () => {};
    }, []);

    const goToSpotify = () => {
        location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
        )}&response_type=token&show_dialog=true`;
    };
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    {!spotify_token && (
                        <a
                            className="btn btn--loginApp-link"
                            onClick={e => goToSpotify()}
                            // href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            //     "%20"
                            // )}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
                        </a>
                    )}{" "}
                    {spotify_token && <>Redirecting you to Spotify</>}
                </header>
            </div>
        </div>
    );
};

export default SpotifyTest;
