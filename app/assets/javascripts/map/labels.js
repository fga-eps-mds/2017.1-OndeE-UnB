// var angle = function angleFromCoordinate(pos1, pos2) {
//
//     var dLon = (pos2.lng - pos1.lng);
//
//     var y = Math.sin(dLon) * Math.cos(pos2.lat);
//     var x = Math.cos(pos1.lat) * Math.sin(pos2.lat) - Math.sin(pos1.lat) * Math.cos(pos2.lat) * Math.cos(dLon);
//
//     var brng = Math.atan2(y, x) * 180 / Math.PI;
//     return Math.round(Math.abs(brng)) + 51;
// }

var setLabelContent = function setLabelContent(tooltip, content, offset) {
  tooltip.options.offset[0] = -(content.length) * offset;
  tooltip.setContent(content);
}

map.on('moveend', function(e) {

  buildingLayer.getLayers().forEach(function(building) {

    var properties = building.feature.properties.building;
    var tooltip = building.getTooltip();

    if (map.getZoom() >= zoomTooltipBuilding) {
      setLabelContent(tooltip, properties.title, titleTooltipOffset);
    } else {
      setLabelContent(tooltip, properties.acronym, acronymTooltipOffset);
    }


  });

  if (indoorLayer) {
    indoorLayer.getLevels().forEach(function(level) {
      for (room in indoorLayer._layers[level]._layers) {
        room = indoorLayer._layers[level]._layers[room];

        var properties = room.feature.properties.room;
        var tooltip = room.getTooltip();

        if (map.getZoom() >= zoomTooltipRoom) {
          setLabelContent(tooltip, properties.title, titleTooltipOffset);
        } else {
          setLabelContent(tooltip, properties.acronym, acronymTooltipOffset);
        }

      }
    });
  }
});
