$(departmentsPages).ready(function() {
  // show floor plans

  // enable drawing department
  var options = {
    polyline: true
  };
  drawControl.enableDrawing(options);

  drawnLayer.on("layeradd", function(event) {
    options.polyline = false;
    drawControl.disableDrawing(options);
  });

  map.on(L.Draw.Event.CREATED, function(event) {
    options.polyline = false;
    drawControl.disableDrawing(options);
  });

  map.on(L.Draw.Event.DELETED, function(event) {
    options.polyline = true;
    drawControl.enableDrawing(options);
  });
});
