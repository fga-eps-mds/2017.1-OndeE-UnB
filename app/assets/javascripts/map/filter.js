var urlWorld = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

var esri_WorldImagery = L.tileLayer(urlWorld, {
  maxZoom: 20,
  maxNativeZoom: 22,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


//Creating the radio buttos for the two possible base maps
var baseMaps = {
  "Satélite": esri_WorldImagery,
  "Ruas": mapBox
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
