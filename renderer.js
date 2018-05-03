// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { dialog } = require('electron').remote;


// Opens file browser. 
function showOpenDialog() {
    csvFileName = dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'], filters: [{name: "CSV", extensions: ['csv']}] });
    var stream = fs.createReadStream(String(csvFileName));

    csv
        .fromStream(stream, { headers: true })
        .on("data", function (data) {
            console.log(data);
        })
        .on("end", function () {
            console.log("done");
        });
}

document.querySelector('#btnShowOpenDialog').addEventListener('click', showOpenDialog);