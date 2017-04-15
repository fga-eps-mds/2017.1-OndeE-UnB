//= require leaflet/draw
//= require leaflet/map

//= require leaflet/draw.translations

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
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
    console.log(layer);
    drawnItems.addLayer(layer);
});
map.addControl(drawControl);

// TODO: Save the layer to the form
// TODO: Load the layer from the form
// TODO: Create button to define the location
