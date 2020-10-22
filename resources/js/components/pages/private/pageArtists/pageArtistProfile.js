import {
    BackwardOutlined,
    EditOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LeftOutlined,
    LoginOutlined,
    LogoutOutlined,
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
import { Tab } from "bootstrap";
import TabSpotifyAlbums from "./tabsSpotify/tabSpotifyAlbums";
import TabSpotifyTracks from "./tabsSpotify/tabSpotifyTracks";
import CardFollowers from "./cardFollowers";
import CardLikes from "./cardLikes";
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
        console.log("wew", artistInfo.artist.artist_account.spotify_id);
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(localStorage.spotify_token);
        spotifyApi
            .getArtistAlbums(artistInfo.artist.artist_account.spotify_id, {
                limit: 50
            })
            .then(res => {
                // console.log(res.items);
                setSpotifyAlbums(res.items);
                getSpotifyTracks(res.items);
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem("spotify_token");
                notification.error({ message: "Spotify Token Expired" });
                getArtist();
            });
    };

    const [allTracks, setAllTracks] = useState([]);
    const [mergeTrack, setMergeTrack] = useState([]);
    const getSpotifyTracks = albums => {
        var albumsId = [];
        albums.map(res => {
            albumsId.push(res.id);
        });

        albumsId.map(id => {
            var spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(localStorage.spotify_token);
            spotifyApi
                .getAlbum(id)
                .then(data => {
                    return data.tracks.items.map(function(t) {
                        return t.id;
                    });
                })
                .then(trackIds => {
                    return spotifyApi.getTracks(trackIds);
                })
                .then(tracksInfo => {
                    let a = [];
                    tracksInfo.tracks.forEach(element => {
                        a.push(element);
                    });
                    setAllTracks(a);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    };

    useEffect(() => {
        let a = [];
        allTracks.map(element => {
            a.push(element);
        });
        setMergeTrack(mergeTrack.concat(a));
    }, [allTracks]);

    return (
        <>
            <Title levle={4}>Artist Profile</Title>
            {/* {console.log("allTrack", mergeTrack)} */}
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
                                <Tabs
                                    tabPosition="left"
                                    // type="card"
                                    defaultActiveKey="1"
                                    onChange={tabCallback}
                                >
                                    <Tabs.TabPane tab="Spotify" key="1">
                                        {!localStorage.spotify_token ? (
                                            <Button
                                                type="primary"
                                                icon={<LoginOutlined />}
                                                onClick={e => loginToSpotify()}
                                            >
                                                Signin to Spotify
                                            </Button>
                                        ) : (
                                            <>
                                                <Tabs defaultActiveKey="tab_spotify_1">
                                                    <Tabs.TabPane
                                                        tab="Albums"
                                                        key="tab_spotify_1"
                                                    >
                                                        <TabSpotifyAlbums
                                                            spotifyAlbums={
                                                                spotifyAlbums
                                                            }
                                                            artistInfo={
                                                                artistInfo
                                                            }
                                                        />
                                                    </Tabs.TabPane>
                                                    <Tabs.TabPane
                                                        tab="Tracks"
                                                        key="tab_spotify_2"
                                                    >
                                                        <Title level={4}>
                                                            <TabSpotifyTracks
                                                                mergeTrack={
                                                                    mergeTrack
                                                                }
                                                                artistInfo={
                                                                    artistInfo
                                                                }
                                                            />
                                                        </Title>
                                                    </Tabs.TabPane>
                                                </Tabs>
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
                            <CardFollowers
                                handleSearchFollower={handleSearchFollower}
                                artistInfo={artistInfo}
                            />
                            <CardLikes
                                handleSearchLike={handleSearchLike}
                                artistInfo={artistInfo}
                            />
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
