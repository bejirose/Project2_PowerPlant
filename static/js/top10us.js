

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
  var names = [];
  var mwe = [];

  d3.json("/top10us_api").then((dataSet) => {
    console.log(dataSet);
    dataSet.forEach((row) => {
      names.push(row[0]); 
      mwe.push(row[1]); 
    })
   
    var barData = [{
      x: names,
      y: mwe,
      text: names,
      name: "Top 10 Power Plants (USA)",
      type: "bar",
    }];
    
    // Apply the group bar mode to the layout
    var layout = {
    //  title: "<b>Top 10 US</b>",
      xaxis: {
        title: {
          text: 'Plant Names',
          font: {
            //family: 'Courier New, monospace',
            size: 18
          }
        },
        automargin: true
      },
      yaxis: {
        title: {
          text: 'Plant Capacity (MWE)',
          font: {
            size: 18,
          }
        }
      },
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


buildCharts();