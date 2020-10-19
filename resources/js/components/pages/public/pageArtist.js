import React, { useState } from "react";
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

const pageArtist = () => {
    const url = window.location.origin + "/assets/images/backgorund_image.jpg";
    const image1 = window.location.origin + "/assets/images/image1.jpg";
    const image2 = window.location.origin + "/assets/images/image2.png";
    const instagram = window.location.origin + "/assets/images/Instagram.png";
    return (
        <Layout
            className="layout"
            style={{
                backgroundImage: "url('" + url + "')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                color: "white",
                height: "100%"
            }}
        >
            <Layout.Content className="site-layout">
                <div style={{ marginTop: "50px" }}>
                    <Row id="spotify_layout">
                        <Col xs={3} sm={3} md={4} lg={7} xl={7}></Col>
                        <Col xs={18} sm={18} md={17} lg={11} xl={11}>
                            <Row>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    <img
                                        src={image1}
                                        className="image-profile"
                                    ></img>
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={14} xl={14}>
                                    <div>
                                        <p>Kyle Gee</p>
                                    </div>
                                    <div className="profile-header">
                                        Heartbreak
                                    </div>
                                    <img
                                        src={instagram}
                                        width={20}
                                        style={{
                                            marginTop: "60px",
                                            borderRadius: "12px",
                                            cursor: "pointer"
                                        }}
                                    ></img>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                            <span style={{ float: "right" }}>
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
                                                style={{ textAlign: "center" }}
                                            >
                                                POWERED BY
                                            </span>
                                            <br></br>
                                            <span
                                                style={{ textAlign: "center" }}
                                            >
                                                <img
                                                    src={image2}
                                                    width={100}
                                                ></img>
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
    );
};

export default pageArtist;
