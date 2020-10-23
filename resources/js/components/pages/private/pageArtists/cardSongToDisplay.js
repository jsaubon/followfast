import { Card, message, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Link } from "react-router-dom";
import { copyToClipboard } from "./copyToClipboard";
const CardSongToDisplay = ({ artistInfo }) => {
    return (
        <Card className="mt-10 ">
            <img
                style={{
                    float: "left",
                    marginRight: 20,
                    width: 200,
                    height: 200
                }}
                src={`${window.location.origin}/${artistInfo.artist.song_image}`}
            />
            <Title level={3} style={{ marginBottom: 0 }}>
                Song to Display
            </Title>
            <Text>Song Title:</Text>
            <Title level={4} style={{ marginTop: 0 }}>
                {artistInfo.artist.song_title}
            </Title>
            <Text>Description: {artistInfo.artist.song_description}</Text>
            <br />
            <Text>Notes: {artistInfo.artist.notes}</Text> <br />
            <br />
            <Tooltip
                title="Click to Copy to Clipboard"
                onClick={e => {
                    message.success("Link Copied to Clipboard");
                    copyToClipboard(
                        `${
                            window.location.origin
                        }/artist/${artistInfo.artist.song_title
                            .replace(" ", "_")
                            .toLowerCase()}`
                    );
                }}
            >
                <Text
                    style={{ cursor: "pointer", color: "blue" }}
                    className=".linkref"
                >{`${
                    window.location.origin
                }/artist/${artistInfo.artist.song_title
                    .replace(" ", "_")
                    .toLowerCase()}`}</Text>
            </Tooltip>
            {/* <br />
            <Link
                to={`/artist/${artistInfo.artist.song_title
                    .replace(" ", "_")
                    .toLowerCase()}`}
                target="_blank"
            >
                {">"} WickerFollow Link {"<"}
            </Link> */}
            {/* {console.log(artistInfo)} */}
        </Card>
    );
};

export default CardSongToDisplay;
