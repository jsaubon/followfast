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
    Avatar,
    Col,
    Row
} from "antd";
import Title from "antd/lib/typography/Title";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import ButtonGroup from "antd/lib/button/button-group";
import ModalAddEditArtist from "./modalAddEditArtist";
import { Link } from "react-router-dom";

const PageArtists = ({ history }) => {
    const { Search } = Input;
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
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["descend", "ascend"]
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ["descend", "ascend"]
        },
        {
            title: "Song To Display",
            dataIndex: "song_title",
            key: "song_title",
            sorter: (a, b) =>
                a.artist.song_title.localeCompare(b.artist.song_title),
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return (
                    <>
                        <Avatar
                            src={`${window.location.origin}/${
                                record.artist ? record.artist.song_image : ""
                            }`}
                            shape="square"
                        />{" "}
                        {record.artist ? record.artist.song_title : ""}
                    </>
                );
            }
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            sorter: (a, b) => a.active - b.active,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return record.active ? "Active" : "Inactive";
            }
        },
        {
            title: "Date Created",
            dataIndex: "created_at",
            key: "created_at",
            sorter: (a, b) =>
                moment(a.created_at).unix() - moment(b.created_at).unix(),
            sortDirections: ["descend", "ascend"],
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

    const handleSearch = e => {
        console.log(e.target.value);

        if (e.target.value != "") {
            let searchValue = e.target.value;
            const res = usersList.filter(
                item =>
                    item.name
                        .toUpperCase()
                        .includes(searchValue.toString().toUpperCase()) ||
                    item.email
                        .toString()
                        .includes(searchValue.toString().toUpperCase()) ||
                    item.artist.song_title
                        .toUpperCase()
                        .includes(searchValue.toString().toUpperCase())
            );

            setArtistsList(res);
        } else {
            getArtists();
        }
    };

    return (
        <div>
            <Title levle={4}>Artists</Title>
            {userdata.role != "Artist" && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                        {" "}
                        <Button
                            type="primary"
                            onClick={e => toggleShowModalAddEditArtist()}
                        >
                            New
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}></Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Search
                            placeholder="Search"
                            onSearch={value => console.log(value)}
                            onChange={e => handleSearch(e)}
                            size="large"
                        />
                    </Col>
                </Row>
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
