

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

function buildCharts(selectItem) {

  
  // Trace Data to draw horizontal barchart
  var country = {};
  var mwe = [];
  var types = [];
  var count = [];

  d3.json("/country_api").then((dataSet) => {
    dataSet.forEach((row) => {
      if (row[0] == selectItem) {
        //country[row[0]] = row[0]; 
        // mwe.push(row[1]); 
        types.push(row[1]);
        count.push(row[2]);
      }
    })

    // Create the data array for the plot
    var data = [{
      values: count,
      labels: types,
      type: "pie",
    }];

    // Define the plot layout
    var layout = {
      title: `Number of Plants by Type for <b>${selectItem}</b>`,
      height: 450,
      width: 700,
      paper_bgcolor: "#2b3752",
      font: {color: '#9f9f9f'}
    };

    // Plot the chart to a div tag with id "pie"
    Plotly.newPlot("pie", data, layout);
  
  })
 
}


function init() {

  // Fill dropdown with IDs
  // Get firstOne id and call buildPage with that id
  
  d3.json("/country_api").then((dataSet) => {

   dataSet.sort();
   
   var selector = d3.select("#search");

    //dataSet = data;

    //console.log(data);

    selector
      .append("option")
      .text("United States of America")
      .property("value", "United States of America")

      

    dataSet.forEach((row) => {
      var isExist = !!$('#search option').filter(function() {
        return $(this).attr('value').toLowerCase() == row[0].toLowerCase();
      }).length;

      if (!isExist) {
    
        selector
          .append("option")
          .text(row[0])
          .property("value", row[0])
      }
    })

    firstId = "United States of America";

    buildCharts(firstId);

  })
}

function optionChanged(selection) {

  buildCharts(selection);
}


init();