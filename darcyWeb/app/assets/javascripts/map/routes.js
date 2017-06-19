//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/map
//= require map/route
//= require map/form
//= require map/summary


const MapObj = new Map();
const RouteObj = new Route();
let FormObj;


/**************** REGISTERING EVENTS ****************/

// This function is triggered when a route is successfully calculated
MapObj.control.on('routesfound', function(e) {

  console.debug("Routes found");

  // enable autoRoute
  MapObj.control.options.autoRoute = true;

  // hides the route form
  FormObj.form.fadeOut();

  // waits 1 sec to get the route instructions and load it
  // into the sidebar
  setTimeout(function() {

    let summary = new Summary();

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

/**************** POSITION ****************/


// get the user's current position
function getLocation(point) {
  try {
    navigator.geolocation.getCurrentPosition(function(position){
      positionSuccess(position, point);
    }, );
  } catch (error) {
    console.warn(error);
    alert("Recurso não disponível no seu browser.");
  }
}

// process the user's current position to create the route
function positionSuccess(position, point) {
  var location = {
    latlng: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  }
  var inside_bounds = map.getBounds().contains(location.latlng);
  if(inside_bounds){
    if(point == 'origin'){
      routesFromHere(location);
    } else {
      routesToHere(location);
    }
  } else {
    alert("Ops... Parece que você não está no campus.");
  }

}

/**************** FORM ****************/


// loads the routes form into the sidebar
function loadRouteForm(data) {

  $("#sidebar").load("/map/routes", function() {

    $('.btn-reverse-route').on('click', function(e) {
      reverseRoute(e);
    });


    // instantiate route form elements when the page is loaded
    FormObj = new Form();


    fillFormRouteLocations(data);

    // when user clicks the button to use the current location in origin input
    FormObj.origin.parent().find('button').on('click', function() {
      getLocation('origin');
    });

    // when user clicks the button to use the current location in destination input
    FormObj.destination.parent().find('button').on('click', function() {
      getLocation('destination');
    });

    // calculate route when user clicks submit button
    FormObj.submit.on('click', function(e) {
      console.debug('Clicked submit button');
      // prevent default behavior
      e.preventDefault();

      // get route mode from the form and set into the control
      MapObj.control.options.router.options.costing = FormObj.mode.parent('.btn.active').find('input').val();

      var origin_latlng = FormObj.origin.val().split(',');
      var destination_latlng = FormObj.destination.val().split(',');

      console.info(origin_latlng);
      console.info(destination_latlng);

      if (origin_latlng != null && destination_latlng != null) {

        MapObj.control.spliceWaypoints(0, 1, origin_latlng);
        MapObj.control.spliceWaypoints(MapObj.control.getWaypoints().length - 1, 1, destination_latlng);

        // TODO refactor
        if (RouteObj.origin.marker == null) {
          MapObj.createMarker(Routeobj.origin, origin_latlng);
        } else {
          RouteObj.origin.marker.setLatLng(origin_latlng);
        }

        // TODO refactor
        if (RouteObj.destination.marker == null) {
          MapObj.createMarker(destination, destination_latlng);
        } else {
          RouteObj.destination.marker.setLatLng(destination_latlng);
        }

        console.debug("Calculate route!");
        MapObj.control.route();
      }

    });

    sidebar.show();
  });
}

/**************** ROUTES ****************/

function unLoadRoute() {
  sidebar.hide();

  // remove markers from map
  MapObj.removeMarker(RouteObj.origin);
  MapObj.removeMarker(RouteObj.destination);

  // removes route from map
  MapObj.control.spliceWaypoints(0, 2);

  // disable auto route
  MapObj.control.options.autoRoute = false;
}

// set values to location in the route form
// when sidebar is already loaded
function fillFormRouteLocations(data) {
  if ('origin' in data) {
    FormObj.origin.val(data.origin);
  }
  if ('destination' in data) {
    FormObj.destination.val(data.destination);
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
    MapObj.createMarker(waypoint, e.latlng);
  } else {
    waypoint.marker.setLatLng(e.latlng);
  }
};

// this is performed when user clicks "Rotas a partir daqui"
function routesFromHere(e) {
  setRouteLocation(e, RouteObj.origin);
  MapObj.control.spliceWaypoints(0, 1, e.latlng);
}

// this is performed when user clicks "Rotas para cá"
function routesToHere(e) {
  setRouteLocation(e, RouteObj.destination);
  MapObj.control.spliceWaypoints(MapObj.control.getWaypoints().length - 1, 1, e.latlng);
}

function reverseRoute(e) {
  e.preventDefault();

  // reverse waypoints to route
  var waypoints = MapObj.control.getWaypoints();
  MapObj.control.setWaypoints(waypoints.reverse());

  // NOTE reverse markers was so hard to figure out
  if (RouteObj.origin.marker != null && RouteObj.destination.marker == null) {
    console.log('Destination in blank.');
    MapObj.createMarker(RouteObj.destination, RouteObj.origin.marker.getLatLng());
    MapObj.removeMarker(RouteObj.origin);
  } else if (RouteObj.destination.marker != null && RouteObj.origin.marker == null) {
    console.log('Origin in blank');
    MapObj.createMarker(RouteObj.origin, RouteObj.destination.marker.getLatLng());
    MapObj.removeMarker(RouteObj.destination);
  }

  if (RouteObj.origin.marker != null && RouteObj.destination.marker != null) {
    var latlng = RouteObj.origin.marker.getLatLng();
    RouteObj.origin.marker.setLatLng(RouteObj.destination.marker.getLatLng());
    RouteObj.destination.marker.setLatLng(latlng);
  }

  var origin_latlng = FormObj.origin.val();
  var destination_latlng = FormObj.destination.val();

  // swap values in form
  FormObj.origin.val(destination_latlng);
  FormObj.destination.val(origin_latlng);

}
// TODO Require to fill out origin and destination in the form, before calculate route
// TODO Add button to create a new route
// TODO Suggest locations on whe form
// TODO Suggest locations on whe form
