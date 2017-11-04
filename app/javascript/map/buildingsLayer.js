const layer = L.geoJSON(false, {
  onEachFeature: (feature, layer) => {
    layer.setStyle({
      fillColor: buildingStyles[mapOptions.baseLayer].color,
      fillOpacity: buildingStyles[mapOptions.baseLayer].fillOpacity,
      color: buildingStyles[mapOptions.baseLayer].color,
      weight: 1.5
    });

    layer.on("add", ev => {
      // Commented tooltip label
      // const content = layer.feature.properties.building.acronym;
      // // Define the offset of the label based on the word length
      // tooltipOptions.offset[0] = -(content.length) * acronymTooltipOffset;
      //
      // layer.bindTooltip(layer => {
      //   return content;
      // }, tooltipOptions);
    });
    // Trigger when user click on a building
    layer.on("click", () => {

      // The key references to that building clicked
      const buildingID = feature.properties.building.id;
      const buildingUrl = "/map/data/building/" + buildingID;

      //selects the building clicked and shows sidebar
      $("#sidebar").load(buildingUrl, () => {
          sidebar.show();
      });

      // Load rooms for clicked building
      loadRooms(buildingID);

    });
  }
}).addTo(map);

export default layer;
