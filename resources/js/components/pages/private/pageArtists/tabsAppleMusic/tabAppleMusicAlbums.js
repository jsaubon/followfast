import { Avatar, message, Table, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";
import { copyToClipboard } from "../copyToClipboard";

const TabAppleMusicAlbums = ({ appleMusicAlbum, artistInfo }) => {
    return (
        <>
            {console.log("wew", appleMusicAlbum)}
            <div>
                <Title level={4}>Albums</Title>
                <Table dataSource={appleMusicAlbum} size="small">
                    <Table.Column
                        title="Album Name"
                        dataIndex="name"
                        key="name"
                        render={(text, record) => {
                            var str = record.attributes.artwork.url;
                            var res = str.split("/{w}x{h}bb.jpeg");
                            var url = res[0] + "/" + 40 + "x" + 40 + ".jpeg";

                            return (
                                <>
                                    {" "}
                                    <Avatar src={url} />{" "}
                                    {record.attributes.name}
                                </>
                            );
                        }}
                    />
                    <Table.Column
                        title="Release Date"
                        dataIndex="release_date"
                        key="release_date"
                        render={(text, record) => {
                            return <>{record.attributes.releaseDate}</>;
                        }}
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
                                            `${record.attributes.url}`
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

export default TabAppleMusicAlbums;
