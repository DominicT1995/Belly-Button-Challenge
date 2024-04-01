const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

const samplesData = d3.json(url);

samplesData.then(function(data) {

    //LIST POPULATION/////////////////////////
    //console.log(data.names);

    let names = data.names;

    dropDown = d3.select("#selDataset");

    for (let i = 0; i < names.length; i++) {

        dropDown.append("option").text(names[i]).property("value", names[i]);
    }

    console.log(d3.select("option").text());
    console.log(d3.select("option").attr('value'));

    // BAR CHART //////////////////////////////
    let samples = data.samples;

    //console.log(samples[0]);

    let sampleValues = samples[0].sample_values.slice(0, 10).reverse()
    let otuIds = samples[0].otu_ids.slice(0, 10).reverse();
    let otuLabels = samples[0].otu_labels.slice(0,10).reverse();

    let fixed = otuIds.map(id => "OTU " + id);

    let trace1 = {
        x: sampleValues,
        y: fixed,
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };

    let chartData = [trace1];

    Plotly.newPlot("bar", chartData);
    //BAR CHART //////////////////////////////////


});

