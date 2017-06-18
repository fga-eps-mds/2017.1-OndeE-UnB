//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/map
//= require map/route
//= require map/form

var MapObj = new Map();
var FormObj = new Form();
var RouteObj = new Route();

MapObj.attachForm(FormObj);
MapObj.attachRoute(RouteObj);

console.log('####');
console.log(MapObj);
console.log('####');


// Registering Events

// This function is triggered when a route is successfully calculated
MapObj.control.on('routesfound', function(e) {

  console.debug("Routes found");

  // enable autoRoute
  MapObj.control.options.autoRoute = true;

  // hides the route form
  FormObj.fadeOut();

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
        this.mode = MapObj.form.mode.parent('.btn.active');
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


MapObj.control.on('routingerror', function() {
  // TODO Show message when it's not possible to calculate routes

});


// loads the routes form into the sidebar
function loadRouteForm(data) {

  $("#sidebar").load("/map/routes", function() {

    $('.btn-reverse-route').on('click', function(e) {
      reverseRoute(e);
    });



    fillFormRouteLocations(data);

    // when user clicks the button to use the current location in origin input
    route_form.origin.parent().find('button').on('click', function() {
      getLocation('origin');
    });

    // when user clicks the button to use the current location in destination input
    route_form.destination.parent().find('button').on('click', function() {
      getLocation('destination');
    });

    // calculate route when user clicks submit button
    route_form.submit.on('click', function(e) {
      console.debug('Clicked submit button');
      // prevent default behavior
      e.preventDefault();

      // get route mode from the form and set into the control
      control.options.router.options.costing = route_form.mode.parent('.btn.active').find('input').val();

      var origin_latlng = route_form.origin.val().split(',');
      var destination_latlng = route_form.destination.val().split(',');

      console.info(origin_latlng);
      console.info(destination_latlng);

      if (origin_latlng != null && destination_latlng != null) {

        control.spliceWaypoints(0, 1, origin_latlng);
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, destination_latlng);

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

        console.debug("Calculate route!");
        control.route();
      }

    });

    sidebar.show();
  });
}

function unLoadRoute() {
  sidebar.hide();

  // remove markers from map
  removeMarker(origin);
  removeMarker(destination);

  // removes route from map
  control.spliceWaypoints(0, 2);

  // disable auto route
  control.options.autoRoute = false;
}

// set values to location in the route form
// when sidebar is already loaded
function fillFormRouteLocations(data) {
  if ('origin' in data) {
    route_form.origin.val(data.origin);
  }
  if ('destination' in data) {
    route_form.destination.val(data.destination);
  }
}

function setRouteLocation(e, waypoint) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  var data = {};
  data[waypoint.title] = lat + ", " + lng;

  if (sidebar.isVisible()) {
    fillFormRouteLocations(data);
  } else {
    loadRouteForm(data);
  }
  if (waypoint.marker == null) {
    createMarker(waypoint, e.latlng);
  } else {
    waypoint.marker.setLatLng(e.latlng);
  }
};

function removeMarker(waypoint) {
  try {
    map.removeLayer(waypoint.marker);
    waypoint.marker = null;
  } catch (err) {
    console.error(err.message);
  }
}

function createMarker(waypoint, latlng) {
  console.log('Create marker');
  console.log(waypoint);
  console.log(latlng);
  waypoint.marker = L.marker(latlng, {
    icon: L.AwesomeMarkers.icon({
      prefix: 'ion',
      icon: waypoint.icon,
      markerColor: waypoint.color
    })
  });
  map.addLayer(waypoint.marker);
}

function reverseRoute(e) {
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

// TODO Require to fill out origin and destination in the form, before calculate route
// TODO Add button to create a new route
// TODO Suggest locations on whe form
// TODO Suggest locations on whe form
