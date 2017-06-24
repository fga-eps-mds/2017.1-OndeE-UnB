var urlWorld = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

var esri_WorldImagery = L.tileLayer(urlWorld, {
  maxZoom: 20,
  maxNativeZoom: 22,
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
});


//Creating the radio buttos for the two possible base maps
var baseMaps = {
  "Satélite": esri_WorldImagery,
  "Mapa": mapBox
}

//Creating the check box for the overlay layers
var overlayMaps = {
  "Prédios": buildingLayer,
  "Bicicletários": bikesLayer,
  "Banheiros": bathroomLayer,
  "Lanchonete": snackbarLayer,
  "Ponto de Acesso": entranceLayer,
  "Ponto de Ônibus": busstopLayer,
  "Ponto de Informação": informationPointsLayer
}

//Adding the control to choose which layer you want
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Event triggered when the base layer is changed.
map.on("baselayerchange", function(base) {

  // Set opacity for each layer
  buildingLayer.setStyle(buildingStyles[base.name]);

  if (typeof indoorLayer !== "undefined") {
    // Set opacity for each room
    indoorLayer.getLevels().forEach(function(level) {
      for (room in indoorLayer._layers[level]._layers) {
        indoorLayer._layers[level]._layers[room].setStyle(roomStyles[base.name]);
      }
    });
  }

});
