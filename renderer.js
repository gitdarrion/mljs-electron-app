// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var dialog = require('electron').dialog;
var fs = require('fs');
var csv = require('fast-csv');
var csv_file_name = "";
var csv_data = [];


function loadCsvFile() {
    
    csv_file_name = dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'], filters: [{ name: "CSV", extensions: ['csv'] }] })[0];
    
    var stream = fs.createReadStream(String(csv_file_name));

    csv.fromStream(stream, { headers: true })
        .on("data", function (data) {
            console.log(data);
        })
        .on("end", function () {
            console.log("Data loaded."); 
        }); 
}