var buildingLayer = L.geoJSON(false, {
  onEachFeature: function onEachBuilding(feature, layer) {
    layer.setStyle({
      fillColor: "#6a7c83",
      fillOpacity: 1,
      color: "#6a7c83",
      weight: 3
    });

    layer.on('add', function(ev){
      console.log(ev);
      layer.bindTooltip(function(layer) {
        return layer.feature.properties.building.title; // Needs to be a string
      }, tooltipOptions)
    });
    // Trigger when user click on a building
    layer.on("click", function() {
      // The key references to that building clicked
      var buildingID = this.feature.properties.building.id;

      if (sidebar.isVisible()) {
        sidebar.hide();
      } else {
        //selects the building clicked and shows sidebar
        var numberToBuilding = "/map/data/building/" + buildingID;
        $("#sidebar").load(numberToBuilding, function() {
          sidebar.toggle();
        });
        // Load rooms for clicked building
        loadRooms(buildingID);
      }
    });
  }
}).addTo(map);

// Insert each building on the layer of building
$.getJSON("/map/data/buildings", function(buildings) { //getting the json data
  buildings.forEach(function(building) {
    try {
      var geoJSON = JSON.parse(building.geo_data);
      geoJSON.features[0].properties.building = {
        id: building.id,
        title: building.title
      };
      console.log(geoJSON);
      buildingLayer.addData(geoJSON);
    } catch (err) {
      console.log("Adding building");
      console.log(err);
    }
  });
});
