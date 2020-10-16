import { Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";

const FormArtistSocials = ({ artistSocials, setArtistSocials }) => {
    return (
        <Row>
            <Col xs={24} md={24}>
                <Text>Instagram</Text>
                <Input
                    name="instagram"
                    value={artistSocials.instagram}
                    onChange={e =>
                        setArtistSocials({
                            ...artistSocials,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={24}>
                <Text>Facebook</Text>
                <Input
                    name="facebook"
                    value={artistSocials.facebook}
                    onChange={e =>
                        setArtistSocials({
                            ...artistSocials,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={24}>
                <Text>Twitter</Text>
                <Input
                    name="twitter"
                    value={artistSocials.twitter}
                    onChange={e =>
                        setArtistSocials({
                            ...artistSocials,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={24}>
                <Text>Youtube</Text>
                <Input
                    name="youtube"
                    value={artistSocials.youtube}
                    onChange={e =>
                        setArtistSocials({
                            ...artistSocials,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
        </Row>
    );
};

export default FormArtistSocials;
