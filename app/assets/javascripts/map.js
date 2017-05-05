//= require leaflet/map
//= require map/sidebar
//= require leaflet-easy-button/easy-button
//= require map/routes

var slidePanel;

var sidebarBuilding = L.control.sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebarBuilding);

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
        content: function() {

        },
        show: function(url) {
            this.panel.load(url, function() {
                $(this).removeClass('slideOutLeft').addClass('slideInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).css('visibility', 'visible');
                });
            });
        },
        hide: function() {
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


$(document).ready(function () {
    $("a").click(function () {
        var test = caller.id;
        alert(test.val());
    });
});

const $building_geo_data = {
  element: $('#building_geo_data'),

  save: function(geo_json){
    this.element.val(JSON.stringify(geo_json.toGeoJSON()));
  },
  load: function(){
    const $geo_json = this.element.val();
    console.log($geo_json)
    if ($geo_json) {
        drawnLayer.addData(JSON.parse($geo_json));
    }
  }
};

function setValidBuilding(data){
    console.log("Funcao mostrar slidebar");
};

function hideAndShowSlideBar(sidebar){
    if (sidebar.isVisible()){
        sidebar.hide();
    } else {
        $("#sidebar").load( "/map/building", function() {
            sidebar.show();
        });
    }
};



function onEachFeature(feature,layer){
    layer.on('click', function(){

        hideAndShowSlideBar(sidebarBuilding);

        var visible = sidebar.isVisible();

        var buildingKey = this.feature.geometry.coordinates[0].key;

        //var polygon = L.polygon(this._latlngs, {color: 'red'}).addTo(map);

        if(sidebarBuilding.isVisible()){
            sidebarBuilding.hide();
        } else {
            var numberToBuilding = '/map/building/' +(buildingKey);
            $("#sidebar").load( numberToBuilding, function() {
                hideAndShowSlideBar(sidebarBuilding);
            });
        }
  });
}


L.easyButton('fa-map-marker', function(btn, map){

  slidePanel.show("/map/routes");
}).addTo(map);


L.marker(centerMap).addTo(map).bindPopup('Onde É? UnB');

var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
}).addTo(map); //adding the building layers to the map
map.addLayer(buildingLayer);


$.getJSON( "/map/data", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        var geo_json = JSON.parse(val.geo_data);
        geo_json.features[0].geometry.coordinates[0].key = val.id;
        var a = true;
        if(a){
            buildingLayer.addData(geo_json); //adding the json data to the building layer
        }else{

        }
    });
});

map.on('click', function(e) {
  //slidePanel.hide();
});
