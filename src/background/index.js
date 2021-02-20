import ext from "utils/ext";
import { MSG_TYPE } from "utils/sendMessages";

/**
 * Define content script functions
 * @type {class}
 */
class Background {
    constructor() {
        this.init();
    }

    /**
     * Document Ready
     * @returns {void}
     */
    init = () => {
        console.log("loaded Background Scripts");

        // Add Update listener for tab
        ext.tabs.onUpdated.addListener(this.onUpdatedTab);
    };

    //TODO: Listeners
    /**
     * When changes tabs
     *
     * @param {*} tabId
     * @param {*} changeInfo
     * @param {*} tab
     */
    onUpdatedTab = (tabId, changeInfo, tab) => {
        const { url = "", status = "" } = changeInfo || {};
        if (url.indexOf("https://www.youtube.com") && status === "complete") {
            this.sendMessage(tab, MSG_TYPE.RELOADED_PAGE);
        }
    };

    /**
     * send message
     */
    sendMessage = (tab, type, data) => {
        return new Promise((resolve, reject) =>
            ext.tabs.sendMessage(tab.id, { type, data }, function (response) {
                if (ext.runtime.lastError) {
                }
                resolve(response);
            })
        );
    };
}

export const background = new Background();
