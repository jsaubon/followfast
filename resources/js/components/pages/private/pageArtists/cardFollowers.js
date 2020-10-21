import { Card, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import moment from "moment";

const CardFollowers = ({ handleSearchFollower, artistInfo }) => {
    return (
        <>
            <Card className="mt-10 ">
                <Title level={4}>Followers</Title>
                <Input.Search
                    placeholder="Search here"
                    onChange={e => handleSearchFollower(e)}
                />
                <br />
                <br />
                <div style={{ overflowX: "auto" }}></div>
            </Card>
        </>
    );
};

export default CardFollowers;
