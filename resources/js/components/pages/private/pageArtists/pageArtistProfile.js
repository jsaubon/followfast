import {
    BackwardOutlined,
    EditOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LeftOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Row,
    Divider,
    Tag,
    Table,
    Input,
    Tabs,
    Avatar,
    Tooltip,
    message,
    notification
} from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";
import ModalAddEditArtist from "./modalAddEditArtist";
import CardSongToDisplay from "./cardSongToDisplay";
import moment from "moment";
import SpotifyWebApi from "spotify-web-api-js";
import { copyToClipboard } from "./copyToClipboard";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const artistInfo = localStorage.artist ? JSON.parse(localStorage.artist) : "";
const clientId = "09f5bed2a09e492e93979f2a45b90d39";
const redirectUri = `${window.location.origin}/platform/spotify/callback`;
const scopes = [
    // "user-follow-read",
    "user-follow-modify",
    // "user-library-read",
    "user-library-modify",
    "user-read-email"
];

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
            if (localStorage.spotify_token) {
                getSpotifyAlbums(location.artist);
            }
        } else {
            getArtist();
        }

        return () => {};
    }, []);
    const getArtist = () => {
        fetchData("GET", "api/artist/" + match.params.id).then(res => {
            setArtistInfo(res.data);
            console.log("the data", res.data);
            if (localStorage.spotify_token) {
                getSpotifyAlbums(res.data);
            }
        });
    };
    useEffect(() => {
        console.log(artistInfo);
        if (artistInfo) {
            // console.log(artistInfo.artist.artist_account.spotify_id);
            // var spotifyApi = new SpotifyWebApi();
            // spotifyApi
            //     .getArtistAlbums(artistInfo.artist.artist_account.spotify_id)
            //     .then(res => {
            //         console.log(res);
            //     });
        }

        return () => {};
    }, [artistInfo]);

    const handleSearchFollower = e => {
        fetchData(
            "GET",
            `api/artist_follower/${artistInfo.artist.id}?search=${e.target.value}`
        ).then(res => {
            if (res.success) {
                setArtistInfo({
                    ...artistInfo,
                    artist: { ...artistInfo.artist, artist_followers: res.data }
                });
            }
        });
    };

    const handleSearchLike = e => {
        fetchData(
            "GET",
            `api/artist_album_like/${artistInfo.artist.id}?search=${e.target.value}`
        ).then(res => {
            if (res.success) {
                console.log(res);
                setArtistInfo({
                    ...artistInfo,
                    artist: {
                        ...artistInfo.artist,
                        artist_album_like: res.data
                    }
                });
            }
        });
    };

    function tabCallback(key) {
        console.log(key);
    }

    const loginToSpotify = () => {
        localStorage.back_location = window.location.href;
        window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
        )}&response_type=token&show_dialog=false`;
    };
    const [spotifyAlbums, setSpotifyAlbums] = useState([]);
    const getSpotifyAlbums = artistInfo => {
        console.log(artistInfo.artist.artist_account.spotify_id);
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(localStorage.spotify_token);
        spotifyApi
            .getArtistAlbums(artistInfo.artist.artist_account.spotify_id, {
                limit: 50
            })
            .then(res => {
                console.log(res.items);
                setSpotifyAlbums(res.items);
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem("spotify_token");
                notification.error({ message: "Spotify Token Expired" });
                getArtist();
            });
    };
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
                                <Title level={3}>
                                    Artist Information
                                    <Button
                                        type="link"
                                        onClick={e =>
                                            toggleShowModalAddEditArtist(
                                                artistInfo
                                            )
                                        }
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
                                <Title level={4}>Albums</Title>
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={tabCallback}
                                >
                                    <Tabs.TabPane tab="Spotify" key="1">
                                        {!localStorage.spotify_token ? (
                                            <Button
                                                onClick={e => loginToSpotify()}
                                            >
                                                Signin to Spotify
                                            </Button>
                                        ) : (
                                            <>
                                                <Table
                                                    dataSource={spotifyAlbums}
                                                    size="small"
                                                >
                                                    <Table.Column
                                                        title="Album Name"
                                                        dataIndex="name"
                                                        key="name"
                                                        render={(
                                                            text,
                                                            record
                                                        ) => {
                                                            return (
                                                                <>
                                                                    <Avatar
                                                                        src={
                                                                            record
                                                                                .images[0]
                                                                                .url
                                                                        }
                                                                    />{" "}
                                                                    {
                                                                        record.name
                                                                    }
                                                                </>
                                                            );
                                                        }}
                                                    />
                                                    <Table.Column
                                                        title="Release Date"
                                                        dataIndex="release_date"
                                                        key="release_date"
                                                    />

                                                    <Table.Column
                                                        title="Link"
                                                        dataIndex="link"
                                                        key="link"
                                                        render={(
                                                            text,
                                                            record
                                                        ) => {
                                                            return (
                                                                <Tooltip
                                                                    title="Click to Copy to Clipboard"
                                                                    onClick={e => {
                                                                        message.success(
                                                                            "Link Copied to Clipboard"
                                                                        );
                                                                        copyToClipboard(
                                                                            `${window.location.origin}/artist/${artistInfo.id}/album/${record.id}`
                                                                        );
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            cursor:
                                                                                "pointer",
                                                                            color:
                                                                                "blue"
                                                                        }}
                                                                    >
                                                                        Click
                                                                        here to
                                                                        Copy
                                                                        Link
                                                                    </Text>
                                                                </Tooltip>
                                                            );
                                                        }}
                                                    />
                                                </Table>
                                                <br />
                                                <Button
                                                    onClick={e => {
                                                        localStorage.removeItem(
                                                            "logged_spotify_id"
                                                        );
                                                        localStorage.removeItem(
                                                            "spotify_token"
                                                        );
                                                        getArtist();
                                                    }}
                                                >
                                                    Logout to Spotify
                                                </Button>
                                            </>
                                        )}
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Apple Music" key="2">
                                        Content of Tab Pane 2
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="iTunes" key="3">
                                        Content of Tab Pane 3
                                    </Tabs.TabPane>
                                </Tabs>
                            </Card>
                            <Card className="mt-10 ">
                                <Title level={4}>Followers</Title>
                                <Input.Search
                                    placeholder="Search here"
                                    onChange={e => handleSearchFollower(e)}
                                />
                                <br />
                                <br />
                                <Table
                                    dataSource={
                                        artistInfo.artist.artist_followers
                                    }
                                >
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
                            <Card className="mt-10 ">
                                <Title level={4}>Likes</Title>
                                <Input.Search
                                    placeholder="Search here"
                                    onChange={e => handleSearchLike(e)}
                                />
                                <br />
                                <br />
                                <Table
                                    dataSource={
                                        artistInfo.artist.artist_album_like
                                    }
                                >
                                    <Table.Column
                                        title="Platform"
                                        dataIndex="platform"
                                        key="platform"
                                    />
                                    <Table.Column
                                        title="Album Image"
                                        dataIndex="album_image"
                                        key="album_image"
                                        render={(text, record) => {
                                            return (
                                                <img
                                                    src={record.album_image}
                                                    style={{
                                                        width: "50px",
                                                        borderRadius: "12px"
                                                    }}
                                                ></img>
                                            );
                                        }}
                                    />
                                    <Table.Column
                                        title="Album Name"
                                        dataIndex="album_name"
                                        key="album_name"
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
                                        title="Likes At"
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
                        <Col xs={24} md={12}></Col>
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
