import { Card, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import moment from "moment";

const CardFollowers = ({handleSearchFollower, artistInfo}) => {
    return (
        <>
            <Card className="mt-10 ">
                <Title level={4}>Followers</Title>
                <Input.Search
                    placeholder="Search here"
                    onChange={e => handleSearchFollower(e)}
                />
                <br />
                <br />
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
                    <Table.Column title="Email" dataIndex="email" key="email" />
                    <Table.Column
                        title="Followed At"
                        dataIndex="created_at"
                        key="created_at"
                        render={(text, record) => {
                            return moment(record.created_at).format(
                                "YYYY-MM-DD hh:mm A"
                            );
                        }}
                    />
                </Table>
            </Card>
        </>
    );
};

export default CardFollowers;