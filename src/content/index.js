/* global document */

import React from "react";
import ReactDOM from "react-dom";
import ext from "utils/ext";
import MessageListener from "./messageListener";
import $ from "jquery";

import "./content.css";

$(document).ready(setupContent);

class Main extends React.Component {
    render() {
        return <div className="my-extension"></div>;
    }
}

const setupContent = () => {
    //Setup message listener
    ext.runtime.onMessage.addListener(MessageListener);

    console.log("~~~~ extension ready");

    //Add extension root
    const app = document.createElement("div");
    app.id = "my-extension-root";
    document.body.appendChild(app);
    ReactDOM.render(<Main />, app);
};
