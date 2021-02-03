import ext from "utils/ext";
import MessageListener from "./messageListener";
import { hideSubscriptions } from "./helper.js";

var jquery = require("jquery");

ext.runtime.onMessage.addListener(MessageListener);

jquery(function () {
    hideSubscriptions();
});
