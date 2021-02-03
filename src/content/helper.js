var $ = require("jquery");
import storage from "utils/storage";
const statusKey = "simpletube_status";

export const hideSubscriptions = () => {
    storage.get([statusKey], (result) => {
        if (result === undefined) {
            return;
        }
        if (result[statusKey]) {
            $("div#secondary").attr("style", "display: none");
            $("div#meta").attr("style", "display: none");
            $("ytd-comments#comments").attr("style", "display: none");
            $(".ytd-rich-grid-renderer").attr("style", "display: none");
        }
    });
};
