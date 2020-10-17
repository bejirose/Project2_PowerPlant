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

    d3.csv("./data/global-primary-energy.csv").then((data) => {
  
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
          year['Year'] = +year['Year'];
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
      //console.log(hydropower);

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
            }
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
          //x: data1[0],  
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

  var dataSet1 = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

$(document).ready(function() {
  $('#example').DataTable( {
      data: dataSet1,
      columns: [
          { title: "Name" },
          { title: "Position" },
          { title: "Office" },
          { title: "Extn." },
          { title: "Start date" },
          { title: "Salary" }
      ]
  } );
} );
  
  
  function init() {
  
    // Fill dropdown with IDs
    // Get firstOne id and call buildPage with that id
  
    d3.csv("./data/global-primary-energy.csv").then((data) => {
  
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