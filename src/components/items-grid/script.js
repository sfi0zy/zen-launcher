// -----------------------------------------------------------------------------
// ITEMS GRID
// -----------------------------------------------------------------------------


import LinkItem from '../link-item/script';

const $ = Muilessium;
const _ = $.UTILS;
const M = $.UTILS.CHROME.messages;
const S = $.UTILS.CHROME.storage;


export default class ItemsGrid extends $.FACTORY.BaseComponent {
    constructor(element, options) {
        super(element, options);

        this.linkItems = [];


        this.generateItems();

        M.onMessage(M.types.ITEMS_UPDATED, this.generateItems.bind(this));
    }

    generateItems() {
        S.loadData('items', (items) => {
            let html = '';

            for (let i = 0; i < 12; i++) {
                html += LinkItem.getHtmlTemplate();
            }

            this.domCache.element.innerHTML = html;

            const elements = this.domCache.element.querySelectorAll('.ui-link-item');

            for (let i = 0; i < 12; i++) {
                const id = _.aria.setId(elements[i]);

                $.FACTORY.create('LinkItem', `#${id}`, items[i]);
            }
        });
    }
}

