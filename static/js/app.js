const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

const samplesData = d3.json(url);

function init() {

    samplesData.then(function(data) {

        //LIST POPULATION/////////////////////////

        let dropDownMenu = d3.select("#selDataset");

        let names = data.names;

        for (let i = 0; i < names.length; i++) {

            dropDownMenu.append("option").text(names[i]).property("value", names[i]);
        }

        let firstSubject = names[0];

        createBarchart(firstSubject);
        createBubblechart(firstSubject);

        let metadata = data.metadata;

        let sampleCurrent = metadata.filter(sample => sample.id == firstSubject);

        let metaArray = Object.entries(sampleCurrent[0]);

        let cardDemo = d3.select("#sample-metadata");

        for (let i = 0; i < metaArray.length; i++) {

            cardDemo.append("h6").text(`${metaArray[i][0]}: ${metaArray[i][1]}`).attr("id", `row${i}`);

        }
    });
}

// BAR CHART //////////////////////////////
function createBarchart(subject) {

    samplesData.then(function(data) {

        let samples = data.samples;

        let sampleCurrent = samples.filter(sample => sample.id == subject);


        let sampleValues = sampleCurrent[0].sample_values.slice(0, 10).reverse()
        let otuIds = sampleCurrent[0].otu_ids.slice(0, 10).reverse();
        let otuLabels = sampleCurrent[0].otu_labels.slice(0,10).reverse();

        let otuIdsfinal = otuIds.map(id => "OTU " + id);

        let trace1 = {
            x: sampleValues,
            y: otuIdsfinal,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        let barchartData = [trace1];

        Plotly.newPlot("bar", barchartData);

    });
}

function createBubblechart(subject) {

    samplesData.then(function(data) {

        let samples = data.samples;

        let sampleCurrent = samples.filter(sample => sample.id == subject);

        let sampleValues = sampleCurrent[0].sample_values;
        let otuIds = sampleCurrent[0].otu_ids;
        let otuLabels = sampleCurrent[0].otu_labels;

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

        let bubblechartData = [trace1];

        Plotly.newPlot("bubble", bubblechartData);

    });
}

function createMetadata(subject) {

    samplesData.then(function(data) {

        let metadata = data.metadata;

        let sampleCurrent = metadata.filter(sample => sample.id == subject);

        let metaArray = Object.entries(sampleCurrent[0]);

        let cardDemo = d3.select("#sample-metadata");

        for (let i = 0; i < metaArray.length; i++) {

            cardDemo.select(`#row${i}`).text(`${metaArray[i][0]}: ${metaArray[i][1]}`);

        }
    });
}

//Dropdown change function
function optionChanged(subject) {

    console.log("Showing results for Subject ID No.", subject);

    createBarchart(subject);
    createBubblechart(subject);
    createMetadata(subject);

}

init();