// Path for data is stored
var queryUrl = "static/resources/world-power-plants-list.geojson";

var coalData = [];


// GET request is made
d3.json(queryUrl, function(data) {

  console.log(data);
 
  // Function for what to do for each feature
  function onEachFeature(feature, layer) {
    
    console.log(feature);

    // Info for datum is crafted
    var datum = {"type": "Feature",
    "properties": {
        "name": feature.properties.plant_name,
        "MWE": feature.properties.plant_design_capacity_mwe,
        "type": feature.properties.type,
        "popupContent": "This is where the Rockies play!"
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
    default:
      console.log(feature.properties.type);
    };

    // Popup is added for datum point
    // layer.bindPopup("<h3>" + "I think the title" +
    //   "</h3><hr><p>" + "The data?" + "</p>");
  }
  
 
  // Layer holding data is defined
  L.geoJSON(data.features, {
    onEachFeature: onEachFeature
  });

  coalLayer = L.geoJSON(coalData);

  console.log(coalData);

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

  // Overlay object holding all overlay layer is generated
  var overlayMaps = {
    "Coal": coalLayer
  };

  // Generate myMap, which initializes on the satellite map and is centered on Potkin, Kansas
  var myMap = L.map("map", {
    center: [
      38, -97
    ],
    zoom: 2,
    layers: [satmap, coalLayer]
  });

  // Layer control is generated and added to map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});
