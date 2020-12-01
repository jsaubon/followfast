import { Avatar, message, Table, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";
import { copyToClipboard } from "../copyToClipboard";

const tabAppleMusicTracks = ({ appleMusicTracksFinal, artistInfo }) => {
    return (
        <>
            <div>
                <Title level={4}>Tracks</Title>
                <Table dataSource={appleMusicTracksFinal} size="small">
                    <Table.Column
                        title="Track Name"
                        dataIndex="name"
                        key="name"
                        render={(text, record) => {
                            return <>{record.attributes.name}</>;
                        }}
                    />
                    <Table.Column
                        title="Duration"
                        dataIndex="duration_ms"
                        key="duration_ms"
                        render={(text, record) => {
                            var minutes = Math.floor(
                                record.attributes.durationInMillis / 60000
                            );
                            var seconds = (
                                (record.attributes.durationInMillis % 60000) /
                                1000
                            ).toFixed(0);
                            return (
                                minutes +
                                ":" +
                                (seconds < 10 ? "0" : "") +
                                seconds
                            );
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

export default tabAppleMusicTracks;
