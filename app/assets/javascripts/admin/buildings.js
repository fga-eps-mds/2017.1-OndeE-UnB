//= require ../leaflet-draw.js
//= require map.js

// Set the button title text for the polygon button
L.drawLocal.draw.toolbar.buttons.polygon = 'Desenhar um polígono';
L.drawLocal.draw.toolbar.buttons.marker = 'Marcar um ponto';
L.drawLocal.draw.handlers.marker.tooltip.start = 'Clique no mapa para marcar'

L.drawLocal.draw.handlers.polygon.tooltip.start = 'Clique começar a desenhar o polígono'
L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Clique para continuar o desenhando'
L.drawLocal.draw.handlers.polygon.tooltip.end = 'Clique no primeiro ponto para fechar o polígono'

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
