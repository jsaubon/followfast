import React, { useState } from "react";
import Text from "antd/lib/typography/Text";
import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const UploadSongImage = ({ setArtistInfo, artistInfo }) => {
    const [loadingUpload, setLoadingUpload] = useState(false);
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    function beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <div>
            {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleChange = info => {
        if (info.file.status === "uploading") {
            setLoadingUpload(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setLoadingUpload(false);
                setArtistInfo({
                    ...artistInfo,
                    song_image: imageUrl
                });
            });
        }
    };

    return (
        <>
            {/* <Text>Song Image</Text> */}

            <Upload
                name="photo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={dummyRequest}
                beforeUpload={beforeUpload}
                onChange={e => handleChange(e)}
            >
                {artistInfo.song_image ? (
                    <img
                        src={
                            artistInfo.song_image.indexOf("data:image") === -1
                                ? window.location.origin +
                                  "/" +
                                  artistInfo.song_image
                                : artistInfo.song_image
                        }
                        alt="avatar"
                        style={{ width: "170px", height: "170px" }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </>
    );
};

export default UploadSongImage;
