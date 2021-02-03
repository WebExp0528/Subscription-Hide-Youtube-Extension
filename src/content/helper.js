var $ = require("jquery");

export const hideSubscriptions = () => {
    $("div#secondary").attr("style", "display: none");
    $("div#meta").attr("style", "display: none");
    $("ytd-comments#comments").attr("style", "display: none");
    $(".ytd-rich-grid-renderer").attr("style", "display: none");
};
