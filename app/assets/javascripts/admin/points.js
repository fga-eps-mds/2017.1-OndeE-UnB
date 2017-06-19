$(pointsPages).ready(function() {
  // show floor plans

  var options = {
    marker: true
  };
  drawControl.enableDrawing(options);

  drawnLayer.on("layeradd", function(event) {
    options.marker = false;
    drawControl.disableDrawing(options);
  });

  map.on(L.Draw.Event.CREATED, function(event) {
    options.marker = false;
    drawControl.disableDrawing(options);
  });

  map.on(L.Draw.Event.DELETED, function(event) {
    options.marker = true;
    drawControl.enableDrawing(options);
  });
});
