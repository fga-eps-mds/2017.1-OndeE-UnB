var informationPointsLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      // TODO Remove direct link to image
      iconUrl: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/48/information-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    }).bindPopup("Ponto de Informacao");
  }
});

$.getJSON("/map/data/informationpoints", function(informationpoints) { //getting the json data
  informationpoints.forEach(function(informationpoints) {
    try {
      var geoJSON = JSON.parse(informationpoints.geo_data);
      informationPointsLayer.addData(geoJSON); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});
