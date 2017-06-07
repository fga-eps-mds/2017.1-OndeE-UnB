//Bikes

//Layer with bikes icon personalized
var bikesLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/24/bike-icon.png',
    });
    return L.marker(latlng, {
      icon: smallIcon
    });
  }
}).addTo(map);


//Insert each bicycle rack on the layer of bikes
$.getJSON("/map/data/bikes", function(bikes) { //getting the json data
  bikes.forEach(function(bike) {
    try {
      var geoJSON = JSON.parse(bike.geo_data);
      bathroomLayer.addData(geoJSON); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});
