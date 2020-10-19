import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";
import {
    notification,
    Button,
    Popconfirm,
    Table,
    Divider,
    Select,
    Card,
    Modal,
    Input,
    Form,
    Avatar
} from "antd";
import Title from "antd/lib/typography/Title";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import ButtonGroup from "antd/lib/button/button-group";
import ModalAddEditArtist from "./modalAddEditArtist";
import { Link } from "react-router-dom";

const PageArtists = ({ history }) => {
    const [usersList, setArtistsList] = useState([]);
    const [showModalAddEditArtist, setShowModalAddEditArtist] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState();
    const toggleShowModalAddEditArtist = record => {
        setSelectedArtist(record);
        setShowModalAddEditArtist(!showModalAddEditArtist);
    };

    const userdata = JSON.parse(localStorage.userdata);

    useEffect(() => {
        getArtists();
        return () => {};
    }, []);

    const getArtists = () => {
        fetchData("GET", "api/user?role=Artist").then(res => {
            console.log("res", res);
            setArtistsList(res.data);
        });
    };

    const handleDeleteArtist = record => {
        fetchData("DELETE", "api/user/" + record.id).then(res => {
            if (res.success) {
                notification.success({
                    message: "Artist Successfully Deleted!"
                });
                getArtists();
            }
        });
    };

    const columns = [
        {
            title: "Artist Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Song To Display",
            dataIndex: "song_title",
            key: "song_title",
            render: (text, record) => {
                return (
                    <>
                        <Avatar
                            src={`${window.location.origin}/${record.artist.song_image}`}
                            shape="square"
                        />{" "}
                        {record.artist.song_title}
                    </>
                );
            }
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            render: (text, record) => {
                return record.active ? "Active" : "Inactive";
            }
        },
        {
            title: "Date Created",
            dataIndex: "created_at",
            key: "created_at",
            render: (text, record) => {
                return moment(record.created_at).format("YYYY-MM-DD");
            }
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            render: (text, record) => {
                return (
                    <>
                        <ButtonGroup>
                            <Link
                                to={{
                                    pathname: "/artist/profile/" + record.id,
                                    artist: record
                                }}
                            >
                                <Button
                                    size="small"
                                    type="primary"
                                    icon={<UserOutlined />}
                                >
                                    Profile
                                </Button>
                            </Link>
                            {userdata.role != "Artist" && (
                                <Button
                                    size="small"
                                    type="primary"
                                    danger
                                    icon={<DeleteOutlined />}
                                >
                                    <Popconfirm
                                        title="Are you sure delete this user?"
                                        onConfirm={e =>
                                            handleDeleteArtist(record)
                                        }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        Delete
                                    </Popconfirm>
                                </Button>
                            )}
                        </ButtonGroup>
                    </>
                );
            }
        }
    ];

    return (
        <div>
            <Title levle={4}>Artists</Title>
            {userdata.role != "Artist" && (
                <Button
                    type="primary"
                    onClick={e => toggleShowModalAddEditArtist()}
                >
                    New
                </Button>
            )}

            <Card className="mt-10">
                <Table
                    columns={columns}
                    dataSource={usersList}
                    pagination={false}
                    size="small"
                />
            </Card>

            {showModalAddEditArtist && (
                <ModalAddEditArtist
                    showModalAddEditArtist={showModalAddEditArtist}
                    toggleShowModalAddEditArtist={toggleShowModalAddEditArtist}
                    selectedArtist={selectedArtist}
                    getArtists={getArtists}
                />
            )}
        </div>
    );
};

export default PageArtists;
