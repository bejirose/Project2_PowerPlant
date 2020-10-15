// Store our API endpoint inside queryUrl
var queryUrl = "static/resources/world-power-plants-list.geojson";



function createMap(data) {
 
  // Function generates a marker on each 
  function onEachFeature(feature) {
    console.log(feature);
    L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(myMap);
  }

  // Define streetmap and darkmap layers
  var satMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

  // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "dark-v10",
  //   accessToken: API_KEY
  // });

  // Define a baseMaps object to hold our base layers
  // var baseMaps = {
  //   "Street Map": streetmap,
  //   "Dark Map": darkmap
  // };

  // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   Plants: plantData
  // };

  // Create myMap, centering on Potwin Kansas
  var myMap = L.map("map", {
    center: [
      38, -97
    ],
    zoom: 2
  });

  // Run onEachFeature function on each datum
  var plantData = L.geoJSON(data, {
    onEachFeature: onEachFeature
  });

  // Add baseMaps
  satMap.addTo(myMap);
}


// Perform GET request to the query URL (in this case, file saved locally)
d3.json(queryUrl, function(data) {

  console.log(data);

  // Generate map
  createMap(data);
});