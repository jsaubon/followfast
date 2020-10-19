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
        fetchData("GET", "api/artist/" + props.match.params.id).then(res => {
            setArtist(res.data);
            console.log(res.data);
        });
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
                            artist.artist.song_image +
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
                            artist.artist.song_image +
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
                                                artist.artist.song_image
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
                                        <div>
                                            <p>{artist.name}</p>
                                        </div>
                                        <div className="profile-header">
                                            {artist.artist.song_title}
                                        </div>
                                        <div>
                                            <IconArtistSocialAccounts
                                                artist={artist.artist}
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
                                        <PlatFormButton
                                            buttonText="Spotify"
                                            artist={artist.artist}
                                            platFormName="Spotify"
                                        />
                                        <PlatFormButton
                                            buttonText="Apple Music"
                                            artist={artist.artist}
                                            platFormName="Apple Music"
                                        />
                                        <PlatFormButton
                                            buttonText="iTunes"
                                            artist={artist.artist}
                                            platFormName="iTunes"
                                        />
                                        <PlatFormButton
                                            buttonText="Google Play/Youtube"
                                            artist={artist.artist}
                                            platFormName="Google Play/Youtube"
                                        />
                                        <PlatFormButton
                                            buttonText="Amazon"
                                            artist={artist.artist}
                                            platFormName="Amazon"
                                        />
                                        <PlatFormButton
                                            buttonText="Tidal"
                                            artist={artist.artist}
                                            platFormName="Tidal"
                                        />
                                        <PlatFormButton
                                            buttonText="Deezer"
                                            artist={artist.artist}
                                            platFormName="Deezer"
                                        />
                                        <PlatFormButton
                                            buttonText="Microsoft Groove"
                                            artist={artist.artist}
                                            platFormName="Microsoft Groover"
                                        />
                                        <PlatFormButton
                                            buttonText="Napster"
                                            artist={artist.artist}
                                            platFormName="Napsterr"
                                        />
                                        <PlatFormButton
                                            buttonText="Shazam"
                                            artist={artist.artist}
                                            platFormName="Shazam"
                                        />
                                        <PlatFormButton
                                            buttonText="iHeartRadio"
                                            artist={artist.artist}
                                            platFormName="iHeartRadio"
                                        />
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
