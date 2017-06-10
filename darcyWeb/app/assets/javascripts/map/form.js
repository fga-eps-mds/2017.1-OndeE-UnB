//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/route


class Form {

  constructor() {
    this.form = $('#sidebar').find('form');
    this.origin = this.form.find('input[name="route[origin]"]');
    this.destination = this.form.find('input[name="route[destination]"]');
    this.mode = this.form.find('input[name="route[mode]"]');
    this.submit = this.form.find('button[type=submit]');
    this.route = new Route();
    this.route.registerControlEvents();
  }

  load(data) {
    $("#sidebar").load("/map/routes", function() {

      $('.btn-reverse-route').on('click', function(e) {
        reverseRoute(e);
      });

      this.fillFormRouteLocations(data);

      // when user clicks the button to use the current location in origin input
      this.origin.parent().find('button').on('click', function() {
        getLocation('origin');
      });

      // when user clicks the button to use the current location in destination input
      this.destination.parent().find('button').on('click', function() {
        getLocation('destination');
      });

      // calculate route when user clicks submit button
      this.submit.on('click', function(e) {
        // prevent default behavior
        e.preventDefault();

        // get route mode from the form and set into the control
        control.options.router.options.costing = this.mode.parent('.btn.active').find('input').val();

        var origin_latlng = this.origin.val().split(',');
        var destination_latlng = this.destination.val().split(',');

        if (origin_latlng != null && destination_latlng != null) {

          this.route.control.spliceWaypoints(0, 1, origin_latlng);
          this.route.control.spliceWaypoints(control.getWaypoints().length - 1, 1, destination_latlng);

          // TODO refactor
          if (origin.marker == null) {
            createMarker(origin, origin_latlng);
          } else {
            origin.marker.setLatLng(origin_latlng);
          }

          // TODO refactor
          if (destination.marker == null) {
            createMarker(destination, destination_latlng);
          } else {
            destination.marker.setLatLng(destination_latlng);
          }

          this.route.control.route();
        }

      });

      $("#sidebar").show();
    });
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
