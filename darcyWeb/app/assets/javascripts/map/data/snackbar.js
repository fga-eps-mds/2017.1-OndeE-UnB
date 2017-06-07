//Snackbar

var snackbarLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      // TODO Remove direct link to image
      iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/24/Restaurant-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    }).bindPopup("Alimentação");
  }
}).addTo(map);

$.getJSON("/map/data/snackbars", function(snackbars) { //getting the json data
  snackbars.forEach(function(snackbar) {
    try {
      var geoJSON = JSON.parse(snackbar.geo_data);
      entranceLayer.addData(geoJSON); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});
