import { LoadingOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import { fetchData } from "../../../../axios";

const PlatformSpotify = props => {
    useEffect(() => {
        const privateKey =
            "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgt5U1A+ebr9lw6ybNtEpmKfmJAYbGtdzYior0YPEeMGygCgYIKoZIzj0DAQehRANCAAROB6LvV5kFNjpqdzDrvlCfOuz+y2+bx1xJggmxRVMnfWgBDcre705XqPSEKSFexO0y3WIKFpXTwvI1Nw48J6yu";

        const apiKeyId = "N4WD3T47J4";
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
        console.log("@token: ", token);
    });
    return <div>cool</div>;
};

export default PlatformSpotify;
