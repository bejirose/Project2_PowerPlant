// Path for data is stored
var queryUrl = "static/resources/world-power-plants-list.geojson";

// Empty arrays to hold layers are initialized
var coalData = [];
var oilData = [];
var wasteData = [];
var windData = [];
var hydroData = [];
var gasData = [];
var nuclearData = [];
var geothermalData = [];
var solarData = [];

// GET request is made
d3.json(queryUrl, function(data) {
 
  // Function for what to do for each feature
  function onEachFeature(feature) {

    // Info for datum is crafted
    var datum = {"type": "Feature",
    "properties": {
        "name": feature.properties.plant_name,
        "MWE": feature.properties.plant_design_capacity_mwe,
        "type": feature.properties.type,
        "popupContent": `<p><strong>Name:</strong></br>${feature.properties.plant_name}</p>
          <p><strong>Type:</strong></br>${feature.properties.type}</p>
          <p><strong>MWE:</strong></br>${feature.properties.plant_design_capacity_mwe}</p>
          <p><strong>Latitude, Longitude:
          </strong></br>${feature.geometry.coordinates[1]}, ${feature.geometry.coordinates[0]}</p>`,
    },
    "geometry": {
        "type": "Point",
        "coordinates": [ feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
    }}

    // Datum is pushed into relevant layer
    switch(feature.properties.type){
    case "COAL": 
      coalData.push(datum);
      break;
    case "OIL": 
      oilData.push(datum);
      break;
    case "WASTE": 
      wasteData.push(datum);
      break;
    case "WIND": 
      windData.push(datum);
      break;
    case "HYDRO": 
      hydroData.push(datum);
      break;
    case "GAS": 
      gasData.push(datum);
      break;
    case "NUCLEAR": 
      nuclearData.push(datum);
      break;
    case "GEOTHERMAL": 
      geothermalData.push(datum);
      break;
    case "SOLAR_PV": 
      solarData.push(datum);
      break;
    case "SOLAR_THERMAL": 
      solarData.push(datum);
      break;
    default:
      console.log(feature.properties.type);
      break;
    };
  };
  
 
  // Layer holding data is defined
  L.geoJSON(data.features, {
    onEachFeature: onEachFeature
  });

  // All geoJSON data is turned into corresponding layers
  coalLayer = L.geoJSON(coalData);
  oilLayer = L.geoJSON(oilData);
  windLayer = L.geoJSON(windData);
  wasteLayer = L.geoJSON(wasteData);
  hydroLayer = L.geoJSON(hydroData);
  gasLayer = L.geoJSON(gasData);
  nuclearLayer = L.geoJSON(nuclearData);
  geothermalLayer = L.geoJSON(geothermalData);
  solarLayer = L.geoJSON(solarData);


  // Street map is generated
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Satellite map is generated
  var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

  // Dark map is generated
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // BaseMaps object holding all base layers is generated
  var baseMaps = {
    "Satellite Map": satmap,
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Overlay object holding all overlay layers is generated
  var overlayMaps = {
    "Coal": coalLayer,
    "Oil": oilLayer,
    "Gas": gasLayer,
    "Waste": wasteLayer,
    "Nuclear": nuclearLayer,
    "Solar": solarLayer,
    "Wind": windLayer,
    "Hydro": hydroLayer,
    "Geothermal": geothermalLayer,
  };

  // Generate myMap, which initializes on the satellite map and is centered on Potkin, Kansas
  var myMap = L.map("map", {
    center: [
      38, -97
    ],
    zoom: 3.2,
    layers: [satmap, coalLayer]
  });
  finishMap(myMap, baseMaps, overlayMaps)
});

// Function for the end step of generating map
function finishMap(myMap, baseMaps, overlayMaps) {
  
  // Function to run through each feature
  Object.values(overlayMaps).forEach((layer) => {
    Object.values(layer._layers).forEach((datum) => {
      datum.bindPopup(datum.feature.properties.popupContent);
    })
  });

  // Layer control is generated and added to map
  L.control.layers(baseMaps, overlayMaps,{
    collapsed: false,
  }).addTo(myMap);
};