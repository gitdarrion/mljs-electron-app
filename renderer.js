// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { dialog } = require('electron').remote;
console.log(dialog);

// Opens file browser. 
function showOpenDialog() {
    dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
}

document.querySelector('#btnOpenFile').addEventListener('click', showOpenDialog);