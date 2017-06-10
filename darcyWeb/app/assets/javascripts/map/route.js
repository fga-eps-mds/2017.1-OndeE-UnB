//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Route {

  constructor(options) {

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


  initControl() {

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
