//= require leaflet/map
//= require leaflet-easy-button/easy-button
//= require map/routes

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


L.easyButton('fa-map-marker', function(btn, map){
  slidePanel.show("/map/routes");
}).addTo(map);

L.marker(centerMap).addTo(map)
    .bindPopup('Onde É? UnB');

var buildingLayer = L.geoJSON().addTo(map); //adding the building layers to the map
map.addLayer(buildingLayer);

$.getJSON( "/map/data", function(data) { //getting the json data
  var items = [];
  $.each(data, function (key, val){
    var geo_json = JSON.parse(val.geo_data);
    buildingLayer.addData(geo_json); //adding the json data to the building layer 

});
});

map.on('click', function(e) {
        slidePanel.hide();
    });
