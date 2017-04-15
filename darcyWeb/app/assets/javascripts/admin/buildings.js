//= require leaflet/draw
//= require leaflet/map

//= require leaflet/draw.translations

const $building_geo_data = {
  element: $('#building_geo_data'),
  save: function(geo_json){
    this.element.val(JSON.stringify(geo_json.toGeoJSON()));
  },
  load(){
    const $geo_json = this.element.val();
    if ($geo_json) {
        drawnLayer.addData(JSON.parse($geo_json));
    }
  }
};

var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);

// Load json from the form
$building_geo_data.load();

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
    $building_geo_data.save(drawnLayer);
});

map.on(L.Draw.Event.EDITED, function(event) {
    $building_geo_data.save(drawnLayer);
});
map.on(L.Draw.Event.DELETED, function(event) {
    $building_geo_data.save(drawnLayer);
});

map.addControl(drawControl);

// TODO:10 Create button to define the location
