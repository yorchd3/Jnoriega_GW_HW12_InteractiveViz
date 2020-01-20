// Instructions: This script needs to run on local host. Initiate python -m http.server

// Belly Button app by Jorge Noriega

// Anonymous function to pull names from json file and add them in the filter
d3.json("samples.json").then(function(data) {
    // Get names from the json
    var sampleNames = data.names;
    console.log(sampleNames);

    // Append each name in the HTML under "Test Subject ID"
    sampleNames.forEach(function(name){
        newOpt = d3.select("#selDataset").append("option").text(name);
    })
})

// 
//Instantiate optionChanged to affect Demographic Info and Charts 
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


  function chartsConstructor(x) {
  
    d3.json("samples.json").then(function(data) {
        var index = data.names.indexOf(x);

        // @TODO: Build a Bubble Chart using the sample data
        var x_values = data.samples[index].otu_ids;
        var y_values = data.samples[index].sample_values;
        var m_size = data.samples[index].sample_values;
        var m_colors = data.samples[index].otu_ids; 
        var t_values = data.samples[index].otu_labels;
    
        var trace1 = {
            x: x_values,
            y: y_values,
            text: t_values,
            mode: 'markers',
            marker: {
            color: m_colors,
            size: m_size
            } 
        };
        
        var data = [trace1];
    
        var layout = {
            xaxis: { title: "OTU ID"},
        };
    
        Plotly.newPlot('bubble', data, layout);
    })
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    chartsConstructor(newSample);
    metadataConstructor(newSample);
}