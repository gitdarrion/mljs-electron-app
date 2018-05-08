// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// MODULES
var remote = require('electron').remote;
var dialog = remote.dialog; 
var fs = require('fs');
var csv = require('fast-csv');

// ELEMENT FUNCTIONALITY

function onClickButtonOpenFile() {

    // TODO: Limit the number of files 1. 
    
    var csv_files = dialog.showOpenDialog({ 

        properties: ['openFile', 'openDirectory', 'multiSelections'], 
        filters: [{ name: "CSV", extensions: ['csv'] }] 

    }); // List of file names.
    
    var csv_file = csv_files[0]; // If multiple files selected, get name of first one.
    var csv_data = []; // Multi-dimensional array of rows and data read from file.
    var csv_row = 0; // Index of current row // Incremented after each row is read.
    var stream = fs.createReadStream(String(csv_file)); // Node.js generic pipeline for data from a file.

    csv.fromStream(stream, { headers: true })
        .on("data", function (data) {

            headers = Object.keys(data); 
            number_of_headers = Object.keys(data).length; 
            csv_data.push([]);

            for (var csv_col = 0; csv_col < number_of_headers; csv_col++) {
                csv_data[csv_row][csv_col] = data[headers[csv_col]]; 
            }

            csv_row += 1; 

        })
        .on("end", function () {

            console.log("Read ", csv_data.length, " lines from ", csv_file); 
            console.log("End."); 

        }); // The 'fast-csv' module pipeline that is engineered for processing CSV file data.
}

// ELEMENTS

var button_open_file = document.querySelector("#button_open_file");

// EVENTS

button_open_file.addEventListener("click", onClickButtonOpenFile);