//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet/easy-button
//= require map/routes
//= require map/search

//Bikes

//Layer with bikes icon personalized
var bikesLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/24/bike-icon.png',
        });
        return L.marker(latlng, {icon: smallIcon}).bindPopup("Bicicletário");
    }
});


//Insert each bicycle rack on the layer of bikes
$.getJSON( "/map/data/bikes", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            bikesLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});

//Bathrooms

//Layer with bathroom icon personalized
var bathroomLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/rokey/smooth/32/toilet-paper-icon.png',
            iconSize: [24, 24],
        });
        return L.marker(latlng, {icon: smallIcon}).bindPopup("Banheiro");
    }
});

//Insert each bathroom on the layer of bathrooms
$.getJSON( "/map/data/bathrooms", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            bathroomLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});

//Snackbar

var snackbarLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/24/Restaurant-icon.png',
            iconSize: [24, 24],
        });
        return L.marker(latlng, {icon: smallIcon}).bindPopup("Alimentação");
    }
});


$.getJSON( "/map/data/snackbars", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            snackbarLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});

//Bus Stops

var busstopLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/32/school-bus-icon.png',
            iconSize: [24, 24],
        });
        return L.marker(latlng, {icon: smallIcon}).bindPopup("Ponto de Ônibus");
    }
});


$.getJSON( "/map/data/busstops", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            busstopLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});

//Entrances

var entranceLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/24/door-icon.png',
            iconSize: [24, 24],
        });
        return L.marker(latlng, {icon: smallIcon}).bindPopup("Entrada de Edifício");
    }
});


$.getJSON( "/map/data/entrances", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            entranceLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});

var urlWorld = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

var esri_WorldImagery = L.tileLayer(urlWorld, {
  maxZoom: 20,
  maxNativeZoom: 22,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


//Creating the radio buttos for the two possible base maps
var baseMaps = {
  "Satélite": esri_WorldImagery,
  "Ruas": mapBox
}

//Creating the check box for the overlay layers
var overlayMaps = {
  "Prédios": buildingLayer,
  "Bicicletários": bikesLayer,
  "Banheiros": bathroomLayer,
  "Lanchonete": snackbarLayer,
  "Ponto de Entrada": entranceLayer,
  "Parada de Ônibus": busstopLayer
}

//Adding the control to choose which layer you want
L.control.layers(baseMaps, overlayMaps).addTo(map);
