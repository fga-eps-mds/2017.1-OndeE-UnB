//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/form
//= require map/route

class Map {

  constructor() {

    // enable and set options to the contextmenu
    map.contextmenu.enable();
    map.contextmenu.addItem({
      text: 'Rotas a partir daqui',
      callback: routesFromHere
    });
    map.contextmenu.addItem({
      text: 'Rotas para cá',
      callback: routesToHere
    });

    this.control = L.Routing.control({
      plan: L.Routing.plan([], {
        createMarker: function() {
          return null;
        },
      }),
      autoRoute: false,
      router: L.Routing.mapzen('mapzen-CEq2eYW', {
        costing: 'pedestrian'
      }),
      formatter: new L.Routing.mapzenFormatter()
    }).addTo(map);

    this.form = new Form();
    this.route = new Route();

    // adds the route button to map
    L.easyButton('ion-merge', function(btn, map) {
      // triggered when user clicks the routes button.
      if (sidebar.isVisible()) {
        unLoadRoute();
      } else {
        loadRouteForm({});
      }

    }).addTo(map);

  }


}
