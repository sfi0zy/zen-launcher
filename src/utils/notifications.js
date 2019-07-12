// -----------------------------------------------------------------------------
// WRAPPER FOR CHROME NOTIFICATIONS
// -----------------------------------------------------------------------------


function notify(message) {
    if (chrome && chrome.notifications) {
        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: './images/icon128-2.png',
            title: 'Zen launcher',
            message
        });
    }
}


const notifications = {
    notify    
};


export default notifications;

