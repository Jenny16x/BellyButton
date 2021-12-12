function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleData = data.samples;
    var wfreqData = data.metadata;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = sampleData.filter(sample_id => sample_id.id == sample);
    var filteredMeta = wfreqData.filter(meta_id => meta_id.id == sample);
    // console.log(filteredSamples);
    //  5. Create a variable that holds the first sample in the array.
    // console.log(filteredSamples)
    var filteredID = filteredSamples[0];
    var filteredMetaId = filteredMeta[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    var otu_ids = filteredID.otu_ids;
    var otu_labels = filteredID.otu_labels;
    var sample_values = filteredID.sample_values;
    var wfreq = filteredMetaId.wfreq;

    // console.log(wfreq)

   // var filteredWfreq = wfreqData.filter(wfreq => wfreq.id == id);
   // var wfreq = filteredWfreq.wfreq;

//    console.log(wfreq);


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
      // first var slice then reverse then map it 
    

    var yticks = otu_ids.slice(0,10).map(ids => "OTU" +  ids).reverse();

    //console.log(otu_ids);

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),        
        type: "bar",
        orientation: "h",
      }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = { 
      title : "Top Ten Bateria Cultures Found ",
      x: "Sample Count",
      y: "OTU ID",
      showlegend: false,
      barThickness: 6,
      maxBarThickness: 8
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);


// Bar and Bubble charts
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };
    
    var bubbleData = [trace1];
    
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      showlegend: false,
      hovermode: "closest",
      height: 700,
    };
  

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubbleData, bubbleLayout);

        // 4. Create the trace for the gauge chart.
        var gaugeData = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Belly Button Washing Frequency Scrubs Per Week" },
          type: "indicator",
          mode: "gauge+number+delta",
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 2], color: "red" },  
              { range: [2, 4], color: "orange" },             
              { range: [4, 6], color: "yellow" },              
              { range: [6, 8], color: "lime" },
              { range: [8, 10], color: "green" }
           
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
          
            }
          }
        }];
        
        
        // 5. Create the layout for the gauge chart.
        var gaugeLayout = { 
          
          width: 600, 
          height: 500, 
          margin: { t: 0, b: 0 } };
    
        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot('gauge', gaugeData, gaugeLayout); 
        
      });
    }