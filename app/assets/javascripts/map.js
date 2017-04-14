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

var centerMap = [-15.764544, -47.866929];

var map = L.map('map', {
    center: centerMap,
    zoom: 18,
    minZoom: 16
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



L.marker(centerMap).addTo(map)
    .bindPopup('Onde É? UnB');
