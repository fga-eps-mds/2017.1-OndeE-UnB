// require ./plants

$('.rooms.new, .rooms.edit').ready(function() {

  var drawControlRooms = new L.Control.Draw({
    edit: {
      featureGroup: drawnLayer
    },

    draw: {
      polyline: false,
      circle: false,
      rectangle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true
      }
    }
  });

  map.on(L.Draw.Event.CREATED, function(event) {
    disableDrawing();

    const centerPoint = drawnLayer.getLayers()[0].getBounds().getCenter();
    console.log(centerPoint);
    // locationCoods.save(centerPoint.lat, centerPoint.lng);
    // $point_geo_data.save(drawnLayerPoints);
  });

  map.on(L.Draw.Event.DELETED, function(event) {

  });

  map.on(L.Draw.Event.DELETED, function(event) {
    enableDrawing();
  });

  map.addControl(drawControlRooms);

  function enableDrawing(){
    // enable draw polygon
    drawControlRooms.setDrawingOptions({
      polygon: true
    });
    map.removeControl(drawControlRooms);
    map.addControl(drawControlRooms);
  }

  function disableDrawing(){
    // remove the draw control from map
    map.removeControl(drawControlRooms);
    // set polygon as false
    drawControlRooms.setDrawingOptions({
      polygon: false
    });
    // add the draw control with the draw polygon disabled
    map.addControl(drawControlRooms);
  }
});
