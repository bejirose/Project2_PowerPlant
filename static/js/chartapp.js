//Plot Chart.js Comsumption by Energy Type line chart

//setup variable arrays for csv data
var year = [];
var country = [];
var region = [];
var yearCountry = [];
var coal = [];
var gas = [];
var oil = [];
var biomass = [];
var hydro = [];
var nuclear = [];
var solar = [];
var wind = [];

d3.csv("./csvdata3").then((data) => {
  
    //console.log(data);

    data.forEach((entityYear) => {


        if (entityYear["Entity"] == "World") {
            //console.log(entityYear);
            year.push(parseInt(entityYear["Year"]));
            country.push(entityYear["Entity"]);
            yearCountry.push(entityYear["Entity"] + entityYear["Year"]);
            coal.push(277.78 * parseFloat(entityYear["Coal Consumption - EJ"]));
            gas.push(277.78 * parseFloat(entityYear["Gas Consumption - EJ"]));
            oil.push(277.78 * parseFloat(entityYear["Oil Consumption - EJ"]));
            biomass.push(parseFloat(entityYear["Geo Biomass Other - TWh"]));
            hydro.push(parseFloat(entityYear["Hydro Generation - TWh"])); 
            nuclear.push(parseFloat(entityYear["Nuclear Generation - TWh"]));
            solar.push(parseFloat(entityYear["Solar Generation - TWh"])); 
            wind.push(parseFloat(entityYear["Wind Generation -TWh"])); 
        }

    });

var ctx = document.getElementById('myChart1').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: year,
        datasets: [{
            label: 'Coal (EJ)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: coal,
            fill: false,
            lineTension: 0,
            pointStyle: 'circle',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 4,
            pointHoverRadius: 8,
            //borderDash: [5, 5],
            //cubicInterpolationMode: 'monotone'
        },{
            label: 'Gas (EJ)',
            backgroundColor: 'rgb(100, 200, 200)',
            borderColor: 'rgb(100, 200, 200)',
            data: gas,
            fill: false,
            lineTension: 0,
            pointStyle: 'cross',
            pointBorderColor: 'rgb(100, 200, 200)',
            pointHoverColor: 'rgb(100, 200, 200)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Oil (EJ)',
            backgroundColor: 'rgb(100, 200, 132)',
            borderColor: 'rgb(100, 200, 132)',
            data: oil,
            fill: false,
            lineTension: 0,
            pointStyle: 'cross',
            pointBorderColor: 'rgb(100, 200, 132)',
            pointHoverColor: 'rgb(100, 200, 132)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Biomass (TWh)',
            backgroundColor: '#ffa600',
            borderColor: '#ffa600',
            data: biomass,
            fill: false,
            lineTension: 0,
            pointStyle: 'crossRot',
            pointBorderColor: '#ffa600',
            pointHoverColor: '#ffa600',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Hydro(KWh)',
            backgroundColor: '#e6e600',
            borderColor: '#e6e600',
            data: hydro,
            fill: false,
            lineTension: 0,
            pointStyle: 'rect',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Nuclear (KWh)',
            backgroundColor: '#d45087',
            borderColor: '#d45087',
            data: nuclear,
            fill: false,
            lineTension: 0,
            pointStyle: 'rectRot',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Solar (KWh)',
            backgroundColor: '#665191',
            borderColor: '#665191',
            data: solar,
            fill: false,
            lineTension: 0,
            pointStyle: 'star',
            pointBorderColor: '#665191',
            pointHoverColor: '#665191',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Wind (KWh)',
            backgroundColor: '#5886a5',
            borderColor: '#5886a5',
            data: wind,
            fill: false,
            lineTension: 0,
            pointStyle: 'triangle',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 5,
            pointHoverRadius: 10,
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Global Energy Consumption',
            fontSize: 20,
            position: 'bottom',
            fontColor: "#A9A9A9",
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            labels: {
                usePointStyle: true,
                fontColor: "#A9A9A9",
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year',
                    fontSize: 18,
                    fontColor: "#A9A9A9",
                },
                ticks: {
                    fontColor: "#A9A9A9",
                    fontSize: 14,
                    //stepSize: 1,
                    //beginAtZero: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'TWh (Terawatt Hours)',
                    fontSize: 18,
                    fontColor: "#A9A9A9",
                },
                ticks: {
                    fontColor: "#A9A9A9",
                    fontSize: 14,
                    //stepSize: 1,
                    //beginAtZero: true
                }
            }]
        }
    }
});
});

//Plot Chart.js Regional line chart

var year2 = [];
var asiaPacific = [];
var northAmerica = [];
var europe = [];
var middleEast = [];
var southCentralAmerica = [];
var africa = [];

