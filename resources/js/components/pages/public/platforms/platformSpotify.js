import { LoadingOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
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

const PlatformSpotify = props => {
    console.log(hash);
    let spotify_token = localStorage.spotify_token;
    useEffect(() => {
        if (hash.access_token) {
            // localStorage.stop_login = 1;
            localStorage.spotify_token = hash.access_token;
            // console.log(spotify_token);
            // window.location.href = redirectUri;
        }

        if (spotify_token) {
            console.log(props.location.search);
            let spotify_id = props.location.search;

            if (spotify_id) {
                localStorage.spotify_id = spotify_id;
                spotify_id = spotify_id.replace("?spotify_id=", "");
                fetchData(
                    "GET",
                    "api/artist_follow?spotify_id=" + spotify_id
                ).then(res => {
                    // console.log(res);
                    if (res.success) {
                        let _artistInfo = res.data;
                        console.log("from ff", _artistInfo);
                        // followArtist(_artistInfo);
                    } else {
                        message.error("Artist not found");
                    }
                });
            } else {
                if (!hash.access_token) {
                    console.log("from followfast", artistInfo);
                    // followArtist(artistInfo);
                } else {
                    window.location.href =
                        window.location.origin +
                        "/platform/spotify" +
                        localStorage.spotify_id;
                }
            }
        } else {
            let spotify_id = props.location.search;
            if (spotify_id) {
                localStorage.spotify_id = spotify_id;
            }
            goToSpotifyLogin();
        }
        return () => {};
    }, []);

    const followArtist = _artistInfo => {
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(spotify_token);
        spotifyApi
            .getMe()
            .then(me => {
                console.log(
                    me,
                    me.email,
                    me.display_name,
                    _artistInfo,
                    _artistInfo.artist_account.spotify_id
                );
                spotifyApi
                    .followArtists([_artistInfo.artist_account.spotify_id])
                    .then(res => {
                        let data = {
                            artist_id: _artistInfo.id,
                            display_name: me.display_name,
                            email: me.email,
                            user_url: me.external_urls.spotify,
                            platform: "Spotify"
                        };
                        let artist_name = _artistInfo.user.name;
                        fetchData(
                            "POST",
                            "api/artist_follower/follow",
                            data
                        ).then(res => {
                            console.log("ARTIST NAME", _artistInfo.user.name);
                            gtag("event", "followed", {
                                send_to: "AW-808953923",
                                value: "0",
                                items: [
                                    {
                                        id: artist_name,
                                        google_business_vertical: "music"
                                    }
                                ]
                            });
                            console.log("GTAG WORKING");

                            fbq("trackCustom", "followed", {
                                id: _artistInfo.user.name
                            });
                            console.log("FB PIXEL WORKING");
                            location.href =
                                "https://open.spotify.com/artist/" +
                                _artistInfo.artist_account.spotify_id;
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem("spotify_token");
                location.reload();
            });
    };

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
                    {spotify_token && (
                        <>
                            <Row>
                                <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={8}
                                    lg={8}
                                    xl={8}
                                    style={{ textAlign: "center" }}
                                >
                                    {/* <img
                        src={gif}
                        style={{ marginTop: "50px", width: "100%" }}
                    ></img> */}
                                    <LoadingOutlined spin size="30" />
                                    <p style={{ marginLeft: "10px" }}>
                                        REDIRECTING TO SPOTIFY...
                                    </p>
                                </Col>
                                <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
                            </Row>
                        </>
                    )}
                </header>
            </div>
        </div>
    );
};

export default PlatformSpotify;
