const buildingsLayer = L.geoJSON(false, {
  onEachFeature: (feature, layer) => {
    layer.setStyle({
      fillColor: buildingStyles[mapOptions.baseLayer].color,
      fillOpacity: buildingStyles[mapOptions.baseLayer].fillOpacity,
      color: buildingStyles[mapOptions.baseLayer].color,
      weight: 1.5
    });

    layer.on("add", ev => {

      const content = layer.feature.properties.building.acronym;
      // Define the offset of the label based on the word length
      tooltipOptions.offset[0] = -(content.length) * acronymTooltipOffset;

      layer.bindTooltip(layer => {
        return content;
      }, tooltipOptions);
    });
    // Trigger when user click on a building
    layer.on("click", () => {
      // The key references to that building clicked
      const buildingID = this.feature.properties.building.id;

      if (sidebar.isVisible()) {
        sidebar.hide();
      } else {
        //selects the building clicked and shows sidebar
        const numberToBuilding = "/map/data/building/" + buildingID;
        $("#sidebar").load(numberToBuilding, () => {
          sidebar.toggle();
        });
        // Load rooms for clicked building
        loadRooms(buildingID);
      }
    });
  }
}).addTo(map);

export default buildingsLayer;
