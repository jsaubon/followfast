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
    Row,
    Col
} from "antd";
import Title from "antd/lib/typography/Title";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import ButtonGroup from "antd/lib/button/button-group";

const PageFollowers = () => {
    const { Search } = Input;
    const [followerList, setFollwerList] = useState([]);

    const userdata = JSON.parse(localStorage.userdata);

    useEffect(() => {
        getFollowers();
        return () => {};
    }, []);

    const getFollowers = () => {
        fetchData("POST", "api/artist_follower/getFollower", {}).then(res => {
            console.log("res", res);
            setFollwerList(res.data);
        });
    };

    const columns = [
        {
            title: "Platform",
            dataIndex: "platform",
            key: "platform",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["descend", "ascend"]
        },

        {
            title: "Artist Name",
            dataIndex: "artist_name",
            key: "artist_name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return (
                    <a
                        target="_blank"
                        href={
                            window.location.origin +
                            "/artist/profile/" +
                            record.user.id
                        }
                    >
                        {record.user.name}
                    </a>
                );
            }
        },

        {
            title: "Name",
            dataIndex: "display_name",
            key: "display_name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return (
                    <a target="_blank" href={record.user_url}>
                        {record.display_name}
                    </a>
                );
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ["descend", "ascend"]
        },

        {
            title: "Follow At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: (a, b) =>
                moment(a.created_at).unix() - moment(b.created_at).unix(),
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return moment(record.created_at).format("YYYY-MM-DD hh:mm A");
            }
        }
    ];

    let formAddEditUser;
    const [formSaveLoading, setFormSaveLoading] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    const handleSearch = e => {
        console.log(e.target.value);

        if (e.target.value != "") {
            let searchValue = e.target.value;
            console.log(followerList);
            const res = followerList.filter(
                item =>
                    item.display_name
                        .toLowerCase()
                        .includes(searchValue.toString().toLowerCase()) ||
                    item.platform
                        .toLowerCase()
                        .includes(searchValue.toString().toLowerCase()) ||
                    item.user.name
                        .toLowerCase()
                        .includes(searchValue.toString().toLowerCase()) ||
                    item.email
                        .toLowerCase()
                        .includes(searchValue.toString().toLowerCase())
            );

            setFollwerList(res);
        } else {
            getFollowers();
        }
    };
    return (
        <div>
            <Title levle={4}>Followers</Title>
            {userdata.role != "Artist" && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4}></Col>
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
                    dataSource={followerList}
                    pagination={false}
                    size="small"
                />
            </Card>
        </div>
    );
};

export default PageFollowers;
