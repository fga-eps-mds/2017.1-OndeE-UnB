//= require leaflet/context-menu

// this is the common setting to starting up the map
const centerMap = [-15.763654422150273, -47.86942720413208];
const south_west = L.latLng(-15.77963740364866, -47.879254817962654);
const north_east = L.latLng(-15.74892996748966, -47.853977680206306);
const bounds = L.latLngBounds(south_west, north_east);

var map = L.map('map', {
    maxBounds: bounds,
    center: centerMap,
    zoom: 16,
    minZoom: 16,
    contextmenu: false,
    contextmenuWidth: 140
});

var url = "https://api.mapbox.com/styles/v1/kaironvzb/cj1y3dkki00042sn074lbuo5k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpcm9udnpiIiwiYSI6ImNpd21mbW0wbDAwNXMyenFpanlmbHZ6ZXAifQ.RtMAGQj_0ho54Rw6D812hw";

L.tileLayer(url, {
    attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>\
                  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
