const FACTORY  = window.Muilessium.FACTORY;

export default class MyComponent extends FACTORY.BaseComponent {
    constructor(element, options) {
        super(element, options);
    }

    smile() {
        console.log(':-)');
    }
}

