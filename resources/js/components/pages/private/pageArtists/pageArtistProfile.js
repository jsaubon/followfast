import { Button, Card, Col, Row, Divider } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";

const PageArtistProfile = ({ match, location }) => {
    const [artistInfo, setArtistInfo] = useState();
    useEffect(() => {
        if (location.artist) {
            setArtistInfo(location.artist);
        } else {
            fetchData("GET", "api/artist/" + match.params.id).then(res => {
                console.log(res.data);
                setArtistInfo(res.data);
            });
        }
        return () => {};
    }, []);

    useEffect(() => {
        console.log(artistInfo);
        return () => {};
    }, [artistInfo]);
    return (
        <>
            <Title levle={4}>Artist Profile</Title>
            <Button type="primary" onClick={e => history.push("/artists")}>
                Back
            </Button>
            {artistInfo && (
                <>
                    <Card className="mt-10">
                        <Row>
                            <Col xs={24} md={14}>
                                <Title level={4}>
                                    Artist: {artistInfo.name}
                                </Title>
                            </Col>
                            <Col xs={24} md={10} className="text-center">
                                <img
                                    style={{
                                        float: "left",
                                        marginRight: 20,
                                        width: 200,
                                        height: 200
                                    }}
                                    src={`${window.location.origin}/${artistInfo.artist.song_image}`}
                                />
                                <Title level={4}>
                                    Song Title: {artistInfo.artist.song_title}
                                </Title>
                                <Text>
                                    Description:{" "}
                                    {artistInfo.artist.song_description}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                    <Divider />
                    <Row>
                        <Col xs={24} md={12}></Col>
                        <Col xs={24} md={12}></Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default PageArtistProfile;
