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

const PageUsers = () => {
    const { Search } = Input;
    const [usersList, setUsersList] = useState([]);
    const [showModalAddEditUser, setShowModalAddEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const toggleShowModalAddEditUser = record => {
        setSelectedUser(record);
        setShowModalAddEditUser(!showModalAddEditUser);
    };

    const userdata = JSON.parse(localStorage.userdata);

    useEffect(() => {
        getUsers();
        return () => {};
    }, []);

    const getUsers = () => {
        fetchData("GET", "api/user?role=Admin").then(res => {
            // console.log("res", res);
            setUsersList(res.data);
        });
    };

    const handleDeleteUser = record => {
        fetchData("DELETE", "api/user/" + record.id).then(res => {
            if (res.success) {
                notification.success({ message: "User Successfully Deleted!" });
                getUsers();
            }
        });
    };

    const columns = [
        {
            title: "Name",
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
            title: "Role",
            dataIndex: "role",
            key: "role",
            sorter: (a, b) => a.role.localeCompare(b.role),
            sortDirections: ["descend", "ascend"]
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            sorter: (a, b) => a.active.localeCompare(b.active),
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
                            <Button
                                size="small"
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={e =>
                                    toggleShowModalAddEditUser({
                                        ...record,
                                        active: record.active
                                            ? "Active"
                                            : "Inactive"
                                    })
                                }
                            >
                                Edit
                            </Button>
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
                                            handleDeleteUser(record)
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

    let formAddEditUser;
    const [formSaveLoading, setFormSaveLoading] = useState(false);

    const submitForm = e => {
        let data = {
            ...e,
            active: e.active == "Active" ? 1 : 0,
            role: "Admin"
        };
        let url = "api/user";
        if (e.id) {
            url = url + "/" + e.id;
        }
        setFormSaveLoading(true);
        // console.log(data, "toSend", url);

        fetchData(e.id ? "UPDATE" : "POST", url, data).then(res => {
            if (res.success) {
                setFormSaveLoading(false);
                toggleShowModalAddEditUser();
                getUsers();
            }
        });
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    const handleSearch = e => {
        console.log(e.target.value);
        fetchData("POST", "api/user/search", {
            search: e.target.value
        }).then(res => {
            if (res.success) {
                console.log(res);

                setUsersList(res.data);
            }
        });
    };
    return (
        <div>
            <Title levle={4}>Users</Title>
            {userdata.role != "Artist" && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                        <Button
                            type="primary"
                            onClick={e => toggleShowModalAddEditUser()}
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

            {showModalAddEditUser && (
                <Modal
                    title="User Information"
                    visible={showModalAddEditUser}
                    onOk={e => formAddEditUser.submit()}
                    onCancel={toggleShowModalAddEditUser}
                    confirmLoading={formSaveLoading}
                    style={{ top: 20 }}
                    okText="Save"
                >
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={e => submitForm(e)}
                        onFinishFailed={e => console.log(e)}
                        ref={e => (formAddEditUser = e)}
                        initialValues={selectedUser}
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
                            className="mb-15"
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
                            className="mb-15"
                        >
                            <Input name="email" type="email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: selectedUser ? false : true,
                                    message: "Input Password"
                                }
                            ]}
                            className="mb-15"
                        >
                            <Input name="password" type="password" />
                        </Form.Item>
                        {/* 
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: "Select Role"
                                }
                            ]}
                            className="mb-15"
                        >
                            <Select name="role">
                                <Select.Option value="Admin">
                                    Admin
                                </Select.Option>
                                <Select.Option value="Artist">
                                    Artist
                                </Select.Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item
                            label="Status"
                            name="active"
                            rules={[
                                {
                                    required: true,
                                    message: "Select Status"
                                }
                            ]}
                            className="mb-15"
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
                </Modal>
            )}
        </div>
    );
};

export default PageUsers;
