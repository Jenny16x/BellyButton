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
    var sample = []
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var dropDown = d3.select("#dropdownMenu");
    //  5. Create a variable that holds the first sample in the array.
    var dataset = dropdownMenu.property("value");

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = samples.map(otu => samples.otu_ids)
    var otuLabels =samples.map(otu => samples.otu_labels)
    var sampleValues = samples.map(otu => samples.sample_values)

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // if (dataset === 'otuIds') {
    //   yData = [samples.sort((a,b) =>a.first value - b.second value)];
    // };
  
    // if (dataset === 'otuLabels') {
    //   yData = [//code for the top 10 otu labels];

    // if (dataset === 'sampleValues') {
    //   yData = [//code for the top 10 sample values];  

    // };
    var data = [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }
    ];
    
    Plotly.newPlot('myDiv', data);

    var yticks = otuIds

    // 8. Create the trace for the bar chart. 

    var trace1 = {
      x: [0,50,100,150]
      y: otuIds
    };

    var barData = [{
      x: [xData],
      y: [yData],
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Bar Graph for Belly Button Samples",
      xaxis: {title: "Samples ID" },
      yaxis: {title: "Samples Sizes"}
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    plotly.newPlot("bar-plot", barData, barLayout);
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: [xData],
      y: [yData],
    }
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = { 
      title: "Bubble Graph for Belly Button Samples",
      xaxis: {title: "Samples ID of something" },
      yaxis: {title: "Samples Sizes of something"
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout); 
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
