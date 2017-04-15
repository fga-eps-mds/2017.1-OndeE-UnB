//= require leaflet/map

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





L.marker(centerMap).addTo(map)
    .bindPopup('Onde É? UnB');



L.layerJSON("map/data").addTo(map);

  $.getJSON( "map/data", function() {
  $.each( function( "geo_data":, {\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-47.867006007581956,-15.762497981882012],[-47.86737078800798,-15.76273546568898],[-47.866957727819695,-15.763324011317367],[-47.86659294739366,-15.76307104015989],[-47.867006007581956,-15.762497981882012]]]}}]}","acronym":"Reitoria","phone":null}] ) {
  items.push( "<li id='" + "geo_data" + "'>" + + "</li>" );
  });

$( "<ul/>", {
  "class": "my-new-list",
  html: items.join( "" )
  }).appendTo( "body" );
});
