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
            textarea: element.querySelector('.mui-textarea'),
            button:   element.querySelector('.mui-button'),
            spinner:  element.querySelector('.mui-spinner')
        });

        this.components = {
            textarea: $.get('Textarea', _.getAttribute(this.domCache.textarea, 'id')),
            button:   $.get('Button',   _.getAttribute(this.domCache.button,   'id'))
        };

        this.loadSavedItems();
        this.initEventListeners();
    }


    loadSavedItems() {
        S.loadData('items', (items) => {
            if (items) {
                this.components.textarea.setValue('');

                let value = '';

                items.forEach((item) => {
                    value += `${item.title} ${item.url}\r\n`;
                });

                this.components.textarea.setValue(value);
            }

            _.animateElement(this.domCache.spinner, 'fade-out');
        });

        return this;
    }


    saveItems() {
        _.animateElement(this.domCache.spinner, 'fade-in');

        const values = this.components.textarea.getValue().split('\n');

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

