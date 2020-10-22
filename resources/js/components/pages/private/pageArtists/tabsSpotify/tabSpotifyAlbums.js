import { Avatar, message, Table, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";
import { copyToClipboard } from "../copyToClipboard";

const TabSpotifyAlbums = ({ spotifyAlbums, artistInfo }) => {
    return (
        <>
            <div>
                <Title level={4}>Albums</Title>
                <Table dataSource={spotifyAlbums} size="small">
                    <Table.Column
                        title="Album Name"
                        dataIndex="name"
                        key="name"
                        render={(text, record) => {
                            return (
                                <>
                                    <Avatar src={record.images[0].url} />{" "}
                                    {record.name}
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
                        render={(text, record) => {
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
                                            cursor: "pointer",
                                            color: "blue"
                                        }}
                                    >
                                        Click here to Copy Link
                                    </Text>
                                </Tooltip>
                            );
                        }}
                    />
                </Table>
            </div>
        </>
    );
};

export default TabSpotifyAlbums;
