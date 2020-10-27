import React, { useEffect, useState } from "react";
import { Avatar, Card, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";

import { fetchData } from "../../../../axios";
const CardLikes = ({ handleSearchLike, match }) => {
    const [artistInfo, setArtistInfo] = useState();

    useEffect(() => {
        getArtist();

        return () => {};
    }, []);
    const getArtist = () => {
        fetchData("GET", "api/artist/" + match.params.id).then(res => {
            setArtistInfo(res.data);
            console.log("the data", res.data);
            console.log(res.data);
        });
    };

    return (
        <>
            <Card className="mt-10 ">
                <Title level={4}>
                    Likes (
                    {artistInfo
                        ? artistInfo.artist.artist_album_like.length
                        : "0"}
                    ){" "}
                </Title>
                <Input.Search
                    placeholder="Search here"
                    onChange={e => handleSearchLike(e)}
                />
                <br />
                <br />
                <div style={{ overflowX: "auto" }}>
                    <Table
                        dataSource={
                            artistInfo && artistInfo.artist.artist_album_like
                        }
                    >
                        <Table.Column
                            title="Platform"
                            dataIndex="platform"
                            key="platform"
                        />

                        <Table.Column
                            title="Name"
                            dataIndex="album_name"
                            key="album_name"
                            render={(text, record) => {
                                return (
                                    <div
                                    // style={{ whiteSpace: "nowrap" }}
                                    >
                                        {/* <Avatar src={record.album_image} />{" "} */}
                                        {record.type == "Album" ? (
                                            <a
                                                href={`https://open.spotify.com/album/${record.album_id}`}
                                            >
                                                {record.album_name}
                                            </a>
                                        ) : (
                                            <a
                                                href={`https://open.spotify.com/track/${record.album_id}`}
                                            >
                                                {record.album_name}
                                            </a>
                                        )}
                                    </div>
                                );
                            }}
                        />
                        <Table.Column
                            title="Name"
                            dataIndex="display_name"
                            key="display_name"
                            render={(text, record) => {
                                return (
                                    <a target="_blank" href={record.user_url}>
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
                            title="Type"
                            dataIndex="type"
                            key="type"
                        />
                    </Table>
                </div>
            </Card>
        </>
    );
};

export default CardLikes;
