//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

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
