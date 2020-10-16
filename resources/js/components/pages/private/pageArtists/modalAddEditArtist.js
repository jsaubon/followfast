import { Form, Input, Modal } from "antd";
import React from "react";

const ModalAddEditArtist = ({
    showModalAddEditArtist,
    toggleShowModalAddEditArtist,
    selectedArtist
}) => {
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
                setFormSaveLoading(false);
                toggleShowModalAddEditArtist();
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
            >
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
                                message: "Name must be at least 3 characters"
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
                                required: selectedArtist ? false : true,
                                message: "Input Password"
                            }
                        ]}
                        className="mb-15"
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
                        className="mb-15"
                    >
                        <Select name="active">
                            <Select.Option value="Active">Active</Select.Option>
                            <Select.Option value="Inactive">
                                Inactive
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddEditArtist;
