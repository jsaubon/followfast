import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";
import PageUsers from "../pages/private/pageUsers/pageUsers";
import PageArtists from "../pages/private/pageArtists/pageArtists";

import PageArtistProfile from "../pages/private/pageArtists/pageArtistProfile";

const LayoutContent = () => {
    const { Content } = Layout;
    let userdata = JSON.parse(localStorage.userdata);
    console.log(userdata.role);
    return (
        <Layout className="layout">
            <LayoutHeader />
            <Content
                className="site-layout"
                style={{ padding: "0 50px", marginTop: 64 }}
            >
                <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 380 }}
                >
                    <Switch>
                        <Route exact path="/artists" component={PageArtists} />
                        <Route
                            exact
                            path="/artist/profile/:id"
                            component={PageArtistProfile}
                        />
                        <Route exact path="/users" component={PageUsers} />
                    </Switch>
                </div>
            </Content>
            <LayoutFooter />
        </Layout>
    );
};

export default LayoutContent;
