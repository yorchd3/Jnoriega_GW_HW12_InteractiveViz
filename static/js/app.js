// Instructions: This script needs to run on local host. Initiate python -m http.server

// Belly Button app by Jorge Noriega

// Anonymous function to pull names from json file and add them in the filter
d3.json("samples.json").then(function(data) {
    // Get names from the json
    var sampleNames = data.names;
    // console.log(sampleNames);

    // Append each name in the HTML under "Test Subject ID"
    sampleNames.forEach(function(name){
        newOpt = d3.select("#selDataset").append("option").text(name);
    })
})


// Instantiate contructor functions with new sample name request
function optionChanged(newSample) {
    chartsConstructor(newSample);
    metadataConstructor(newSample);
}


//Construct Demographic Info Function
function metadataConstructor(val) {
    d3.json("samples.json").then(function(data) {
                
        var index = data.names.indexOf(val);
        var demographics = data.metadata[index];

        // Select HTML section to work with
        var sample_metadata = d3.select("#sample-metadata");
        //Clear existing metadata first
        sample_metadata.html("");
        // Then,  for each attribute in the object selected
        // print and append under "Demographic Info"
        Object.entries(demographics).forEach(function ([key, value]) {
            var row = sample_metadata.append("p");
            row.text(`${key}: ${value}`);
        })
    })
}

// Construct Charts Function
function chartsConstructor(x) {
    d3.json("samples.json").then(function(data) {
        var index = data.names.indexOf(x);
        console.log(data.samples[index].sample_values);
        
        // Data for the Charts
        var otu_id = data.samples[index].otu_ids;
        var topOtu = otu_id.slice(0,10);
        console.log(topOtu);
        var values = data.samples[index].sample_values;
        var topValues = values.slice(0,10);
        console.log(topValues);
        var labels = data.samples[index].otu_labels;

         // #1: Bubble Chart    
        var trace1 = {
            x: otu_id,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
            color: otu_id,
            size: values
            } 
        };
        
        var data = [trace1];

        var layout = {
            xaxis: { title: "OTU ID"},
        };
    
        Plotly.newPlot("bubble", data, layout);

        // #2 Bar Chart
        var trace2 = {
            type: 'bar',
            x: topValues.reverse(),
            y: topOtu.reverse().map(x => `OTU ${x}`),
            orientation: 'h'
        };
        
        var data2 = [trace2];
    
        var layout2 = {
            title: {
                text: "Bellybutton Biodiversity: Top 10 OTUS per person (sample)",
                y: .85
            },
            xaxis: {
                title: "Number of colonies per each OTU"
            },
            yaxis: {
                title: "OTU id number"
            }
        };
        Plotly.newPlot("bar", data2, layout2)
    })
}

