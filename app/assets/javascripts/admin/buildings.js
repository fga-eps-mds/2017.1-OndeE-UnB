$('.buildings.new, .buildings.edit, .buildings.create, .buildings.update').ready(function() {
  // show floor plans

  var options = {
    polygon: true
  };
  drawControl.enableDrawing(options);

  drawnLayer.on('layeradd', function(event) {
    options.polygon = false;
    drawControl.disableDrawing(options);
  });

  map.on(L.Draw.Event.CREATED, function(event) {
    options.polygon = false;
    drawControl.disableDrawing(options);
  });

  map.on(L.Draw.Event.DELETED, function(event) {
    options.polygon = true;
    drawControl.enableDrawing(options);
  });
});
