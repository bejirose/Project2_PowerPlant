

var dataSet = {};

function dispIDemography(id){
  console.log(id);

  var panel = d3.select("#sample-metadata");
  panel.html("");

  var panelValue = "";
  var thisData = dataSet.metadata.filter(function(item) {
       return item.id == id;
  });
 
  console.log(thisData);  // log the metadata for the chosen ID
  //iterate through the object entry to display the key/value pair in the Demographic Info from the first array
  Object.entries(thisData[0]).forEach(([key, value]) => {
        // One idea is to append header elements (h5 or h6) of the key: value
        panelValue = `${key}: ${value}` 
        panel.append("h5").text(panelValue);
        console.log(panelValue);
    });
    
  return thisData[0].wfreq;
}

function buildCharts() {

 
  // Trace Data to draw horizontal barchart
  var country = {};
  var mwe = [];
  var types = [];
  var states = [];

  d3.json("/country_api").then((dataSet) => {
    console.log(dataSet);
    dataSet.forEach((row) => {
      country[row[0]] = row[0]; 
     // mwe.push(row[1]); 
      types.push(row[0]);
      states.push(row[3]);
     
    })

    var barData = [{
      x: country,
      y: mwe,
      text: types,
      name: "Top World Plants",
      type: "bar",
    }];
    
    // Apply the group bar mode to the layout
    var layout = {
     // title: "<b>Top 10 Plants (World)</b>",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", barData, layout);
  
  })
 
}


function init() {

  // Fill dropdown with IDs
  // Get firstOne id and call buildPage with that id
  
  d3.json("/country_api").then((dataSet) => {

    var selector = d3.select("#search");

    //dataSet = data;

    //console.log(data);

    dataSet.forEach((row) => {
    //  names.push(row[2]); 
      selector
        .append("option")
        .text(row[0])
        .property("value", row[0])
    })

    firstId = "United States of America";

    buildCharts(firstId);

  })
}

function optionChanged(selection) {

  buildCharts(selection);
}


init();