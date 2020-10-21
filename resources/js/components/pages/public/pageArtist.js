import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Form, Input, Checkbox, Button, Alert } from "antd";
import {
    UserOutlined,
    LockOutlined,
    CaretRightOutlined,
    InstagramFilled
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { fetchData } from "../../../axios";
import IconArtistSocialAccounts from "./iconArtistSocialAccounts";
import PlatFormButton from "./platFormButton";
import PoweredBy from "./poweredBy";
const pageArtist = props => {
    const [artist, setArtist] = useState([]);

    useEffect(() => {
        getArtistbyId();

        return () => {};
    }, []);

    const getArtistbyId = () => {
        fetchData("GET", "api/artist/song/" + props.match.params.song).then(
            res => {
                setArtist(res.data);
                console.log(res.data);
            }
        );
    };

    return (
        artist.length != 0 && (
            <Layout className="layout" style={{ color: "white" }}>
                <div
                    className="song-image-background-blur"
                    style={{
                        backgroundImage:
                            "url('" +
                            window.location.origin +
                            "/" +
                            artist.song_image +
                            "')"
                    }}
                ></div>
                <div
                    className="song-image-background"
                    style={{
                        backgroundImage:
                            "url('" +
                            window.location.origin +
                            "/" +
                            artist.song_image +
                            "')"
                    }}
                ></div>
                <Layout.Content className="site-layout artist-content text-align">
                    <div style={{ marginTop: "50px" }}>
                        <Row id="spotify_layout">
                            <Col xs={3} sm={3} md={4} lg={7} xl={7}></Col>
                            <Col xs={18} sm={18} md={17} lg={11} xl={11}>
                                <Row>
                                    <Col
                                        xs={24}
                                        sm={24}
                                        md={10}
                                        lg={10}
                                        xl={10}
                                    >
                                        <img
                                            src={
                                                window.location.origin +
                                                "/" +
                                                artist.song_image
                                            }
                                            className="image-profile"
                                        ></img>
                                    </Col>
                                    <Col
                                        xs={24}
                                        sm={24}
                                        md={10}
                                        lg={14}
                                        xl={14}
                                    >
                                        <div className="profile-name">
                                            <p>{artist.user.name}</p>
                                        </div>
                                        <div className="profile-header">
                                            {artist.song_title}
                                        </div>
                                        <div>
                                            <IconArtistSocialAccounts
                                                artist={artist}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={2} sm={2} md={3} lg={6} xl={6}></Col>
                        </Row>
                        <Row>
                            <Col xs={3} sm={3} md={4} lg={7} xl={7}></Col>
                            <Col xs={18} sm={18} md={17} lg={11} xl={11}>
                                <Row>
                                    <Col
                                        xs={24}
                                        sm={24}
                                        md={24}
                                        lg={24}
                                        xl={24}
                                    >
                                        {artist.artist_account.spotify_id && (
                                            <PlatFormButton
                                                buttonText="Spotify"
                                                artist={artist}
                                                platFormName="spotify"
                                            />
                                        )}

                                        {artist.artist_account.apple_id && (
                                            <PlatFormButton
                                                buttonText="Apple Music"
                                                artist={artist}
                                                platFormName="applemusic"
                                            />
                                        )}
                                        {artist.artist_account.itunes_id && (
                                            <PlatFormButton
                                                buttonText="iTunes"
                                                artist={artist}
                                                platFormName="iTunes"
                                            />
                                        )}

                                        {artist.artist_account.google_id && (
                                            <PlatFormButton
                                                buttonText="Google Play/Youtube"
                                                artist={artist}
                                                platFormName="googleplay"
                                            />
                                        )}
                                        {artist.artist_account.amazon_id && (
                                            <PlatFormButton
                                                buttonText="Amazon"
                                                artist={artist}
                                                platFormName="amazon"
                                            />
                                        )}
                                        {artist.artist_account.tidal_id && (
                                            <PlatFormButton
                                                buttonText="Tidal"
                                                artist={artist}
                                                platFormName="tidal"
                                            />
                                        )}
                                        {artist.artist_account.Deezer_id && (
                                            <PlatFormButton
                                                buttonText="Deezer"
                                                artist={artist}
                                                platFormName="deezer"
                                            />
                                        )}
                                        {artist.artist_account.microsoft_id && (
                                            <PlatFormButton
                                                buttonText="Microsoft Groove"
                                                artist={artist}
                                                platFormName="microsoftgroove"
                                            />
                                        )}
                                        {artist.artist_account.napster_id && (
                                            <PlatFormButton
                                                buttonText="Napster"
                                                artist={artist}
                                                platFormName="napsterr"
                                            />
                                        )}
                                        {artist.artist_account.shazam_id && (
                                            <PlatFormButton
                                                buttonText="Shazam"
                                                artist={artist}
                                                platFormName="shazam"
                                            />
                                        )}
                                        {artist.artist_account
                                            .iheartradio_id && (
                                            <PlatFormButton
                                                buttonText="iHeartRadio"
                                                artist={artist}
                                                platFormName="iheartradio"
                                            />
                                        )}

                                        <PoweredBy />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={2} sm={2} md={3} lg={6} xl={6}></Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        )
    );
};

export default pageArtist;
