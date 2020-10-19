require("./bootstrap");

import { render } from "react-dom";
import React, { useContext, useReducer } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import LayoutContent from "./components/layout/layoutContent";
import "antd/dist/antd.css";
import "./style/custom.css";
import StateProvider from "./Provider";
import Login from "./components/pages/public/login";
import PageArtist from "./components/pages/public/pageArtist";

const App = () => {
    let isLogged = localStorage.getItem("token");
    return (
        <StateProvider>
            <Router>
                <Switch>
                    <Route
                        path="/artist/:id"
                        name="artist"
                        component={isLogged ? PageArtist : Login}
                        exact
                    />
                    <Route
                        path="/"
                        name="Home"
                        component={isLogged ? LayoutContent : Login}
                    />
                    <Route
                        exact
                        path="/login"
                        name="Login Page"
                        render={props => <Login {...props} />}
                    />
                </Switch>
            </Router>
        </StateProvider>
    );
};

export default App;

render(<App />, document.getElementById("app"));
