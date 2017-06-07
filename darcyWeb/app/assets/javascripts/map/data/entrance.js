//Entrances

var entranceLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      // TODO Remove direct link to image
      iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/24/door-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    }).bindPopup("Entrada de Edifício");
  }
}).addTo(map);

$.getJSON("/map/data/entrances", function(entrances) { //getting the json data
  entrances.forEach(function(entrance) {
    try {
      var geoJSON = JSON.parse(entrance.geo_data);
      entranceLayer.addData(geoJSON); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});
