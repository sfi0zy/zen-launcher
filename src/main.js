// -----------------------------------------------------------------------------
// MAIN SCRIPT
// -----------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const $ = Muilessium;
    const _ = Muilessium.UTILS;

    Muilessium.UTILS.CHROME = {};
    Muilessium.UTILS.CHROME.messages      = require('./utils/messages').default;
    Muilessium.UTILS.CHROME.notifications = require('./utils/notifications').default;
    Muilessium.UTILS.CHROME.storage       = require('./utils/storage').default;
    Muilessium.UTILS.console              = require('./utils/console').default.client;


    function addComponents() {
        const components = require('./components/index').default;

        _.forEach(Object.keys(components), (type) => {
            $.FACTORY.registerComponent(type, components[type]);
            $.FACTORY.create(type, `.ui-${_.toLispCase(type)}`);
        });
    }


    function main() {
        addComponents();
    }


    main();
});

