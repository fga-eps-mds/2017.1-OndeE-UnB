//= require leaflet/draw
//= require leaflet/map
//= require leaflet/easy-button
//= require leaflet/draw.translations

const locationGeoData = {
  element: $("input[id$='_geo_data']"),
  save: function(geo_json){
    this.element.val(JSON.stringify(geo_json.toGeoJSON()));
  },
  load: function(){
    const geoJSON = this.element.val();
    if (geoJSON) {
      drawnLayer.addData(JSON.parse(geoJSON));
    }
  }
};

const locationCoods = {
  elementLat: $("input[id$='_latitude']"),
  elementLng: $("input[id$='_longitude']"),
  save: function(lat, lng){
    this.elementLat.val(lat);
    this.elementLng.val(lng);
  },
  load: function(){
    const lat = this.elementLat.val();
    const lng = this.elementLng.val();
    if (lat && lng) {
        map.flyTo(new L.LatLng(lat, lng));
    }
  }
}
locationCoods.load();


var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);

// Load json from the form
locationGeoData.load();

// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnLayer
//     },
//     draw: {
//         polyline: false,
//         circle: false,
//         rectangle: false,
//         polygon: {
//             allowIntersection: false,
//             showArea: true
//         }
//     }
// });

map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnLayer.addLayer(layer);
    locationGeoData.save(drawnLayer);
});

map.on(L.Draw.Event.EDITED, function(event) {
    locationGeoData.save(drawnLayer);
});
map.on(L.Draw.Event.DELETED, function(event) {
    locationGeoData.save(drawnLayer);
});

map.addControl(drawControl);

L.easyButton('fa-map-marker', function(btn, map){
  const $center = map.getCenter();
  locationCoods.save($center.lat, $center.lng);
}).addTo(map);
