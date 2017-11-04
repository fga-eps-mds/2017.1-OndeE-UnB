const buildingLayer = L.geoJSON(false, {
  onEachFeature: (feature, layer) => {
    layer.setStyle({
      fillColor: buildingStyles[mapOptions.baseLayer].color,
      fillOpacity: buildingStyles[mapOptions.baseLayer].fillOpacity,
      color: buildingStyles[mapOptions.baseLayer].color,
      weight: 1.5
    });

    layer.on("add", function(ev){

      var content = layer.feature.properties.building.acronym;
      // Define the offset of the label based on the word length
      tooltipOptions.offset[0] = -(content.length) * acronymTooltipOffset;

      layer.bindTooltip(function(layer) {
        return content;
      }, tooltipOptions);
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
