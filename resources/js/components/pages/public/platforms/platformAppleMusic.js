import { LoadingOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { fetchData } from "../../../../axios";
import { Client } from "@yujinakayama/apple-music";

const PlatformAppleMusic = props => {
    const artistInfo = localStorage.artist
        ? JSON.parse(localStorage.artist)
        : "";
    const [appleMusicToken, setAppleMusicToken] = useState("");

    const privateKey =
        "-----BEGIN PRIVATE KEY-----MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgt5U1A+ebr9lw6ybNtEpmKfmJAYbGtdzYior0YPEeMGygCgYIKoZIzj0DAQehRANCAAROB6LvV5kFNjpqdzDrvlCfOuz+y2+bx1xJggmxRVMnfWgBDcre705XqPSEKSFexO0y3WIKFpXTwvI1Nw48J6yu-----END PRIVATE KEY-----";
    const apiKeyId = "7PMQ8639C7";
    const issuerId = "N4WD3T47J4";
    let now = Math.round(new Date().getTime() / 1000);
    let nowPlus20 = now + 1199; // 1200 === 20 minutes
    let payload = {
        iss: issuerId,
        exp: nowPlus20,
        aud: "appstoreconnect-v1"
    };

    let signOptions = {
        algorithm: "ES256", // you must use this algorythm, not jsonwebtoken's default
        header: {
            alg: "ES256",
            kid: apiKeyId,
            typ: "JWT"
        }
    };

    let token = jwt.sign(payload, privateKey, signOptions);

    async function main(artistInfo) {
        console.log(token);
        const client = new Client({
            developerToken: token
        });
        const response = await client.artists.get(
            artistInfo.artist_account.apple_id,
            {
                storefront: "us"
            }
        );
        const url = response.data[0].attributes.url;
        // console.log("@aritst", artists);

        window.location.href = url;
    }

    useEffect(() => {
        main(artistInfo);
    });

    return (
        <div>
            {" "}
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
                        REDIRECTING TO APPLE MUSIC...
                    </p>
                </Col>
                <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
            </Row>
        </div>
    );
};

export default PlatformAppleMusic;
