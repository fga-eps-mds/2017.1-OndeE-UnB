$(roomsPages).ready(function() {
  // show floor plans

  var options = {
    polygon: true
  };
  drawControl.enableDrawing(options);

  drawnLayer.on("layeradd", function(event) {
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

  const $plans = $("#room_building_id");
  var overlay;

  var $plan = $plans.find("option:selected");
  loadPlan($plan);

  $plans.find("option[data-selected=true]").prop('selected', true);


  $plans.change(function(){
    $plan = $(this).find(':selected');
    loadPlan($plan);
  });

  function loadPlan(plan){

    var image = plan.data("image")
    var geo = plan.data("geo-data");
    var topLeft = [geo.topLeft.lat, geo.topLeft.lng];
    var topRight = [geo.topRight.lat, geo.topRight.lng];
    var bottomLeft = [geo.bottomLeft.lat, geo.bottomLeft.lng];

    // Remove the current overlay
    if (overlay) {
      overlay.remove();
    }

    overlay = L.imageOverlay.rotated(image, topLeft, topRight, bottomLeft, {
      opacity: 1,
      interactive: true
    }).addTo(map);


    var boundsImage = new L.LatLngBounds(topLeft, topRight).extend(bottomLeft);
    map.fitBounds(boundsImage);

    $("#room_level").val(plan.data("level"));
  }


});
