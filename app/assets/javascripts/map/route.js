//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Route {

  constructor(form) {

  this.form = form;
    // Set origin and destination points
    this.origin = {
      marker: null,
      title: 'origin',
      icon: 'arrow-up-c',
      color: 'green'
    };

    this.destination = {
      marker: null,
      title: 'destination',
      icon: 'arrow-down-c',
      color: 'red'
    };

    // Set and init Control
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

  }

// Set Route Location
  setRouteLocation(e, waypoint) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    var data = {};
    data[waypoint.title] = lat + ", " + lng;

    if (sidebar.isVisible()) {
      this.fillFormRouteLocations(data);
    } else {
      this.load(data);
    }
    if (waypoint.marker == null) {
      createMarker(waypoint, e.latlng);
    } else {
      waypoint.marker.setLatLng(e.latlng);
    }
  }

// ReverseRoute
  reverseRoute(e) {
    e.preventDefault();

    // reverse waypoints to route
    var waypoints = control.getWaypoints();
    control.setWaypoints(waypoints.reverse());

    // NOTE reverse markers was so hard to figure out
    if (origin.marker != null && destination.marker == null) {
      console.log('Destination in blank.');
      createMarker(destination, origin.marker.getLatLng());
      removeMarker(origin);
    } else if (destination.marker != null && origin.marker == null) {
      console.log('Origin in blank');
      createMarker(origin, destination.marker.getLatLng());
      removeMarker(destination);
    }

    if (origin.marker != null && destination.marker != null) {
      var latlng = origin.marker.getLatLng();
      origin.marker.setLatLng(destination.marker.getLatLng());
      destination.marker.setLatLng(latlng);
    }

    var origin_latlng = route_form.origin.val();
    var destination_latlng = route_form.destination.val();

    // swap values in form
    route_form.origin.val(destination_latlng);
    route_form.destination.val(origin_latlng);

  }


// Register control events used on map
  registerControlEvents() {

    // This function is triggered when a route is successfully calculated
    this.control.on('routesfound', function(e) {

      // enable autoRoute
      control.options.autoRoute = true;

      // hides the route form
      route_form.form.fadeOut();

      // waits 1 sec to get the route instructions and load it
      // into the sidebar
      setTimeout(function() {

        var summary = function() {
          // gets the time and distance from route
          this.summary = $('.leaflet-routing-alt').find('h3').text().split(',');
          console.log(this.summary);
          this.distance = this.summary[0];
          this.time = this.summary[1];

          // gets the route mode from route form.
          this.mode = function() {
            this.mode = route_form.mode.parent('.btn.active');
            this.icon = this.mode.find('i').attr('class');
            this.text = this.mode.text();
            return this;
          }.call({});

          return this;
        }.call({});

        // set route information
        $('#mode_icon').removeClass().addClass(summary.mode.icon);
        $('#mode_text').text(summary.mode.text);
        $('#distance').text(summary.distance);
        $('#time').text(summary.time);

        // get every route instruction
        var itinerary = $('.leaflet-routing-alt').find('tbody').find('tr');

        // load it into the sidebar table.
        $('#itinerary').find('table').find('tbody').html(itinerary);

        $('#itinerary').fadeIn();

      }, 300);

    });


    this.control.on('routingerror', function() {
      // TODO Show message when it's not possible to calculate routes

    });

  }

}
