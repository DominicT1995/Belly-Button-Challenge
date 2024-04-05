// Establish variable for d3 access to the json data
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

const samplesData = d3.json(url);

//Create the initialization function for the webpage
function init() {

    // Call the data from the .json
    samplesData.then(function(data) {

        // Select the dropdown menu from the index.html
        let dropDownMenu = d3.select("#selDataset");

        // Create names variable to access different subject ids in array
        let names = data.names;

        // Iterate through array of subject names and add each name to the dropdown menu with a corresponding value
        for (let i = 0; i < names.length; i++) {

            dropDownMenu.append("option").text(names[i]).property("value", names[i]);
        }

        // Establish first subject for page initialization
        let firstSubject = names[0];

        // Run bar chart and bubble chart functions for first subject on init
        createBarchart(firstSubject);
        createBubblechart(firstSubject);

        // Establish variable to access metadata array
        let metadata = data.metadata;

        // Filter the metadata array to access sample ids matching the firstSubject id
        let sampleCurrent = metadata.filter(sample => sample.id == firstSubject);

        // Create an array of key value pairs for metadata
        let metaArray = Object.entries(sampleCurrent[0]);

        // Select the html tag corresponding to the demographics panel
        let cardDemo = d3.select("#sample-metadata");

        // Iterate through new metadata array and create a header for each piece of metadata with a unique row id for each
        for (let i = 0; i < metaArray.length; i++) {

            cardDemo.append("h6").text(`${metaArray[i][0]}: ${metaArray[i][1]}`).attr("id", `row${i}`);

        }
    });
}

// Create a function to display the bar chart for selected subject
function createBarchart(subject) {

    // Call the data from the .json
    samplesData.then(function(data) {

        // Establish variable to access samples array
        let samples = data.samples;

        // Filter the samples array to access dropdown id matching the corresponding sample id
        let sampleCurrent = samples.filter(sample => sample.id == subject);

        // Acquire top 10 samples in the dataset for the selected subject and reverse for Plotly visualization
        let sampleValues = sampleCurrent[0].sample_values.slice(0, 10).reverse()
        let otuIds = sampleCurrent[0].otu_ids.slice(0, 10).reverse();
        let otuLabels = sampleCurrent[0].otu_labels.slice(0,10).reverse();

        // Add OTU to otuID label for axis labels
        let otuIdsfinal = otuIds.map(id => "OTU " + id);

        // Set configs for barchart
        let trace1 = {
            x: sampleValues,
            y: otuIdsfinal,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        let barchartData = [trace1];

        // Plot the barchart based on selected configs
        Plotly.newPlot("bar", barchartData);

    });
}

// Create a function to display the bubble chart for selected subject
function createBubblechart(subject) {

    // Call the data from the .json
    samplesData.then(function(data) {

        // Establish variable to access samples array
        let samples = data.samples;

        // Filter the samples array to access dropdown id matching the corresponding sample id
        let sampleCurrent = samples.filter(sample => sample.id == subject);

        // Acquire all sample values, ids, and labels for current selected subject
        let sampleValues = sampleCurrent[0].sample_values;
        let otuIds = sampleCurrent[0].otu_ids;
        let otuLabels = sampleCurrent[0].otu_labels;

        // Set configs for bubble chart
        let trace1 = {
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            text: otuLabels,
            marker: {
                color: otuIds,
                colorscale: 'Earth',
                size: sampleValues,
                sizeref: 1.4
            }
        };

        // Set layout configs for bubble chart
        let layout = {
            xaxis: {
                title: {
                    text: 'OTU',
                    font: {
                        size: 18
                    }
                }
            }
        };

        let bubblechartData = [trace1];

        // Plot the bubble chart based on selected configs
        Plotly.newPlot("bubble", bubblechartData, layout);

    });
}

// Create function to change metadata in demographic panel on subject change from init
function createMetadata(subject) {

    // Call the data from the .json
    samplesData.then(function(data) {

        // Establish variable to access metadata array
        let metadata = data.metadata;

        // Filter the samples array to access dropdown id matching the corresponding metadata id
        let sampleCurrent = metadata.filter(sample => sample.id == subject);

        // Create an array of key value pairs for metadata
        let metaArray = Object.entries(sampleCurrent[0]);

        // Select the html tag corresponding to the demographics panel
        let cardDemo = d3.select("#sample-metadata");

        // Iterate through the new metadata array and change the text based on previously set unique header ids on init
        for (let i = 0; i < metaArray.length; i++) {

            cardDemo.select(`#row${i}`).text(`${metaArray[i][0]}: ${metaArray[i][1]}`);

        }
    });
}

//Create dropdown change function
function optionChanged(subject) {

    //Log which subject ID No. is currently displaying on the page
    console.log("Showing results for Subject ID No.", subject);

    // Run all update functions on the newly selected Subject ID No.
    createBarchart(subject);
    createBubblechart(subject);
    createMetadata(subject);

}

//Initialize the webpage
init();