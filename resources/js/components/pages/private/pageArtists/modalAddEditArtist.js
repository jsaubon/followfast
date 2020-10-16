import {
    Col,
    Divider,
    Form,
    Input,
    Modal,
    notification,
    Row,
    Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { fetchData } from "../../../../axios";
import UploadSongImage from "./uploadSongImage";
import FormArtistAccounts from "./formArtistAccounts";
import FormArtistSocials from "./formArtistSocials";

const ModalAddEditArtist = ({
    showModalAddEditArtist,
    toggleShowModalAddEditArtist,
    selectedArtist,
    getArtists
}) => {
    const [artistInfo, setArtistInfo] = useState(
        selectedArtist && selectedArtist.artist
            ? selectedArtist.artist
            : {
                  song_title: "",
                  song_description: "",
                  song_image: "",
                  notes: ""
              }
    );
    const [artistAccounts, setArtistAccounts] = useState(
        selectedArtist &&
            selectedArtist.artist &&
            selectedArtist.artist.artist_account
            ? selectedArtist.artist.artist_account
            : {
                  spotify_id: "",
                  apple_id: "",
                  itunes_id: "",
                  google_id: "",
                  amazon_id: "",
                  tidal_id: "",
                  Deezer_id: "",
                  microsoft_id: "",
                  napster_id: "",
                  shazam_id: "",
                  iheartradio_id: ""
              }
    );
    const [artistSocials, setArtistSocials] = useState(
        selectedArtist &&
            selectedArtist.artist &&
            selectedArtist.artist.artist_social
            ? selectedArtist.artist.artist_social
            : {
                  instagram: "",
                  facebook: "",
                  twitter: "",
                  youtube: ""
              }
    );
    let formAddEditArtist;
    const [formSaveLoading, setFormSaveLoading] = useState(false);

    const submitForm = e => {
        let data = {
            ...e,
            active: e.active == "Active" ? 1 : 0,
            role: "Artist"
        };
        let url = "api/user";
        if (e.id) {
            url = url + "/" + e.id;
        }
        setFormSaveLoading(true);
        // console.log(data, "toSend", url);

        fetchData(e.id ? "UPDATE" : "POST", url, data).then(res => {
            if (res.success) {
                saveArtist(res.data.id);
            }
        });
    };

    const saveArtist = user_id => {
        if (artistInfo.song_image == "") {
            notification.error({ message: "Please Upload Song Image" });
            setFormSaveLoading(false);
        } else if (artistInfo.song_title == "") {
            setFormSaveLoading(false);
            notification.error({ message: "Song Title is Required" });
        } else {
            let data = {
                ...artistInfo,
                user_id: user_id
            };

            let url = "api/artist";
            if (artistInfo.id) {
                url = url + "/" + artistInfo.id;
            }

            fetchData(artistInfo.id ? "UPDATE" : "POST", url, data).then(
                res => {
                    if (res.success) {
                        saveArtistAccounts(res.data.id);
                    }
                }
            );
        }
    };
    const saveArtistAccounts = artist_id => {
        let data = {
            ...artistAccounts,
            artist_id: artist_id
        };

        let url = "api/artist_account";
        if (artistAccounts.id) {
            url = url + "/" + artistAccounts.id;
        }

        fetchData(artistAccounts.id ? "UPDATE" : "POST", url, data).then(
            res => {
                if (res.success) {
                    saveArtistSocials(res.data.artist_id);
                }
            }
        );
    };

    const saveArtistSocials = artist_id => {
        let data = {
            ...artistSocials,
            artist_id: artist_id
        };

        let url = "api/artist_social";
        if (artistSocials.id) {
            url = url + "/" + artistSocials.id;
        }

        fetchData(artistSocials.id ? "UPDATE" : "POST", url, data).then(res => {
            if (res.success) {
                setFormSaveLoading(false);
                toggleShowModalAddEditArtist();
                notification.success({ message: "Artist Successfully Saved" });
                getArtists();
            }
        });
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    return (
        <>
            <Modal
                title="Artist Information"
                visible={showModalAddEditArtist}
                onOk={e => formAddEditArtist.submit()}
                onCancel={toggleShowModalAddEditArtist}
                confirmLoading={formSaveLoading}
                style={{ top: 20 }}
                okText="Save"
                width="80%"
            >
                <Row>
                    <Col xs={24} md={10}>
                        <Title level={4}>Basic Info</Title>
                        <Form
                            {...layout}
                            name="basic"
                            onFinish={e => submitForm(e)}
                            onFinishFailed={e => console.log(e)}
                            ref={e => (formAddEditArtist = e)}
                            initialValues={selectedArtist}
                        >
                            <Form.Item name="id" className="hide">
                                <Input name="id" />
                            </Form.Item>
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        min: 3,
                                        message:
                                            "Name must be at least 3 characters"
                                    }
                                ]}
                                className="mb-5"
                            >
                                <Input name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email Address is Invalid"
                                    }
                                ]}
                                className="mb-5"
                            >
                                <Input name="email" type="email" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: selectedArtist ? false : true,
                                        message:
                                            "Password must be at least 6 characters",
                                        min: 6
                                    }
                                ]}
                                className="mb-5"
                            >
                                <Input name="password" type="password" />
                            </Form.Item>
                            <Form.Item
                                label="Status"
                                name="active"
                                rules={[
                                    {
                                        required: true,
                                        message: "Select Status"
                                    }
                                ]}
                                className="mb-5"
                            >
                                <Select name="active">
                                    <Select.Option value="Active">
                                        Active
                                    </Select.Option>
                                    <Select.Option value="Inactive">
                                        Inactive
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={24} md={14}>
                        <Title level={4}>Song to Display</Title>
                        <div className="text-center">
                            <UploadSongImage
                                artistInfo={artistInfo}
                                setArtistInfo={setArtistInfo}
                            />
                        </div>
                        <Text>
                            <span style={{ color: "red" }}>*</span> Song Title
                        </Text>
                        <Input
                            name="song_title"
                            value={artistInfo.song_title}
                            onChange={e =>
                                setArtistInfo({
                                    ...artistInfo,
                                    [e.target.name]: e.target.value
                                })
                            }
                        />
                        <Text>Song Description</Text>
                        <TextArea
                            name="song_description"
                            value={artistInfo.song_description}
                            onChange={e =>
                                setArtistInfo({
                                    ...artistInfo,
                                    [e.target.name]: e.target.value
                                })
                            }
                        />
                    </Col>
                    <Col xs={24} md={10}>
                        <Title level={4}>Social Media</Title>
                        <FormArtistSocials
                            artistSocials={artistSocials}
                            setArtistSocials={setArtistSocials}
                        />
                    </Col>
                    <Col xs={24} md={14}>
                        <Title level={4}>Accounts</Title>
                        <FormArtistAccounts
                            artistAccounts={artistAccounts}
                            setArtistAccounts={setArtistAccounts}
                        />
                    </Col>
                </Row>
                <Divider />
                <Text>Notes</Text>
                <TextArea
                    name="notes"
                    value={artistInfo.notes}
                    onChange={e =>
                        setArtistInfo({
                            ...artistInfo,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Modal>
        </>
    );
};

export default ModalAddEditArtist;
