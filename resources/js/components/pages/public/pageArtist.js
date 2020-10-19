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
                <Layout.Content className="site-layout artist-content">
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
                                        {" "}
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Spotify</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Apple Music</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                <span>iTunes</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Google Play/Youtube</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Amazon</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Tidal</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Deezer</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Microsoft Groove</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>Shazam</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="div-link-button">
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span>iHeartRadio</span>
                                                <span
                                                    style={{ float: "right" }}
                                                >
                                                    <CaretRightOutlined />
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                textAlign: "center",
                                                marginTop: "15px"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    flex: "1",
                                                    padding: "17px"
                                                }}
                                            >
                                                {" "}
                                                <span
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    POWERED BY
                                                </span>
                                                <br></br>
                                                <span
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "20px"
                                                    }}
                                                >
                                                    FOLLOWFAST
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={2} sm={2} md={3} lg={6} xl={6}></Col>
                        </Row>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                </Layout.Content>
            </Layout>
        )
    );
};

export default pageArtist;
