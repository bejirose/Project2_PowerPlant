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


function buildPage(year){
  d3.csv('/csvdata1').then((data) => {
  
      //console.log(year);
      //console.log(data);

      function filterByYear(testData) {
        return testData.Year == year;
      }

      var filteredSample = data.filter(filterByYear);
      //console.log(filteredSample);
  
      // Build panel on right side - to see data by year

      var panel = d3.select("#sample-metadata");
  
      panel.html("");
      var keyArray = [];
      var valueArray = [];  

       var table = panel.append("table");
      Object.entries(filteredSample[0]).forEach(([key, value]) => {
        // One idea is to append header elements (h5 or h6) of the key: value
        //console.log(key);
        //console.log(value);
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

    // Create Pie Chart

      // Create the Trace
      var trace1 = {
        values: valueArray,
        labels: keyArray,
        type: "pie",
      };
  
      // Create the data array for the plot
      var data1 = [trace1];
  
      // Define the plot layout
      var layout1 = {
        title: `Primary Energy by Type [${year}]`,
        height: 450,
        width: 700,
        paper_bgcolor: "#2b3752",
        font: {color: '#9f9f9f'}
      };
  
      // Plot the chart to a div tag with id "pie"
      Plotly.newPlot("pie", data1, layout1);


      // Create Line Chart

      var traces = [];
      var len = 0;
      //console.log (data.length);
      var years = [];
      var coal = [];
      var oil = [];
      var gas = [];
      var hydropower = [];
      var nuclear = [];
      var solar = [];
      var other = [];
      var traditional_biomas = [];
      var wind = [];
      var biofuels = [];


      data.forEach(buildTraceArrays); 

      function buildTraceArrays(year, index) 
      { 
          //console.log(index, year); 
          //len = Object.keys(year).length;
          //var endYear = new Date(year['Year'], 1, 1); 
          //console.log(endYear.getFullYear());
          //year['Year'] = +year['Year'];
          years.push(year['Year']);
          coal.push(year['Coal (TWh; direct energy)']);
          oil.push(year['Oil (TWh; direct energy)']);
          gas.push(year['Gas (TWh; direct energy)']);
          hydropower.push(year['Hydropower (TWh; direct energy)']);
          nuclear.push(year['Nuclear (TWh; direct energy)']);
          solar.push(year['Solar (TWh; direct energy)']);
          other.push(year['Other renewables (TWh; direct energy)']);
          traditional_biomas.push(year['Traditional biomass (TWh; direct energy)']);
          wind.push(year['Wind (TWh; direct energy)']);
          biofuels.push(year['Biofuels (TWh; direct energy)']);
          
      }

      //console.log(years);
      //console.log(oil.length);

      // Create the Traces
      var trace1 = {
        y: coal,
        x: years,
        type: "scatter",
        name: 'coal'
      };
      var trace2 = {
        y: oil,
        x: years,
        type: "scatter",
        name: 'oil'
      };
      var trace3 = {
        y: gas,
        x: years,
        type: "scatter",
        name: 'gas'
      };
      var trace4 = {
        y: hydropower,
        x: years,
        type: "scatter",
        name: 'hydropower'
      };
      var trace5 = {
        y: nuclear,
        x: years,
        type: "scatter",
        name: 'nuclear'
      };
      var trace6 = {
        y: solar,
        x: years,
        type: "scatter",
        name: 'solar'
      };
      var trace7 = {
        y: other,
        x: years,
        type: "scatter",
        name: 'other'
      };
      var trace8 = {
        y: traditional_biomas,
        x: years,
        type: "scatter",
        name: 'traditional_biomas'
      };
      var trace9 = {
        y: wind,
        x: years,
        type: "scatter",
        name: 'wind'
      };
      var trace10 = {
        y: biofuels,
        x: years,
        type: "scatter",
        name: 'biofuels'
      };
  
      // Create the data array for the plot
      var data1 = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10];
  
      // Define the plot layout
      var layout1 = {
        //title: `Primary Energy by Type & Year`,
        height: 600,
        width: 1100,
        paper_bgcolor: "#2b3752",
        plot_bgcolor: "rgb(30, 30,30)",
        font: {color: '#9f9f9f'},
        title: {
          text:'Primary Energy by Type & Year',
          font: {
            //family: 'Courier New, monospace',
            size: 24
          },
          xref: 'paper',
          //x: 0.05,
        },
        xaxis: {
          title: {
            text: 'Years',
            font: {
              //family: 'Courier New, monospace',
              size: 18,
              //color: '#7f7f7f'
            },
            type: 'date'
          },
        },
        yaxis: {
          title: {
            text: 'Terawatt Hours (TWH/yr)',
            font: {
              //family: 'Courier New, monospace',
              size: 18,
              //color: '#7f7f7f'
            }
          }
        },
        updatemenus: [{
          y: 1,
          yanchor: 'top',
          buttons: [{
              method: 'restyle',
              args: ['visible', [true, true, true, true, true, true, true, true, true, true]],
              label: 'All Categories'
          }, {
              method: 'restyle',
              args: ['visible', [true, false, false, false, false, false, false, false, false, false]],
              label: data1[0]['name']
          }, {
              method: 'restyle',
              args: ['visible', [false, true, false, false, false, false, false, false, false, false]],
              label: data1[1]['name']
          }, {
              method: 'restyle',
              args: ['visible', [false, false, true, false, false, false, false, false, false, false]],
              label: data1[2]['name']
            }, {
              method: 'restyle',
              args: ['visible', [false, false, false, true, false, false, false, false, false, false]],
              label: data1[3]['name']
          }, {
              method: 'restyle',
              args: ['visible', [false, false, false, false, true, false, false, false, false, false]],
              label: data1[4]['name']
          }, {
              method: 'restyle',
              args: ['visible', [false, false, false, false, false, true, false, false, false, false]],
              label: data1[5]['name']
            }, {
              method: 'restyle',
              args: ['visible', [false, false, false, false, false, false, true, false, false, false]],
              label: data1[6]['name']
            }, {
              method: 'restyle',
              args: ['visible', [false, false, false, false, false, false, false, true, false, false]],
              label: data1[7]['name']
          }, {
              method: 'restyle',
              args: ['visible', [false, false, false, false, false, false, false, false, true, false]],
              label: data1[8]['name']
          }, {
              method: 'restyle',
              args: ['visible', [false, false, false, false, false, false, false, false, false, true]],
              label: data1[9]['name']
          }]
        }]
      };

      function makeTrace(i) {
        return {
          x: years,  
          y: data1[i]['y'],
            // line: {
            //   shape: 'spline' ,
            //   color: 'red'
            // },
            //visible: i === 0,
            name: data1[i]['name']
        };
    }
      // Plot the chart to a div tag with id "bar"
      Plotly.newPlot("bar", [0,1,2,3,4,5,6,7,8,9].map(makeTrace), layout1);
    })
  }
  
  
  function init() {
  
    // Fill dropdown with IDs
    // Get firstOne id and call buildPage with that id
  
    d3.csv('/csvdata1').then((data) => {
  
  
      var selector = d3.select("#selDataset");
  
      //console.log(data);
      var count = 0;

      data.forEach((year) => {
        year['Year'] = +year['Year'];
        //console.log(year['Year'])
        count +=1;
        selector
          .append("option")
          .text(year['Year'])
          .property("value", year['Year'])
          .property("selected",year['Year'])
      })

      //console.log(count);
      firstOne = data[count-1]['Year'];
  
      buildPage(firstOne);
  
    })
  }
  
  function optionChanged(selection) {
  
    buildPage(selection);
  }
  
  
  init()