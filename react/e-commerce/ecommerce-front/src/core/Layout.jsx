// The layout will be used for the entire application
import React from "react";
import Menu from "./Menu";
import '../styles.css';

// Default values for props that are not sent
const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;