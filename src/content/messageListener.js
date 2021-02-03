import { MSG_TYPE } from "utils/sendMessages";
import { hideSubscriptions } from "./helper";

export const onRequest = (request, sender, reply) => {
    if (request.type === MSG_TYPE.RELOADED_PAGE) {
        hideSubscriptions();
        reply();
    }
    return true;
};

export default onRequest;
