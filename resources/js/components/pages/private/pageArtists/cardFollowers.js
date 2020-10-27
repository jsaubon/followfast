import { Card, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import moment from "moment";

const CardFollowers = ({ handleSearchFollower, artistInfo }) => {
    return (
        <>
            <Card className="mt-10 ">
                <Title level={4}>
                    Followers (
                    {artistInfo.artist.artist_followers
                        ? artistInfo.artist.artist_followers.length
                        : "0"}
                    )
                </Title>
                <Input.Search
                    placeholder="Search here"
                    onChange={e => handleSearchFollower(e)}
                />
                <br />
                <br />

                <div style={{ overflowX: "auto" }}>
                    <Table dataSource={artistInfo.artist.artist_followers}>
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
                            title="Followed At"
                            dataIndex="created_at"
                            key="created_at"
                            render={(text, record) => {
                                return (
                                    <div style={{ whiteSpace: "nowrap" }}>
                                        {moment(record.created_at).format(
                                            "YYYY-MM-DD hh:mm A"
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </Table>
                </div>
            </Card>
        </>
    );
};

export default CardFollowers;
