//Bathrooms

//Layer with bathroom icon personalized
var bathroomLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      // TODO Remove direct link to image
      iconUrl: 'http://icons.iconarchive.com/icons/rokey/smooth/32/toilet-paper-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    }).bindPopup("Banheiro");
  }
});

//Insert each bathroom on the layer of bathrooms
$.getJSON("/map/data/bathrooms", function(bathrooms) { //getting the json data
  bathrooms.forEach(function(bathroom) {
    try {
      var geoJSON = JSON.parse(bathroom.geo_data);
      bathroomLayer.addData(geoJSON); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});
