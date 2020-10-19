import {
    BackwardOutlined,
    EditOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LeftOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Divider, Tag, Table, Input } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";
import ModalAddEditArtist from "./modalAddEditArtist";
import CardSongToDisplay from "./cardSongToDisplay";
import moment from "moment";

const PageArtistProfile = ({ match, history, location }) => {
    const [artistInfo, setArtistInfo] = useState();

    const [showModalAddEditArtist, setShowModalAddEditArtist] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState();
    const toggleShowModalAddEditArtist = record => {
        setSelectedArtist(record);
        setShowModalAddEditArtist(!showModalAddEditArtist);
    };

    useEffect(() => {
        if (location.artist) {
            setArtistInfo(location.artist);
        } else {
            getArtist();
        }

        return () => {};
    }, []);
    const getArtist = () => {
        fetchData("GET", "api/artist/" + match.params.id).then(res => {
            setArtistInfo(res.data);
            console.log(res.data);
        });
    };
    useEffect(() => {
        console.log(artistInfo);
        return () => {};
    }, [artistInfo]);

    const handleSearchFollower = (e) => {
        fetchData("GET",`api/artist_follower/${artistInfo.artist.id}?search=${e.target.value}`).then(res => {
            if(res.success) {
                setArtistInfo({...artistInfo, artist: {...artistInfo.artist, artist_followers: res.data} })
            }
        })
    }
    return (
        <>
            <Title levle={4}>Artist Profile</Title>
            <Button
                type="primary"
                onClick={e => history.push("/artists")}
                icon={<LeftOutlined />}
            >
                Back
            </Button>
            
            {artistInfo && (
                <>
                    <Row>
                        <Col xs={24} md={10} className="pl-0">
                            <CardSongToDisplay artistInfo={artistInfo} />

                            <Card className="mt-10 ">
                                <Title level={3}>Artist Information 
                                    <Button
                                        type="link"
                                        onClick={e => toggleShowModalAddEditArtist(artistInfo)}
                                        style={{ float: "right" }}
                                        icon={<EditOutlined />}
                                    >
                                        Edit
                                    </Button>
                                </Title>
                                
                                <Row>
                                    <Col xs={24} md={12}>
                                        <Text>Artist:</Text>
                                        <Title level={4} className="mt-0">
                                            {artistInfo.name}
                                        </Title>
                                        <Text>Email:</Text>
                                        <Title level={4} className="mt-0">
                                            {artistInfo.email}
                                        </Title>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Text>Status:</Text>
                                        <Title level={4} className="mt-0">
                                            {artistInfo.active
                                                ? "Active"
                                                : "Inactive"}
                                        </Title>
                                        <Text>Socials</Text>
                                        <br />
                                        <ButtonGroup>
                                            <Button
                                                href={
                                                    artistInfo.artist
                                                        .artist_social.instagram
                                                }
                                                target="_blank"
                                                icon={<InstagramOutlined />}
                                            ></Button>
                                            <Button
                                                href={
                                                    artistInfo.artist
                                                        .artist_social.facebook
                                                }
                                                target="_blank"
                                                icon={<FacebookOutlined />}
                                            ></Button>
                                            <Button
                                                href={
                                                    artistInfo.artist
                                                        .artist_social.twitter
                                                }
                                                target="_blank"
                                                icon={<TwitterOutlined />}
                                            ></Button>
                                            <Button
                                                href={
                                                    artistInfo.artist
                                                        .artist_social.youtube
                                                }
                                                target="_blank"
                                                icon={<YoutubeOutlined />}
                                            ></Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <Divider />
                                {Object.keys(
                                    artistInfo.artist.artist_account
                                ).map((title, key) => {
                                    if (
                                        title != "id" &&
                                        title != "artist_id" &&
                                        title != "created_at" &&
                                        title != "updated_at"
                                    )
                                        return (
                                            <Tag>
                                                {title}:{" "}
                                                {
                                                    artistInfo.artist
                                                        .artist_account[title]
                                                }
                                            </Tag>
                                        );
                                })}
                            </Card>
                        </Col>
                        <Col xs={24} md={14} className="pr-0">
                        <Card className="mt-10 ">
                                <Title level={4}>Followers</Title>
                                <Input.Search placeholder="Search here" onChange={e => handleSearchFollower(e)}/>
                                <br/>
                                <br/>
                                <Table dataSource={artistInfo.artist.artist_followers} >
                                    <Table.Column
                                        title="Platform"
                                        dataIndex="platform"
                                        key="platform"

                                    />
                                    <Table.Column
                                        title="Name"
                                        dataIndex="display_name"
                                        key="display_name"
                                        render={(text, record) => {
                                            return (
                                                <a
                                                    target="_blank"
                                                    href={record.user_url}
                                                >
                                                    {record.display_name}
                                                </a>
                                            );
                                        }}
                                    />
                                    <Table.Column
                                        title="Email"
                                        dataIndex="email"
                                        key="email"
                                    />
                                    <Table.Column
                                        title="Followed At"
                                        dataIndex="created_at"
                                        key="created_at"
                                        render={(text, record) => {
                                            return moment(
                                                record.created_at
                                            ).format("YYYY-MM-DD hh:mm A");
                                        }}
                                    />
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col xs={24} md={12}>
                            
                        </Col>
                        <Col xs={24} md={12}></Col>
                    </Row>
                </>
            )}

            {showModalAddEditArtist && (
                <ModalAddEditArtist
                    showModalAddEditArtist={showModalAddEditArtist}
                    toggleShowModalAddEditArtist={toggleShowModalAddEditArtist}
                    selectedArtist={selectedArtist}
                    getArtists={getArtist}
                />
            )}
        </>
    );
};

export default PageArtistProfile;
