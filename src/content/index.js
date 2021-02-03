/* global document */

import React from "react";
import ReactDOM from "react-dom";
import ext from "utils/ext";
import MessageListener from "./messageListener";

import "./content.css";
var jquery = require("jquery");

jquery(function () {
    setupContent();
});

class Main extends React.Component {
    render() {
        return <div className="my-extension"></div>;
    }
}

const setupContent = () => {
    //Setup message listener
    ext.runtime.onMessage.addListener(MessageListener);

    //Add extension root
    const app = document.createElement("div");
    app.id = "my-extension-root";
    document.body.appendChild(app);
    ReactDOM.render(<Main />, app);

    jquery("#secondary").attr("style", "display: none");
    jquery(".ytd-rich-grid-renderer").attr("style", "display: none");
};
