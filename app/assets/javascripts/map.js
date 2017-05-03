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

function onEachFeature(feature,layer){
    //console.log(layer.bindPopup(feature.properties.description));

  layer.on('click', function(){


      if (sidebarBuilding.isVisible()){
        sidebarBuilding.hide();
      }
      else {
        $("#sidebar").load( "/map/building", function() {
         sidebarBuilding.show();
        });
      }


    L.Routing.control({
      waypoints: [
        L.latLng(-15.762023, -47.867114),
        L.latLng(-15.761096, -47.867648)
      ],
     router: L.Routing.mapzen('mapzen-CEq2eYW', {
       costing:'pedestrian'
     }),
     formatter: new L.Routing.mapzenFormatter()
    }).addTo(map);
    var visible = sidebar.isVisible();
    var actualBuildingKey = this.feature.geometry.coordinates[0].key;
    console.log("#ActualBuildingId");
    console.log(actualBuildingKey);
    console.log("");

    //Takes the actual Latitude for the selected building
    var actualBuildingLat = this._latlngs[0][length].lat;

    //Takes the actual Longitude for the selected building
    var actualBuildingLng = this._latlngs[0][length].lng;
    console.log("#This Lat");
    console.log(actualBuildingLat);
    console.log("#This Lng");
    console.log(actualBuildingLng);
    console.log("");

    var promiseThisBuilding = $.getJSON("/map/data");
    promiseThisBuilding.then(function(data) {


        var validKeyBuilding = false;

        $.each(data, function (key, val){
            var geo_json = JSON.parse(val.geo_data);
            var dataLat = geo_json;

            //Takes each Latitude from saved buildings
            var dataLat = geo_json.features[0].geometry.coordinates[0][length][1];

            //Takes each Longitude from saved buildings
            var dataLng = geo_json.features[0].geometry.coordinates[0][length][0];

            console.log("Building number " + String(key));
            console.log("Lat " + String(dataLat));
            console.log("Lng " + String(dataLng));

            if(dataLat === actualBuildingLat && dataLng === actualBuildingLng){
                console.log("Esse é o prédio " + String(key));
                validKeyBuilding = true;
            }

        });


        console.log("#0.1");
        console.log(data);
     if (sidebarBuilding.isVisible()){
        sidebarBuilding.hide();
      } else {
        if(validKeyBuilding){
            var numberToBuilding = '/map/building/' +(actualBuildingKey+1);
            $("#sidebar").load( numberToBuilding, function() {
         sidebarBuilding.show();
        });
        }else{
            console.log("Invalid id to building selected");
        }

      }

    });


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
    geo_json.features[0].geometry.coordinates[0].key = key;
    //console.log(geo_json);
    //console.log("Minha key" + key);
    //console.log("Meu geo json" + geo_json.properties);
    buildingLayer.addData(geo_json); //adding the json data to the building layer

    });

});

map.on('click', function(e) {
  //slidePanel.hide();
});
