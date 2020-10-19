import { Card, message, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Link } from "react-router-dom";
const CardSongToDisplay = ({ artistInfo }) => {
    function copyToClipboard(str) {
        /* ——— Derived from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
               improved to add iOS device compatibility——— */
        const el = document.createElement("textarea"); // Create a <textarea> element

        let storeContentEditable = el.contentEditable;
        let storeReadOnly = el.readOnly;

        el.value = str; // Set its value to the string that you want copied
        el.contentEditable = true;
        el.readOnly = false;
        el.setAttribute("readonly", false); // Make it readonly false for iOS compatability
        el.setAttribute("contenteditable", true); // Make it editable for iOS
        el.style.position = "absolute";
        el.style.left = "-9999px"; // Move outside the screen to make it invisible
        document.body.appendChild(el); // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0 // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0) // Store selection if found
                : false; // Mark as false to know no selection existed before
        el.select(); // Select the <textarea> content
        el.setSelectionRange(0, 999999);
        document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el); // Remove the <textarea> element
        if (selected) {
            // If a selection existed before copying
            document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
            document.getSelection().addRange(selected); // Restore the original selection
        }

        el.contentEditable = storeContentEditable;
        el.readOnly = storeReadOnly;
    }

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
                            .replace(" ", "")
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
                    .replace(" ", "")
                    .toLowerCase()}`}</Text>
            </Tooltip>
            <br />
            <Link to={`/artist/${artistInfo.id}`} target="_blank">
                {">"} FollowFast Link {"<"}
            </Link>
            {/* {console.log(artistInfo)} */}
        </Card>
    );
};

export default CardSongToDisplay;
