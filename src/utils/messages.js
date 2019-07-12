// -----------------------------------------------------------------------------
// WRAPPER FOR CHROME MESSAGES
// -----------------------------------------------------------------------------


const types = {
    CONSOLE_LOG: 'CONSOLE_LOG',
    ITEMS_UPDATED: 'ITEMS_UPDATED'
};


function sendMessage(type, data) {
    if (chrome && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({
            type,
            data: JSON.stringify(data)
        });
    }
}


function onMessage(type, callback) {
    if (chrome && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === type) {
                callback(message);
            }
        });
    }
}


const messages = {
    types,
    sendMessage,
    onMessage
};


export default messages;

