// this is the common setting to starting up the map
//= require leaflet/mask

const centerMap = [-15.758140620981214, -47.87189483642578];
const south_west = L.latLng(-15.826278199357942, -47.93429374694824);
const north_east = L.latLng(-15.682212561298117, -47.76615142822265);
const bounds = L.latLngBounds(south_west, north_east);

var urlMapbox = "https://api.mapbox.com/styles/v1/kaironvz/cj4cxz9nr5n1u2rp53imvn9tu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpcm9udnoiLCJhIjoiY2o0Y3h5YmJhMGU1MzJxbXh2dmczN2w0eSJ9.iOK4aTg-UWinlS0prZPDnA";
//Creating the default base layer for when the map loads
var mapBox = L.tileLayer(urlMapbox, {
  boundary: unb,
  maxZoom: 25,
  maxNativeZoom: 20,
  attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>\
                &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var mapOptions = {
  maxBounds: bounds,
  center: centerMap,
  zoom: 13.5,
  minZoom: 13.5,
  trackResize: true
};

var map = {};
var mask = L.mask(unb);
map.init = function startMap(options){
  map = L.map('map', options);
  mask.addTo(map);
  mapBox.addTo(map);
};
