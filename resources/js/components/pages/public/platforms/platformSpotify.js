import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { fetchData } from "../../../../axios";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const artistInfo = localStorage.artist ? JSON.parse(localStorage.artist) : "";
const clientId = "09f5bed2a09e492e93979f2a45b90d39";
const redirectUri = `${window.location.origin}/platform/spotify`;
const scopes = [
    // "user-follow-read",
    "user-follow-modify",
    // "user-library-read",
    // "user-library-modify",
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

const PlatformSpotify = () => {
    let spotify_token = localStorage.spotify_token;
    useEffect(() => {
        if (hash.access_token) {
            // localStorage.stop_login = 1;
            localStorage.spotify_token = hash.access_token;
            // console.log(spotify_token);
            // window.location.href = redirectUri;
        }

        if (spotify_token) {
            var spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(spotify_token);
            spotifyApi
                .getMe()
                .then(me => {
                    console.log(
                        me,
                        me.email,
                        me.display_name,
                        artistInfo,
                        artistInfo.artist_account.spotify_id
                    );
                    spotifyApi
                        .followArtists([artistInfo.artist_account.spotify_id])
                        .then(res => {
                            let data = {
                                artist_id: artistInfo.id,
                                display_name: me.display_name,
                                email: me.email,
                                user_url: me.external_urls.spotify,
                                platform: "Spotify"
                            };
                            fetchData(
                                "POST",
                                "api/artist_follower/follow",
                                data
                            ).then(res => {
                                // location.href =
                                //     "https://open.spotify.com/artist/" +
                                //     artistInfo.artist_account.spotify_id;
                            });
                        });
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem("spotify_token");
                    location.reload();
                });
        } else {
            goToSpotifyLogin();
        }
        return () => {};
    }, []);

    const goToSpotifyLogin = () => {
        location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
        )}&response_type=token&show_dialog=false`;
    };
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    {!spotify_token && (
                        <a
                            className="btn btn--loginApp-link"
                            onClick={e => goToSpotifyLogin()}
                            // href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            //     "%20"
                            // )}&response_type=token&show_dialog=true`}
                        >
                            {/* Login to Spotify */}
                        </a>
                    )}{" "}
                    {spotify_token && <>Redirecting you to Spotify</>}
                </header>
            </div>
        </div>
    );
};

export default PlatformSpotify;
