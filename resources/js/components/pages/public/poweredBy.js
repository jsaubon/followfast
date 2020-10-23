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

const poweredBy = artist => {
    return (
        <>
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
                        WICKEDFOLLOW
                    </span>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </>
    );
};

export default poweredBy;
