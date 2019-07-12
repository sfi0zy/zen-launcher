// -----------------------------------------------------------------------------
// URLS FORM
// -----------------------------------------------------------------------------

const $ = Muilessium;
const _ = Muilessium.UTILS;
const M = Muilessium.UTILS.CHROME.messages;
const N = Muilessium.UTILS.CHROME.notifications;
const S = Muilessium.UTILS.CHROME.storage;


export default class UrlsForm extends $.FACTORY.BaseComponent {
    constructor(element, options) {
        super(element, options);

        this.domCache = _.extend(this.domCache, {
            spinner: element.querySelector('.mui-spinner')
        });

        this.components = {
            textarea: $.get('Textarea', _.getAttribute(element.querySelector('.mui-textarea'), 'id')),
            button:   $.get('Button',   _.getAttribute(element.querySelector('.mui-button'),   'id'))
        };

        this.loadSavedItems();
        this.initEventListeners();
    }

    loadSavedItems() {
        S.loadData('items', (items) => {
            if (items) {
                this.components.textarea.domCache.textarea.value = '';

                let value = '';

                items.forEach((item) => {
                    value += `${item.title} ${item.url}\r\n`;
                });

                // Textareas setValue() method is not implemented yet.
                // https://github.com/sfi0zy/muilessium/issues/73
                this.components.textarea.domCache.textarea.value = value;
            }

            _.animateElement(this.domCache.spinner, 'fade-out');
        });

        return this;
    }

    saveItems() {
        _.animateElement(this.domCache.spinner, 'fade-in');

        // Don't use textarea.getValue() method due to bug.
        // https://github.com/sfi0zy/muilessium/issues/72
        const values = this.components.textarea.domCache.textarea.value.split('\n');

        const items = [];

        values.forEach((value) => {
            value = value.trim();

            if (value === '') {
                return;
            }

            const parts = value.split(' ');

            items.push({
                title: parts[0].trim(),
                url: parts[1].trim()
            });
        });

        S.saveData('items', items, () => {
            M.sendMessage(M.types.ITEMS_UPDATED, '');
            N.notify('Settings has been saved');
            _.animateElement(this.domCache.spinner, 'fade-out');

            setTimeout(() => {
                window.location.href = './popup.html';
            }, 500);
        });

        return this;
    }


    initEventListeners() {
        this.components.button.addEventListener('click', this.saveItems.bind(this));

        return this;
    }
}

