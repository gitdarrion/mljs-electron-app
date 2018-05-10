// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// MODULES
const remote = require('electron').remote;
const dialog = remote.dialog; 
const $ = require('./node_modules/jquery/dist/jquery'); 

// NAVIGATION FUNCTIONALITY

function onClickNavButton_Datasets() {

    console.log("Datasets button clicked."); 
    $("#nav_button_models").removeClass("active");
    $("#nav_button_regression").removeClass("active");
    $("#nav_button_datasets").addClass("active");

}

function onClickNavButton_Models() {

    console.log("Models button clicked."); 
    $("#nav_button_datasets").removeClass("active");
    $("#nav_button_regression").removeClass("active");
    $("#nav_button_models").addClass("active");

}

function onClickNavButton_Regression() {
    
    console.log("Regression button clicked.");
    $("#nav_button_datasets").removeClass("active");
    $("#nav_button_models").removeClass("active");
    $("#nav_button_regression").addClass("active");

}

// BUTTON FUNCTIONALITY
function onClickButton_OpenFile() {

    // TODO: Accept 2 files: x and y | Train and Test set
    // TODO: Cast multidimensional array to Matrix.

    const { Matrix } = require('./node_modules/ml-matrix');
    var fs = require('fs');
    var csv = require('fast-csv');
    var csv_files = dialog.showOpenDialog({ 

        properties: ['openFile'], 
        filters: [{ name: "CSV", extensions: ['csv']}] 

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

    
    var matrix = Matrix(csv_data);
    console.log("Matrix: ", matrix); 
    return matrix; 
}

// jQuery
$(document).ready(function(){


    // BUTTONS
    $("#button_open_file").on("click", onClickButton_OpenFile); 

    // NAVIGATION
    $("#nav_button_datasets").on("click", onClickNavButton_Datasets); 
    $("#nav_button_models").on("click", onClickNavButton_Models);
    $("#nav_button_regression").on("click", onClickNavButton_Regression);

});

