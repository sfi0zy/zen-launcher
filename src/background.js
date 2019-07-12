// -----------------------------------------------------------------------------
// MAIN SCRIPT FOR BACKGROUND PAGE
// -----------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    Muilessium.UTILS.CHROME = {};
    Muilessium.UTILS.CHROME.messages = require('./utils/messages').default;
    Muilessium.UTILS.CHROME.notifications = require('./utils/notifications').default;
    Muilessium.UTILS.CHROME.storage = require('./utils/storage').default;
    Muilessium.UTILS.console = require('./utils/console').default.client;
});

