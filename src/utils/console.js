// -----------------------------------------------------------------------------
// CONSOLE REPLACEMENT
// -----------------------------------------------------------------------------


import { default as M } from './messages';


class ClientConsole {
    log(obj) {
        M.sendMessage(M.types.CONSOLE_LOG, obj);

        return this;
    }
}


class BackgroundConsole {
    constructor() {
        M.onMessage(M.types.CONSOLE_LOG, (message) => {
            window.console.log(`A-Launcher: ${message.obj}`);
        });
    }

    log(obj) {
        window.console.log(`A-Launcher: ${obj}`);

        return this;
    }
}


const console = {
    client:     new ClientConsole(),
    background: new BackgroundConsole()
};

export default console;

