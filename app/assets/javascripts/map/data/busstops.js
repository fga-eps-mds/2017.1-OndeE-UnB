//Bus Stops

var busstopLayer = L.geoJSON("", {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      // TODO Remove direct link to image
      iconUrl: "http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/32/school-bus-icon.png",
      iconSize: [24, 24]
    });
    return L.marker(latlng, {
      icon: smallIcon
    }).bindPopup("Ponto de Ônibus");
  }
});

$.getJSON("/map/data/busstops", function(data) { //getting the json data
  data.forEach(function(busStop) {
    try {
      var geoJSON = JSON.parse(busStop.geo_data);
      busstopLayer.addData(geoJSON); //adding the json data to the building layer
    } catch (err) {
      console.error(err);
    }
  });
});
