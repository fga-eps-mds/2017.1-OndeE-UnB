var buildingLayer = L.geoJSON(false, {
  onEachFeature: function onEachBuilding(feature, layer) {
    layer.setStyle({
      fillColor: '#856FC1',
      fillOpacity: 0.5,
      color: '#856FC1',
      weight: 1.5
    });

    layer.on('add', function(ev){

      var content = layer.feature.properties.building.acronym;
      // Define the offset of the label based on the word length
      tooltipOptions.offset[0] = -(content.length) * acronymTooltipOffset;

      layer.bindTooltip(function(layer) {
        return content;
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
});

// Insert each building on the layer of building
$.getJSON("/map/data/buildings", function(buildings) { //getting the json data
  buildings.forEach(function(building) {
    try {
      var geoJSON = JSON.parse(building.geo_data);
      geoJSON.features[0].properties.building = {
        id: building.id,
        title: building.title,
        acronym: building.acronym
      };
      console.log(geoJSON);
      buildingLayer.addData(geoJSON);
    } catch (err) {
      console.log("Adding building");
      console.log(err);
    }
  });
});
