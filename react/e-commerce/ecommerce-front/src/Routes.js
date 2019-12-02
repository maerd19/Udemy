import React from "react";
// BrowserRouter is a component. It will make the props availale to other nested components
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";

const Routes = () => {
    return (
        // BrowserRouter will make the props available in all components inside of Switch
        <BrowserRouter>
            {/* Inside Switch we will have all the routes */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
