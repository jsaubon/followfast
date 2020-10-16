import { Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";

const FormArtistAccounts = ({ artistAccounts, setArtistAccounts }) => {
    return (
        <Row>
            <Col xs={24} md={8}>
                <Text>Spotify</Text>
                <Input
                    name="spotify_id"
                    value={artistAccounts.spotify_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Apple Music</Text>
                <Input
                    name="apple_id"
                    value={artistAccounts.apple_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>iTunes</Text>
                <Input
                    name="itunes_id"
                    value={artistAccounts.itunes_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Google Play/Youtube</Text>
                <Input
                    name="google_id"
                    value={artistAccounts.google_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Amazon</Text>
                <Input
                    name="amazon_id"
                    value={artistAccounts.amazon_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Tidal</Text>
                <Input
                    name="tidal_id"
                    value={artistAccounts.tidal_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Deezer</Text>
                <Input
                    name="Deezer_id"
                    value={artistAccounts.Deezer_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Microsoft Groove</Text>
                <Input
                    name="microsoft_id"
                    value={artistAccounts.microsoft_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Napster</Text>
                <Input
                    name="napster_id"
                    value={artistAccounts.napster_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>Shazam</Text>
                <Input
                    name="shazam_id"
                    value={artistAccounts.shazam_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
            <Col xs={24} md={8}>
                <Text>iHeartRadio</Text>
                <Input
                    name="iheartradio_id"
                    value={artistAccounts.iheartradio_id}
                    onChange={e =>
                        setArtistAccounts({
                            ...artistAccounts,
                            [e.target.name]: e.target.value
                        })
                    }
                />
            </Col>
        </Row>
    );
};

export default FormArtistAccounts;
