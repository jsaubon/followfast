import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Form, Input, Checkbox, Button, Alert } from "antd";
import PoweredBy from "./../poweredBy";
import { CaretRightOutlined } from "@ant-design/icons";
const PagePublicAlbum = ({ album }) => {
    return (
        <Layout className="layout" style={{ color: "white" }}>
            <div
                className="song-image-background-blur"
                style={{
                    backgroundImage:
                        "url('" +
                        window.location.origin +
                        "/ff/images/" +
                        album.album_image +
                        "')"
                }}
            ></div>
            <div
                className="song-image-background"
                style={{
                    backgroundImage:
                        "url('" +
                        window.location.origin +
                        "/ff/images/" +
                        album.album_image +
                        "')"
                }}
            ></div>
            <Layout.Content className="site-layout artist-content text-align">
                <div style={{ marginTop: "50px" }}>
                    <Row id="spotify_layout">
                        <Col xs={3} sm={3} md={4} lg={7} xl={7}></Col>
                        <Col xs={18} sm={18} md={17} lg={11} xl={11}>
                            <Row>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    <img
                                        src={`${window.location.origin}/ff/images/${album.album_image}`}
                                        className="image-profile"
                                    ></img>
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={14} xl={14}>
                                    <div className="profile-name">
                                        <p>{album.user.name}</p>
                                    </div>
                                    <div className="profile-header">
                                        {album.album_title}
                                    </div>

                                    <div
                                        className="div-link-button"
                                        style={{
                                            backgroundColor:
                                                "rgb(51 153 102 / 60%)"
                                        }}
                                    >
                                        <div
                                            style={{
                                                flex: "1",
                                                padding: "17px"
                                            }}
                                            onClick={e =>
                                                window.open(
                                                    window.location.origin +
                                                        "/artist/3/album/" +
                                                        album.album_id,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <span>
                                                Follow Eyeoneyez On Spotify
                                            </span>
                                            <span style={{ float: "right" }}>
                                                <CaretRightOutlined />
                                            </span>
                                        </div>
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
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    {/* {album.artist_account.spotify_id && (
                                        <PlatFormButton
                                            buttonText="Spotify"
                                            artist={artist}
                                            platFormName="spotify"
                                        />
                                    )} */}

                                    <PoweredBy />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={2} sm={2} md={3} lg={6} xl={6}></Col>
                    </Row>
                </div>
            </Layout.Content>
        </Layout>
    );
};

export default PagePublicAlbum;
