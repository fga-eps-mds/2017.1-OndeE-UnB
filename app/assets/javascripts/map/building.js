//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

L.easyButton('fa-map-marker', function(btn, map) {
  if (sidebar.isVisible()){
    sidebar.hide();
  }
  else {
    $("#sidebar").load( "/map/building", function() {
      sidebar.show();
    });
  }
}).addTo(map);

L.Routing.control({
  waypoints: [
    L.latLng(-15.762023, -47.867114),
    L.latLng(-15.761096, -47.867648)
  ],
 router: L.Routing.mapzen('mapzen-CEq2eYW', {
   costing:'pedestrian'
 }),
 formatter: new L.Routing.mapzenFormatter()
}).addTo(map);

