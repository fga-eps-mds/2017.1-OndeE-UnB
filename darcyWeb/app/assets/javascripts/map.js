//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet/easy-button
//= require map/routes
//= require map/search
//= require map/share_location


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


var departmentLayer = L.geoJSON('');

var departmentIcon = L.icon({
    iconUrl: 'http://icons.iconarchive.com/icons/icons8/ios7/24/Business-Department-icon.png'
    //iconUrl: 'https://drive.google.com/uc?export=view&id=0B8jEDVP6IcfKOVJscS1LRHlMemc'
});

map.addLayer(departmentLayer);

$.getJSON("/map/data/departments", function(data) { //getting the json data
  console.log(data);
  var items = [];
  $.each(data, function(key, val) {
    try {

      console.log('Load Departments');
      var geo_json = JSON.parse(val.geo_data);
      var coordinates = geo_json.features[0].geometry.coordinates;
      //console.log(geo_data);
      //departmentLayer.addData(geo_json); //adding the json data to the departament layer
      L.marker([coordinates[1], coordinates[0]], {icon: departmentIcon}).addTo(map);
    } catch (err) {
      console.log(err);
    }
  });
});





var sharedLocation = {
  marker: null,
  title: 'sharedLocation',
  icon: 'arrow-down-c',
  color: 'blue'
};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

function createMarker(waypoint, latlng) {
  //console.log("Lat and Lng");
  if (! $.isEmptyObject(latlng) ) {
    waypoint.marker = L.marker(latlng, {
      icon: L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: waypoint.icon,
        markerColor: waypoint.color
      })
    });
    map.addLayer(waypoint.marker);

    map.setView(latlng,32, {animate: true});
    //map.setZoom(200, {animate: true});
  }
}

createMarker(sharedLocation, getUrlVars());





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
