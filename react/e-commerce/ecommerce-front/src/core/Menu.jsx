import React from "react";
import { Link, withRouter } from "react-router-dom";

// history will hold the path of an URI
const isActive = (history, path) => (history.location.pathname === path) ? { color: "#f90" } : { color: "#fff" };

// we can access to history through the props that come from react-router-dom because we use withRouter
const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                >
                    Signin
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                >
                    Signup
                </Link>
            </li>
        </ul>
    </div>
);

export default withRouter(Menu);