//= require leaflet/draw
//= require leaflet/map
//= require leaflet/easy-button
//= require leaflet/draw.translations

const $department_geo_data = {
  element: $("#department_geo_data"),
  save: function(geo_json){
    this.element.val(JSON.stringify(geo_json.toGeoJSON()));
  },
  load: function(){
    const $geo_json = this.element.val();
    if ($geo_json) {
        drawnLayer.addData(JSON.parse($geo_json));
    }
  }
};

const $department_coods = {
  element_lat: $("#department_latitude"),
  element_lng: $("#department_longitude"),
  save: function(lat, lng){
    this.element_lat.val(lat);
    this.element_lng.val(lng);
  },
  load: function(){
    const $lat = this.element_lat.val();
    const $lng = this.element_lng.val();
    if ($lat && $lng) {
        map.flyTo(new L.LatLng($lat, $lng));
    }
  }
}
$department_coods.load();


var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);

// Load json from the form
$department_geo_data.load();

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnLayer
    },
    draw: {
        polyline: false,
        circle: false,
        rectangle: false,
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
});

map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnLayer.addLayer(layer);
    $department_geo_data.save(drawnLayer);
});

map.on(L.Draw.Event.EDITED, function(event) {
    $department_geo_data.save(drawnLayer);
});
map.on(L.Draw.Event.DELETED, function(event) {
    $department_geo_data.save(drawnLayer);
});

map.addControl(drawControl);

L.easyButton('fa-map-marker', function(btn, map){
  const $center = map.getCenter();
  $department_coods.save($center.lat, $center.lng);
}).addTo(map);
