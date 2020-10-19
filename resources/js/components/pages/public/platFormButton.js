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

const platFormButton = ({ buttonText, artist, platFormName }) => {
    const goToPlatform = () => {
        localStorage.artist = JSON.stringify(artist);
        window.open(
            window.location.origin + "/platform/" + platFormName,
            "_blank"
        );
    };
    return (
        <>
            <div className="div-link-button" onClick={e => goToPlatform()}>
                <div
                    style={{
                        flex: "1",
                        padding: "17px"
                    }}
                >
                    <span>{buttonText}</span>
                    <span style={{ float: "right" }}>
                        <CaretRightOutlined />
                    </span>
                </div>
            </div>
        </>
    );
};

export default platFormButton;
