function Map() {
  // enable and set options to the contextmenu
  map.contextmenu.enable();
  map.contextmenu.addItem({
    text: "Rotas a partir daqui",
    callback: routesFromHere
  });
  map.contextmenu.addItem({
    text: "Rotas para cá",
    callback: routesToHere
  });

  this.control = L.Routing.control({
    plan: L.Routing.plan([], {
      createMarker: function() {
        return null;
      },
    }),
    autoRoute: false,
    router: L.Routing.mapzen("mapzen-CEq2eYW", {
      costing: "pedestrian"
    }),
    formatter: new L.Routing.mapzenFormatter()
  }).addTo(map);

  // adds the route button to map
  L.easyButton("ion-merge", function(btn, map) {
    // triggered when user clicks the routes button.
    if (sidebar.isVisible()) {
      unLoadRoute();
    } else {
      loadRouteForm({});
    }

  }).addTo(map);

}

Map.prototype.createMarker = function(waypoint, latlng) {
  waypoint.marker = L.marker(latlng, {
    icon: L.AwesomeMarkers.icon({
      prefix: "ion",
      icon: waypoint.icon,
      markerColor: waypoint.color
    })
  });
  map.addLayer(waypoint.marker);
}

Map.prototype.removeMarker = function(waypoint) {
  try {
    map.removeLayer(waypoint.marker);
    waypoint.marker = null;
  } catch (err) {
    console.error(err.message);
  }
}
