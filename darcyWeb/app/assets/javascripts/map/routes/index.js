//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require_tree .

const MapObj = new Map();
const RouteObj = new Route();
var FormObj;


sidebar.on('show', function() {
  var locations = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/map/search',
    remote: {
      url: '/map/search?search=%QUERY',
      wildcard: '%QUERY'
    }
  });

  $('.input-location .origin, .input-location .destination').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  }, {
    name: 'locations',
    display: 'title',
    source: locations,
    templates: {
      suggestion: function(data) {
        return '<p><strong>' + data.acronym + '</strong> - ' + data.title + '</p>';
      }
    }
  }).bind('typeahead:select', function(ev, suggestion) {
    var latLng = L.latLng(suggestion.latitude, suggestion.longitude);
    latLng['latlng'] = {
      lat: latLng.lat,
      lng: latLng.lng
    };
    if ($(this).hasClass('origin')) {
      routesFromHere(latLng);
    } else {
      routesToHere(latLng);
    }
  });
});

/**************** REGISTERING EVENTS ****************/
// This function is triggered when a route is successfully calculated
MapObj.control.on("routesfound", function(e) {

  console.info("Routes found");

  // enable autoRoute
  MapObj.control.options.autoRoute = true;

  // hides the route form
  FormObj.form.fadeOut();

  // waits 1 sec to get the route instructions and load it
  // into the sidebar
  setTimeout(function() {

    const summary = new Summary();

    // set route information
    $("#mode_icon").removeClass().addClass(summary.mode(FormObj.mode).icon);
    $("#mode_text").text(summary.mode(FormObj.mode).text);
    $("#distance").text(summary.distance);
    $("#time").text(summary.time);

    // get every route instruction
    var itinerary = $(".leaflet-routing-alt").find("tbody").find("tr");

    // load it into the sidebar table
    var $itinerarySidebar = $("#itinerary").find("table").find("tbody");
    $itinerarySidebar.html(itinerary);
    // get routes translations
    $itinerarySidebar.find("tr").each(function(index, instructionRow) {
      var $instruction = $(instructionRow).find("td").eq(1);


      $instruction.text(translateRoute($instruction.text()));

    });

    $("#itinerary").fadeIn();

  }, 300);

});

MapObj.control.on("routingerror", function() {
  // TODO Show message when it"s not possible to calculate routes

});

/**************** POSITION ****************/


// get the user"s current position
function getLocation(point) {
  try {
    navigator.geolocation.getCurrentPosition(function(position) {
      positionSuccess(position, point);
    }, RouteObj.positionError);
  } catch (error) {
    console.warn(error);
    swal("Oops...", "Recurso não disponível no seu browser.", "error");
  }
}

// process the user"s current position to create the route
function positionSuccess(position, point) {
  var location = {
    latlng: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  };
  var inside_bounds = map.getBounds().contains(location.latlng);
  if (inside_bounds) {
    if (point == "origin") {
      routesFromHere(location);
    } else {
      routesToHere(location);
    }
  } else {
    swal("Oops...", "Parece que você não está no campus.", "error");
  }

}

/**************** FORM ****************/


// loads the routes form into the sidebar
function loadRouteForm(data) {

  $("#sidebar").load("/map/routes", function() {

    $(".btn-reverse-route").on("click", function(e) {
      reverseRoute(e);
    });


    // instantiate route form elements when the page is loaded
    FormObj = new Form();


    fillFormRouteLocations(data);

    // when user clicks the button to use the current location in origin input
    FormObj.origin.parent().find("button").on("click", function() {
      getLocation("origin");
    });

    // when user clicks the button to use the current location in destination input
    FormObj.destination.parent().find("button").on("click", function() {
      getLocation("destination");
    });

    // calculate route when user clicks submit button
    FormObj.submit.on("click", function(e) {

      // Gets current selected mode.
      FormObj.setMode();

      // console.debug("Clicked submit button");
      // prevent default behavior
      e.preventDefault();

      // get route mode from the form and set into the control
      MapObj.control.options.router.options.costing = FormObj.mode.find("input").val();

      var originLatLng = FormObj.origin.val().split(",");
      var destinationLatLng = FormObj.destination.val().split(",");

      console.info(originLatLng);
      console.info(destinationLatLng);

      if (originLatLng != null && destinationLatLng != null) {

        MapObj.control.spliceWaypoints(0, 1, originLatLng);
        MapObj.control.spliceWaypoints(MapObj.control.getWaypoints().length - 1, 1, destinationLatLng);

        // TODO refactor
        if (RouteObj.origin.marker === null) {
          MapObj.createMarker(RouteObj.origin, originLatLng);
        } else {
          RouteObj.origin.marker.setLatLng(originLatLng);
        }

        // TODO refactor
        if (RouteObj.destination.marker === null) {
          MapObj.createMarker(RouteObj.destination, destinationLatLng);
        } else {
          RouteObj.destination.marker.setLatLng(destinationLatLng);
        }

        console.info("Calculate route!");
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
  if ("origin" in data) {
    FormObj.origin.val(data.origin);
  }
  if ("destination" in data) {
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
  if (waypoint.marker === null) {
    MapObj.createMarker(waypoint, e.latlng);
  } else {
    waypoint.marker.setLatLng(e.latlng);
  }
}

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
  if (RouteObj.origin.marker !== null && RouteObj.destination.marker === null) {
    console.info("Destination in blank.");
    MapObj.createMarker(RouteObj.destination, RouteObj.origin.marker.getLatLng());
    MapObj.removeMarker(RouteObj.origin);
  } else if (RouteObj.destination.marker !== null && RouteObj.origin.marker === null) {
    console.info("Origin in blank");
    MapObj.createMarker(RouteObj.origin, RouteObj.destination.marker.getLatLng());
    MapObj.removeMarker(RouteObj.destination);
  }

  if (RouteObj.origin.marker !== null && RouteObj.destination.marker !== null) {
    var latlng = RouteObj.origin.marker.getLatLng();
    RouteObj.origin.marker.setLatLng(RouteObj.destination.marker.getLatLng());
    RouteObj.destination.marker.setLatLng(latlng);
  }

  // swap values in form
  FormObj.swap();

}
// TODO Require to fill out origin and destination in the form, before calculate route
// TODO Add button to create a new route
// TODO Suggest locations on whe form
// TODO Suggest locations on whe form
