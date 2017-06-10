//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/route
//= require map/map
//= require map/form

Map = new Map();
Map.addButton();

Form = new Form();

var route_form;

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
  waypoint.marker = L.marker(latlng, {
    icon: L.AwesomeMarkers.icon({
      prefix: 'ion',
      icon: waypoint.icon,
      markerColor: waypoint.color
    })
  });
  map.addLayer(waypoint.marker);
}

// this is performed when user clicks "Rotas a partir daqui"
function routesFromHere(e) {
  setRouteLocation(e, origin);
  control.spliceWaypoints(0, 1, e.latlng);
}

// this is performed when user clicks "Rotas para cá"
function routesToHere(e) {
  setRouteLocation(e, destination);
  control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
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
