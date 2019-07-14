// -----------------------------------------------------------------------------
// LINK ITEM
// -----------------------------------------------------------------------------


const $ = Muilessium;
const _ = $.UTILS;


export default class LinkItem extends $.FACTORY.BaseComponent {
    static getHtmlTemplate() {
        return `<a class='ui-link-item' target='_blank'>
                    <span class='firstletter _allow-empty'></span>
                    <span class='title _allow-empty'></span>
                </a>`;
    }


    constructor(element, options = { url: '', title: '' }) {
        super(element, options);

        this.domCache = _.extend(this.domCache, {
            firstletter: element.querySelector('.firstletter'),
            title:       element.querySelector('.title')
        });

        this.state = _.extend(this.state, {
            url:   options.url,
            title: options.title
        });

        this.updateHtml();
    }


    updateHtml() {
        _.setAttribute(this.domCache.element, 'href', this.state.url);

        if (this.state.url && this.state.title) {
            _.removeClass(this.domCache.element, '-inactive');
            _.addClass(this.domCache.element,    '-active');

            this.domCache.firstletter.innerHTML = this.state.title[0];
            this.domCache.title.innerHTML       = this.state.title;
        } else {
            _.removeClass(this.domCache.element, '-active');
            _.addClass(this.domCache.element,    '-inactive');

            this.domCache.firstletter.innerHTML = '';
            this.domCache.title.innerHTML       = '';
        }

        return this;
    }
}

