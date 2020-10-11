import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";
import PageFiles from "../pages/private/PageFiles";

const LayoutContent = () => {
    const { Content } = Layout;

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
                        <Route exact path="/files" component={PageFiles} />
                        <Route path="/" exact>
                            <Redirect to="/files" />
                        </Route>
                    </Switch>
                </div>
            </Content>
            <LayoutFooter />
        </Layout>
    );
};

export default LayoutContent;
