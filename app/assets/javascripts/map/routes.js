//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

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

var route_form;

var origin = {
    marker: null,
    title: 'origin',
    icon: 'arrow-up-c',
    color: 'green'
};

var destination = {
    marker: null,
    title: 'destination',
    icon: 'arrow-down-c',
    color: 'red'
};

// starts the route options.
var control = L.Routing.control({
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

// This function is triggered when a route is successfully calculated
control.on('routesfound', function(e) {

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
        this.mode = route_form.mode.parent('label');
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

// adds the route button to map
L.easyButton('ion-merge', function(btn, map) {

  // triggered when user clicks the routes button.
  if (sidebar.isVisible()) {
    unLoadRoute();
  } else {
    loadRouteForm({});
  }

}).addTo(map);

// loads the routes form into the sidebar
function loadRouteForm(data) {

  $("#sidebar").load("/map/routes", function() {

    // set elements, so jquery can look up
    route_form = function() {
      this.form = $('#sidebar').find('form');
      this.origin = this.form.find('input[name="route[origin]"]');
      this.destination = this.form.find('input[name="route[destination]"]');
      this.mode = this.form.find('input[name="route[mode]"]:checked');
      this.submit = this.form.find('button[type=submit]');
      return this;
    }.call({});

    fillFormRouteLocations(data);

    // calculate route when user clicks submit button
    route_form.submit.on('click', function(e) {
      // prevent default behavior
      e.preventDefault();

      // get route mode from the form and set into the control
      control.options.router.options.costing = route_form.mode.val();

      let origin_latlng = control.getWaypoints()[0].latLng;
      let destination_latlng = control.getWaypoints()[1].latLng;

      if(origin_latlng != null && destination_latlng != null){
        control.options.autoRoute = true;
        control.route();
      }

    });

    sidebar.show();
  });
}

function unLoadRoute() {
  sidebar.hide();

  // remove markers from map
  map.removeLayer(origin.marker);
  map.removeLayer(destination.marker);

  // set markers as null
  origin.marker = null;
  destination.marker = null;

  // removes route from map
  control.spliceWaypoints(0, 2);
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

  var data = {
    [waypoint.title]: lat + ", " + lng
  };

  if (sidebar.isVisible()) {
    fillFormRouteLocations(data);
  } else {
    loadRouteForm(data);
  }
  if (waypoint.marker == null) {

    waypoint.marker = L.marker(e.latlng, {
      icon: L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: waypoint.icon,
        markerColor: waypoint.color
      })
    });

    map.addLayer(waypoint.marker);

  } else {
    waypoint.marker.setLatLng(e.latlng);
  }
};

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

// FIXME Require to fill out origin and destination in the form, before calculate route
// TODO Add button to create a new route
// TODO Suggest locations on whe form
// TODO Add button to reverse route
