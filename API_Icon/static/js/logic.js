// Store our API endpoint inside queryUrl
var queryUrl = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-power-plants-list%40"+
                "kapsarc&q=united+states&rows=4857&sort=plant_design_capacity_mwe&facet=plant_country&"+
                "facet=plant_state&facet=plant_status&facet=plant_type_of_ownership&"+
                "facet=plant_operating_company&facet=type";
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

    console.log(data);

  createFeatures(data);
});

function createFeatures(data) {
 
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//       console.log(feature);
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
//   var plantData = L.geoJSON(data, {

//     onEachFeature: onEachFeature
//   });

  // Sending our earthquakes layer to the createMap function
  createMap(data);
}

function createMap(plantData) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
//    Plants: plantData
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      38, -97
    ],
    zoom: 2,
    layers: [streetmap]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
