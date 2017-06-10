//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/route
//= require map/map



class Form {

  constructor(map, route) {

    this.map = map;
    this.route = route;

    this.form = $('#sidebar').find('form');
    this.origin = this.form.find('input[name="route[origin]"]');
    this.destination = this.form.find('input[name="route[destination]"]');
    this.mode = this.form.find('input[name="route[mode]"]');
    this.submit = this.form.find('button[type=submit]');

  }

// Load Data to Form
  load(data) {
    const self = this;
    $("#sidebar").load("/map/routes", function() {

      $('.btn-reverse-route').on('click', function(e) {
        reverseRoute(e);
      });

      self.fillFormRouteLocations(data);

      // when user clicks the button to use the current location in origin input
      self.origin.parent().find('button').on('click', function() {
        self.map.getLocation('origin');
      });

      // when user clicks the button to use the current location in destination input
      self.destination.parent().find('button').on('click', function() {
        self.map.getLocation('destination');
      });

      // calculate route when user clicks submit button
      self.submit.on('click', function(e) {
        // prevent default behavior
        e.preventDefault();

        // get route mode from the form and set into the control
        self.route.control.options.router.options.costing = self.mode.parent('.btn.active').find('input').val();

        var origin_latlng = self.origin.val().split(',');
        var destination_latlng = self.destination.val().split(',');

        if (origin_latlng != null && destination_latlng != null) {

          self.route.control.spliceWaypoints(0, 1, origin_latlng);
          self.route.control.spliceWaypoints(control.getWaypoints().length - 1, 1, destination_latlng);

          // TODO refactor
          if (self.origin.marker == null) {
            createMarker(origin, origin_latlng);
          } else {
            self.origin.marker.setLatLng(origin_latlng);
          }

          // TODO refactor
          if (destination.marker == null) {
            createMarker(destination, destination_latlng);
          } else {
            destination.marker.setLatLng(destination_latlng);
          }

          self.route.control.route();
        }

      });

      sidebar.show();
    });
  }

  // Unload Events from Map
  unLoad() {
    sidebar.hide();

    // remove markers from map
    this.map.removeMarker(this.origin);
    this.map.removeMarker(this.destination);

    // removes route from map
    this.route.control.spliceWaypoints(0, 2);

    // disable auto route
    this.route.control.options.autoRoute = false;
  }

  addButton() {
    const self = this;
    L.easyButton('ion-merge', function(btn, map) {
      // triggered when user clicks the routes button.
      if (sidebar.isVisible()) {
        self.unLoad();
      } else {
        self.load({});
      }

    }).addTo(map);
  }

  registerControlEvents() {
    this.route.registerControlEvents();
  }

  fillFormRouteLocations(data) {
    if ('origin' in data) {
      this.origin.val(data.origin);
    }
    if ('destination' in data) {
      this.destination.val(data.destination);
    }
  }

}
