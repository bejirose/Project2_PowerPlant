function buildCharts() {

   // Trace Data to draw horizontal barchart
  var  = [];
  var mwe = [];
  var types = [];
  var states = [];
  var barColor = [];

  d3.json("/topusplanttype_api").then((dataSet) => {
    console.log(dataSet);

    dataSet.forEach((row) => {
      names.push(row[2]); 
      mwe.push(row[1]);
      types.push(row[0]);
      states.push(row[3]);
      barColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
    })

    var barData = [{
      x: types,
      y: mwe,
      text: [names, states],
      name: "Top Power Plants By Type (USA)",
      type: "bar",
      marker: {
        color: barColor
      }
    }];
    
    // Apply the group bar mode to the layout
    var layout = {
     // title: "<b>Top 10 US</b>",
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