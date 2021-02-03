import ext from "./ext";

/**
 * MSG Types
 */
export const MSG_TYPE = {
    RELOADED_PAGE: 10000000,
    GET_STATUS: 10000001,
    SET_STATUS: 10000001,
};

/**
 * Send Message to background script
 * @param { keyof MSG_TYPE } msgType
 * @param { {[string]:any} } data
 */
export const sendMessage = async (msgType, data) => {
    const msg = {
        msgType,
        data,
    };
    console.log("===== Sending Message => ", msg);
    return new Promise((resolve, reject) => {
        try {
            ext.runtime.sendMessage(msg, (response) => {
                resolve(response);
            });
        } catch (e) {
            console.log(" SendMessage Failed => ", e);
            reject(e);
        }
    });
};

export default sendMessage;