d3.csv("/csvdata2").then((data) => {
  
    //console.log(data);

    data.forEach((entityYear) => {

        //console.log(entityYear);

        if (entityYear["Entity"] == "Asia Pacific") {
            asiaPacific.push(277.78 * parseFloat(entityYear["Primary Energy Consumption"]));
            year2.push(parseInt(entityYear["Year"]));
        } else if (entityYear["Entity"] == "North America") {
            northAmerica.push(277.78 * parseFloat(entityYear["Primary Energy Consumption"]));
        } else if (entityYear["Entity"] == "Europe") {
            europe.push(277.78 * parseFloat(entityYear["Primary Energy Consumption"]));
        } else if (entityYear["Entity"] == "Middle East") {
            middleEast.push(277.78 * parseFloat(entityYear["Primary Energy Consumption"]));
        } else if (entityYear["Entity"] == "South & Central America") {
            southCentralAmerica.push(277.78 * parseFloat(entityYear["Primary Energy Consumption"]));
        } else if (entityYear["Entity"] == "Africa") {
            africa.push(277.78 * parseFloat(entityYear["Primary Energy Consumption"]));
        } else {
        }
    });

var ctx2 = document.getElementById('myChart2').getContext('2d');
var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: year2,
        datasets: [{
            label: 'Asia Pacific',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: asiaPacific,
            fill: false,
            lineTension: 0,
            pointStyle: 'circle',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 4,
            pointHoverRadius: 8,
            //borderDash: [5, 5],
            //cubicInterpolationMode: 'monotone'
        },{
            label: 'North America',
            backgroundColor: 'rgb(100, 200, 132)',
            borderColor: 'rgb(100, 200, 132)',
            data: northAmerica,
            fill: false,
            lineTension: 0,
            pointStyle: 'cross',
            pointBorderColor: 'rgb(100, 200, 132)',
            pointHoverColor: 'rgb(100, 200, 132)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Europe',
            backgroundColor: '#ffff00',
            borderColor: '#ffff00',
            data: europe,
            fill: false,
            lineTension: 0,
            pointStyle: 'crossRot',
            pointBorderColor: '#ffff00',
            pointHoverColor: '#ffff00',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Middle East',
            backgroundColor: '#ff8000',
            borderColor: '#ff8000',
            data: middleEast,
            fill: false,
            lineTension: 0,
            pointStyle: 'rect',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'South & Central America',
            backgroundColor: '#d45087',
            borderColor: '#d45087',
            data: southCentralAmerica,
            fill: false,
            lineTension: 0,
            pointStyle: 'rectRot',
            pointBorderColor: 'rgb(0, 0, 0)',
            pointHoverColor: 'rgb(0, 0, 0)',
            pointRadius: 5,
            pointHoverRadius: 10,
        },{
            label: 'Africa',
            backgroundColor: '#665191',
            borderColor: '#665191',
            data: africa,
            fill: false,
            lineTension: 0,
            pointStyle: 'star',
            pointBorderColor: '#665191',
            pointHoverColor: '#665191',
            pointRadius: 5,
            pointHoverRadius: 10,
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Global Energy Consumption by Region',
            fontSize: 20,
            position: 'bottom',
            fontColor: "#A9A9A9",
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            labels: {
                usePointStyle: true,
                fontColor: "#A9A9A9",
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year',
                    fontSize: 18,
                    fontColor: "#A9A9A9",
                },
                ticks: {
                    fontColor: "#A9A9A9",
                    fontSize: 14,
                    //stepSize: 1,
                    //beginAtZero: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'TWh (Terawatt Hours)',
                    fontSize: 18,
                    fontColor: "#A9A9A9",
                },
                ticks: {
                    fontColor: "#A9A9A9",
                    fontSize: 14,
                    //stepSize: 1,
                    //beginAtZero: true
                }
            }]
        }
    }
});
});



// Build Panel and Pie using Plotly.js

function buildPage(year){

    d3.csv("/csvdata2").then((data) => {
  
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

       filteredSample.forEach((country) => {
        if ((country['Entity'] == 'Asia Pacific') ||
            (country['Entity'] == 'North America') ||
            (country['Entity'] == 'Europe') ||
            (country['Entity'] == 'Middle East') ||
            (country['Entity'] == 'South & Central America') ||      
            (country['Entity'] == 'Africa'))      
            {
                //console.log(country);

                keyArray.push(country['Entity']);
                valueArray.push(277.78 * parseFloat(country['Primary Energy Consumption']));

                var row = table.append("tr");
                var cell1 = row.append("td");
                cell1.text(country['Entity']);
                var cell2 = row.append("td");
                cell2.text(parseInt(277.78 * parseFloat(country['Primary Energy Consumption'])));

                d3.selectAll('table').selectAll('td').style("color", "#adafae");
                d3.selectAll('table').selectAll('td:last-child').style("color", "white");
            }
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
        title: `Primary Energy Consumed by Energy Type [${year}]`,
        height: 450,
        width: 700,
        paper_bgcolor: "#2b3752",
        font: {color: '#9f9f9f'}
      };
  
      // Plot the chart to a div tag with id "pie"
      Plotly.newPlot("pie", data1, layout1);
    });
}
      
  
  function init() {
  
    // Fill dropdown with IDs
    // Get firstOne id and call buildPage with that id
  
    d3.csv("/csvdata2").then((data) => {
  
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

