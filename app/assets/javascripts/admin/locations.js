//= require leaflet/draw
//= require leaflet/map
//= require leaflet-easy-button/easy-button
//= require leaflet/draw.translations

const $location_geo_data = {
  element: $("input[id$='_geo_data']"), 
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

const $location_coods = {
  element_lat: $("input[id$='_latitude']"),
  element_lng: $("input[id$='_longitude']"), 
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
$location_coods.load();


var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);

// Load json from the form
$location_geo_data.load();

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
    $location_geo_data.save(drawnLayer);
});

map.on(L.Draw.Event.EDITED, function(event) {
    $location_geo_data.save(drawnLayer);
});
map.on(L.Draw.Event.DELETED, function(event) {
    $location_geo_data.save(drawnLayer);
});

map.addControl(drawControl);

L.easyButton('fa-map-marker', function(btn, map){
  const $center = map.getCenter();
  $location_coods.save($center.lat, $center.lng);
}).addTo(map);


