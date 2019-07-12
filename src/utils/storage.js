// -----------------------------------------------------------------------------
// WRAPPER FOR CHROME STORAGE
// -----------------------------------------------------------------------------


function saveData(field, data, callback) {
    if (chrome && chrome.storage) {
        chrome.storage.sync.set({
            [field]: JSON.stringify(data)
        }, callback);
    }
}


function loadData(field, callback) {
    if (chrome && chrome.storage) {
        chrome.storage.sync.get(field, (items) => {
            if (!items || !items[field]) {
                callback(undefined);
            }

            callback(JSON.parse(items[field]));
        });
    }
}


const storage = {
    saveData,
    loadData
};


export default storage;

