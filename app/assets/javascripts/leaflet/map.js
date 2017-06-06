//= require leaflet/context-menu

// this is the common setting to starting up the map
const centerMap = [-15.763654422150273, -47.86942720413208];
const south_west = L.latLng(-15.77963740364866, -47.879254817962654);
const north_east = L.latLng(-15.74892996748966, -47.853977680206306);
const bounds = L.latLngBounds(south_west, north_east);

var urlMapbox = "https://api.mapbox.com/styles/v1/kaironvzb/cj1y3dkki00042sn074lbuo5k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpcm9udnpiIiwiYSI6ImNpd21mbW0wbDAwNXMyenFpanlmbHZ6ZXAifQ.RtMAGQj_0ho54Rw6D812hw";

//Creating the default base layer for when the map loads
var mapBox = L.tileLayer(urlMapbox, {
  maxZoom: 20,
  maxNativeZoom: 22,
  attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>\
                  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

//Method called when click on one building
function onEachFeature(feature,layer){
    layer.on('click', function(){
        //The key references to that building clicked
        var buildingKey = this.feature.geometry.coordinates[0].key;

        if(sidebar.isVisible()){
            sidebar.hide();
        } else {
            //selects the building clicked and shows sidebar
            var numberToBuilding = '/map/data/building/' + buildingKey;
            $("#sidebar").load(numberToBuilding, function() {
                sidebar.toggle();
            });
        }
  });
}

//Creating the default overlay layer for when the maps loads
var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
});

//Insert each building on the layer of building
$.getJSON( "/map/data/buildings", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){

        try {
            var geo_json = JSON.parse(val.geo_data);
            geo_json.features[0].geometry.coordinates[0].key = val.id;
            buildingLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          //console.log(err);
        }
    });
});

//Creating the map
var map = L.map('map', {
  maxBounds: bounds,
  center: centerMap,
  zoom: 17,
  minZoom: 17,
  contextmenu: false,
  contextmenuWidth: 140,
  layers: [mapBox, buildingLayer] //Adding the default layers
});
