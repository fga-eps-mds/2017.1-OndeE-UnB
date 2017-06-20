// this is the common setting to starting up the map
//= require map/data/buildings
//= require leaflet/mask

const centerMap = [-15.758140620981214, -47.87189483642578];
const south_west = L.latLng(-15.826278199357942, -47.93429374694824);
const north_east = L.latLng(-15.682212561298117, -47.76615142822265);
const bounds = L.latLngBounds(south_west, north_east);

var urlMapbox = "https://api.mapbox.com/styles/v1/kaironvzb/cj1y3dkki00042sn074lbuo5k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpcm9udnpiIiwiYSI6ImNpd21mbW0wbDAwNXMyenFpanlmbHZ6ZXAifQ.RtMAGQj_0ho54Rw6D812hw";

//Creating the default base layer for when the map loads
var mapBox = L.tileLayer(urlMapbox, {
  boundary: unb,
  maxZoom: 20,
  maxNativeZoom: 22,
  attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>\
                &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var mapOptions = {
  maxBounds: bounds,
  center: centerMap,
  zoom: 13.5,
  minZoom: 13.5,
  trackResize: true,
  layers: buildingLayer,
};

var map = {};
var mask = L.mask(unb);
map.init = function startMap(options){
  map = L.map('map', options);
  mask.addTo(map);
  mapBox.addTo(map);
};
