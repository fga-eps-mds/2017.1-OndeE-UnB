var slidePanel;

$(document).ready(function() {
    $('label').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('input').removeClass('slideInRight').addClass('slideOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('input').css('visibility', 'hidden');
            });
        } else {
            $('input').removeClass('slideOutRight').addClass('animated slideInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('input').css('visibility', 'visible');
            });
            $(this).addClass('active');
        }
    });
    slidePanel = {
        panel: $('.slide-panel'),
        content() {

        },
        show(url) {
            this.panel.load(url, function() {
                $(this).removeClass('slideOutLeft').addClass('slideInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).css('visibility', 'visible');
                });
            });
        },
        hide() {
            this.panel.removeClass('slideInLeft').addClass('slideOutLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).css('visibility', 'hidden');
            });
        }
    };
});

var infoLabel = {
    show: function(marker) {
        $('.info-label').text(marker.name);
        $('.info-label').css('visibility', 'visible');
    },
    hide: function() {
        $('.info-label').css('visibility', 'hidden');
    }
}

var centerMap = [-15.762023, -47.867114];
var bce = [-15.761096, -47.867648];
var reitoria = [-15.762795, -47.866854];

var map = L.map('map', {
    center: centerMap,
    zoom: 18,
    minZoom: 16,
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(reitoria).addTo(map)
    .bindPopup('Reitoria');

L.marker(bce).addTo(map)
    .bindPopup('BCE');

var routeLayer = L.featureGroup().addTo(map);

var getRoutes = function() {

        routeLayer.clearLayers();

        // you need to define some options for the polygon service
        // for more travel options check out the other tutorials
        var travelOptions = r360.travelOptions();
        // we only have one source which is the marker we just added
        travelOptions.addSource(centerMap);
        // add two targets to the options
        travelOptions.addTarget(bce);
        travelOptions.addTarget(reitoria);
        // set the travel type to transit
        travelOptions.setTravelType('walk');
        // please contact us and request your own key
        travelOptions.setServiceKey('F2H7U2QUY7P3AESM3O20K2U');
        // set the service url for your area
        travelOptions.setServiceUrl('https://service.route360.net/germany/');

        // start the service
        r360.RouteService.getRoutes(travelOptions, function(routes) {

          // one route for each source and target combination
          routes.forEach(function(route) {

            r360.LeafletUtil.fadeIn(routeLayer, route, 1000, "travelDistance");
          });
        });
      }

      getRoutes();

      centerMap.on('dragend', getRoutes);
      bce.on('dragend', getRoutes);
      reitoria.on('dragend', getRoutes);
