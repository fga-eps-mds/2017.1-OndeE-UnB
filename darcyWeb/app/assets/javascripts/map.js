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

var latlons = {
        map: [-15.762023, -47.867114],
        src1: [-15.761096, -47.867648],
        trg1: [-15.762795, -47.866854],
        trg2: [-15.763875, -47.865910]
      };


var map = L.map('map', {
    center: latlons.map,
    zoom: 18,
    minZoom: 16
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var haight = new google.maps.LatLng(-15.762902, -47.866971);
var oceanBeach = new google.maps.LatLng(-15.760950, -47.867860);

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 14,
    center: haight
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var selectedMode = document.getElementById('mode').value;
  var request = {
      origin: haight,
      destination: oceanBeach,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}

//Define OSM map type pointing at the OpenStreetMap tile server
map.mapTypes.set("OSM", new google.maps.ImageMapType({
    getTileUrl(coord, zoom) {
        // "Wrap" x (logitude) at 180th meridian properly
        var tilesPerGlobe = 1 << zoom;
        var x = coord.x % tilesPerGlobe;
        if (x < 0) x = tilesPerGlobe + x;
        var tile = "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
        return tile;
    },
    tileSize: new google.maps.Size(256, 256),
    name: "OpenStreetMap",
    maxZoom: 19
}));
