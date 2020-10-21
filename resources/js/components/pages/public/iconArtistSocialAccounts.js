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

const iconArtistSocialAccounts = artist => {
    return (
        <>
            {artist.artist.artist_social.instagram && (
                <a
                    href={
                        "https://www.instagram.com/" +
                        artist.artist.artist_social.instagram
                    }
                    target="_blank"
                >
                    <img
                        src={
                            window.location.origin +
                            "/assets/images/instagram.png"
                        }
                        width={25}
                        style={{
                            borderRadius: "12px",
                            cursor: "pointer"
                        }}
                        title="instagram"
                    ></img>
                </a>
            )}
            {artist.artist.artist_social.facebook && (
                <a
                    href={
                        "https://www.facebook.com/" +
                        artist.artist.artist_social.facebook
                    }
                    target="_blank"
                >
                    <img
                        src={
                            window.location.origin +
                            "/assets/images/facebook.jpg"
                        }
                        width={25}
                        style={{
                            borderRadius: "12px",
                            cursor: "pointer",
                            marginLeft: "5px"
                        }}
                        title="facebook"
                    ></img>
                </a>
            )}

            {artist.artist.artist_social.twitter && (
                <a
                    href={
                        "https://www.twitter.com/" +
                        artist.artist.artist_social.twitter
                    }
                    target="_blank"
                >
                    <img
                        src={
                            window.location.origin +
                            "/assets/images/twitter.jpg"
                        }
                        width={25}
                        style={{
                            borderRadius: "12px",
                            cursor: "pointer",
                            marginLeft: "5px"
                        }}
                        title="twitter"
                    ></img>
                </a>
            )}
            {artist.artist.artist_social.youtube && (
                <a
                    href={
                        "https://www.youtube.com/" +
                        artist.artist.artist_social.youtube
                    }
                    target="_blank"
                >
                    <img
                        src={
                            window.location.origin +
                            "/assets/images/youtube.jpg"
                        }
                        width={25}
                        style={{
                            borderRadius: "12px",
                            cursor: "pointer",
                            marginLeft: "5px"
                        }}
                        title="youtube"
                    ></img>
                </a>
            )}
        </>
    );
};

export default iconArtistSocialAccounts;
