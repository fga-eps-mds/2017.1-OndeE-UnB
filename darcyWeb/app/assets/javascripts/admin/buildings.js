//= require leaflet/draw
//= require leaflet/map

//= require leaflet/draw.translations

const $building_geo_data = $('#building_geo_data');
const $building_geo_data_json = $building_geo_data.val();

function saveToForm(geo_json) {
    $building_geo_data.val(JSON.stringify(geo_json.toGeoJSON()));
}

var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);

// Load json from the form
if ($building_geo_data_json) {
    drawnLayer.addData(JSON.parse($building_geo_data_json));
}

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
    saveToForm(drawnLayer);
});

// map.on(L.Draw.Event.EDITED, function(event) {
//     var layer = event.layer;
//     drawnLayer.addLayer(layer);
//     saveToForm(drawnLayer);
// });
// map.on(L.Draw.Event.DELETED, function(event) {
//     var layer = event.layer;
//     drawnLayer.addLayer(layer);
//     saveToForm(drawnLayer);
// });

map.addControl(drawControl);

// TODO:10 Create button to define the location
