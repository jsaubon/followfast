import { Alert, message, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { fetchData } from "../../../axios";
import Page404 from "./page404";
export const authEndpoint = "https://accounts.spotify.com/authorize";

const gif = window.location.origin + "/assets/images/redirect.gif";

const artistInfo = localStorage.artist ? JSON.parse(localStorage.artist) : "";
const clientId = "09f5bed2a09e492e93979f2a45b90d39";
const redirectUri = `${window.location.origin}/platform/spotify/callback`;
const scopes = [
    // "user-follow-read",
    "user-follow-modify",
    // "user-library-read",
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

const PageArtistTrack = ({ match }) => {
    const [page404, setPage404] = useState(false);
    // let spotify_token = localStorage.spotify_token;
    const [artistInfo, setArtistInfo] = useState();
    useEffect(() => {
        if (localStorage.spotify_token) {
            fetchData("GET", "api/artist/public/" + match.params.id)
                .then(res => {
                    if (res.success) {
                        setArtistInfo(res.data);
                        // window.location.href =
                        //     "https://open.spotify.com/track/" +
                        //     match.params.track;
                    } else {
                        setPage404(true);
                    }
                })
                .catch(err => {
                    setPage404(true);
                });
        } else {
            console.log(localStorage.spotify_token);
            goToSpotifyLogin();
        }
        return () => {};
    }, []);

    useEffect(() => {
        if (artistInfo) {
            var spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(localStorage.spotify_token);
            spotifyApi
                .getMe()
                .then(me => {
                    followTracks(match.params.track, me);
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem("spotify_token");
                    location.reload();
                });
        }
        return () => {};
    }, [artistInfo]);

    const followTracks = (track_id, me) => {
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(localStorage.spotify_token);
        spotifyApi
            .addToMySavedTracks([track_id])
            .then(res => {
                getTrackInfo(track_id, me);
                console.log(res);
            })
            .catch(err => {
                message.error(
                    "Error, could not add this track, please try again."
                );
            });
    };

    const getTrackInfo = (track_id, me) => {
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(localStorage.spotify_token);
        spotifyApi.getTrack(track_id).then(res => {
            console.log(res);
            let data = {
                artist_id: artistInfo.artist.id,
                album_name: res.name,
                album_id: res.id,
                album_image: "none",
                display_name: me.display_name,
                email: me.email,
                user_url: me.external_urls.spotify,
                platform: "Spotify",
                type: "Track"
            };
            fetchData("POST", "api/artist_album_like", data).then(res => {
                window.location.href =
                    "https://open.spotify.com/track/" + track_id;
            });
        });
    };

    const goToSpotifyLogin = () => {
        localStorage.back_location = window.location.href;
        location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
        )}&response_type=token&show_dialog=false`;
    };

    return (
        <div>
            <Row>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
                <Col
                    xs={284}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    style={{ textAlign: "center" }}
                >
                    <img
                        src={gif}
                        style={{ marginTop: "50px", width: "100%" }}
                    ></img>
                    <p style={{ marginLeft: "10px" }}>
                        REDIRECTING TO SPOTIFY...
                    </p>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
            </Row>

            {page404 && <Page404 />}
        </div>
    );
};

export default PageArtistTrack;
