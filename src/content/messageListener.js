import { MSG_TYPE } from "utils/sendMessages";
import { hideSubscriptions } from "./helper";

export const onRequest = (request, sender, reply) => {
    if (request.type === MSG_TYPE.RELOADED_PAGE) {
        hideSubscriptions();
        reply();
    }
    if (request.type === MSG_TYPE.FORCE_RELOAD) {
        window.location.reload();
        reply();
    }
    return true;
};

export default onRequest;
