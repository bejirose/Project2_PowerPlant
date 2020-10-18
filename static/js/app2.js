// Plan

// init function 
// 1) Fill out dropdown with all of the ids
// 2) Calls a buildPage function that draws the chart and the panel for the first one

// buildPage function 
// 1) That takes one parameter, which is the subject ID
// 2) Draws our plotly charts and fills the panel

// Need an event listener for the dropdown
// optionChanged function
// - That takes as a parameter the user selection


function buildPage(year, countrySelected){

    d3.csv("/csvdata4").then((data) => {
  
      //console.log(year);
      //console.log(countrySelected);

      function filterByYear(testData) {
        return testData.Year == year;
      }
      function filterByCountry(testData) {
        return testData.Entity == countrySelected;
      }

      var filteredSample = data.filter(filterByYear);
      //console.log(filteredSample);
      var filteredSample2 = filteredSample.filter(filterByCountry);
      if (!Array.isArray(filteredSample2) || !filteredSample2.length) {
        // array does not exist, is not an array, or is empty; do not attempt to process array, load default array
        countrySelected = "World";
        filteredSample2 = filteredSample.filter(filterByCountry);
      }
      //console.log(filteredSample2);
  
      // Build panel on right side - to see data by year

      var panel = d3.select("#sample-metadata");
  
      panel.html("");
      var keyArray = [];
      var valueArray = [];  

       var table = panel.append("table");
      Object.entries(filteredSample2[0]).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        if (key != "Year"){
            keyArray.push(key);
            valueArray.push(parseInt(value));
        }

        var row = table.append("tr");
        var cell1 = row.append("td");
        cell1.text(key);
        var cell2 = row.append("td");
        cell2.text(value);

        d3.selectAll('table').selectAll('td').style("color", "#adafae");
        d3.selectAll('table').selectAll('td:last-child').style("color", "white");
      })
      //console.log(keyArray);
      //console.log(valueArray);
    
    // Create Choropleth Map

    var code = [];
    var kwh = [];
    var country = [];

    filteredSample.forEach(buildTraceArrays); 

    function buildTraceArrays(row, index) 
    { 
      if (row['Code'] != ""){
        code.push(row['Code']);
        kwh.push(row['Energy consumption per capita (kWh)']);
        country.push(row['Entity']);     
      }   
    }

    //console.log(code);
    //console.log(kwh);
    //console.log(country);

    
    var data = [{
      type: "choroplethmapbox", name: "countries", geojson: "/csvdata5", 
      locations: code,
      z: kwh,
      zmin: 0, 
      zmax: 210000, 
      colorbar: {y: 0, yanchor: "bottom", title: {text: "Countries", side: "right"}}}
      ];
     
     var layout = {mapbox: {style: "dark", center: {lon: -110, lat: 50}, zoom: 1}, width: 1200, height: 500, margin: {t: 0, b: 0}};
     
     var config = {mapboxAccessToken: "pk.eyJ1IjoiYWRlc2FpMTk3MyIsImEiOiJja2ZxNHBqcDIwMXUxMnBsc2oxZHU4Nmw5In0.CziZquIPZ5FA-ebmkkDMFg"};
     
     Plotly.newPlot('bar', data, layout, config);

    })
  }

  
  function init() {
  
    // Fill dropdown with IDs
    // Get firstOne id and call buildPage with that id
  
    d3.csv("/csvdata4").then((data) => {
  
      var selector = d3.select("#selDataset");
      var selector2 = d3.select("#selDataset2");
  
      //console.log(data);
      var count = 0;
      var yearArray = [];
      var countryArray =[];

      data.forEach((year) => {
        year['Year'] = +year['Year'];
        if (yearArray.includes(year['Year'])){
          //skip
        } else {
          //console.log(year['Year'])
          count +=1;
          yearArray.push(year['Year'])
          selector
            .append("option")
            .text(year['Year'])
            .property("value", year['Year'])
            .property("selected",year['Year'])
        }
        if (countryArray.includes(year['Entity'])){
          //skip
        } else {
          countryArray.push(year['Entity'])
          selector2
          .append("option")
          .text(year['Entity'])
          .property("value", year['Entity'])
          .property("selected",year['Entity'])
        }
      })

      var options = $("#selDataset" + " option").toArray();
      options.sort(function(a, b) {
        let aa = a.textContent;
        let bb = b.textContent;
        if (aa.toUpperCase() > bb.toUpperCase()) return 1;
        else if (aa.toUpperCase() < bb.toUpperCase()) return -1;
        else return 0;
      });
      $("#selDataset").empty().append( options );

      var options = $("#selDataset2" + " option").toArray();
      options.sort(function(a, b) {
        let aa = a.textContent;
        let bb = b.textContent;
        if (aa.toUpperCase() > bb.toUpperCase()) return 1;
        else if (aa.toUpperCase() < bb.toUpperCase()) return -1;
        else return 0;
      });
      $("#selDataset2").empty().append( options );

      //console.log(count);
      firstOne = data[count-1]['Year'];

      //console.log(count);
      firstOne = data[count-1]['Year'];
      var yearSelect = document.getElementById("selDataset").value; 
      var countrySelect = document.getElementById("selDataset2").value; 
  
      //buildPage(firstOne);
      buildPage(yearSelect, countrySelect);
  
    })
}
  
  function optionChanged(selection) {
  
    var yearSelect = document.getElementById("selDataset").value; 
    var countrySelect = document.getElementById("selDataset2").value; 
    //console.log("Selection changed");
    //console.log(yearSelect, countrySelect);
    buildPage(yearSelect, countrySelect);
  }
  
  
  init()