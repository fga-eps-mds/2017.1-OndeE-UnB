var buildingLayer = L.geoJSON('', {
  onEachFeature: function onEachBuilding(feature, layer) {
    layer.setStyle({
      fillColor: '#6a7c83',
      fillOpacity: 1,
      color: '#6a7c83',
      weight: 3
    });
    // Trigger when user click on a building
    layer.on('click', function() {
      // The key references to that building clicked
      var buildingKey = this.feature.geometry.coordinates[0].key;

      if (sidebar.isVisible()) {
        sidebar.hide();
      } else {
        //selects the building clicked and shows sidebar
        var numberToBuilding = '/map/data/building/' + buildingKey;
        $("#sidebar").load(numberToBuilding, function() {
          sidebar.toggle();
        });
        // Load rooms for clicked building
        loadRooms(buildingKey);
      }
    });
  }
}).addTo(map);

// Insert each building on the layer of building
$.getJSON("/map/data/buildings", function(buildings) { //getting the json data
  buildings.forEach(function(building) {
    try {
      var geo_json = JSON.parse(building.geo_data);
      geo_json.features[0].geometry.coordinates[0].key = building.id;
      buildingLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      //console.log(err);
    }
  });
});
