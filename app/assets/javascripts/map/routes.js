//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

L.easyButton('fa-map-marker', function(btn, map) {
  if (sidebar.isVisible()) {
    sidebar.hide();
  } else {
    $("#sidebar").load("/map/routes", function() {
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
    costing: 'pedestrian'
  }),
  formatter: new L.Routing.mapzenFormatter()
}).addTo(map);


map.contextmenu.enable();
map.contextmenu.addItem({
  text: 'Rotas a partir daqui',
  callback: routesFromHere
});

map.contextmenu.addItem({
  text: 'Rotas para cá',
  callback: routesToHere
});

function routesFromHere(e) {
  if (sidebar.isVisible()) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    $('#route_origin').val(lat + ", " + lng);
    control.spliceWaypoints(0, 1, e.latlng);
  } else {
    $("#sidebar").load("/map/routes", function() {
      sidebar.show();
    });
  }
}

function routesToHere(e) {
  if (sidebar.isVisible()) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    $('#route_destination').val(lat + ', ' + lng);
    control.spliceWaypoints(0, 1, e.latlng);
  } else {
    $("#sidebar").load("/map/routes", function() {
      sidebar.show();
    });
  }
}
