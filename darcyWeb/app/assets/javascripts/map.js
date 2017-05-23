//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet/easy-button
//= require map/routes
//= require map/search
//= require map/points

function onEachFeature(feature,layer){
    layer.on('click', function(){
        var buildingKey = this.feature.geometry.coordinates[0].key;

        //var polygon = L.polygon(this._latlngs, {color: 'red'}).addTo(map);
        if(sidebar.isVisible()){
            sidebar.hide();
        } else {

            var numberToBuilding = '/map/building/' + buildingKey;
            console.log(numberToBuilding);
            $("#sidebar").load(numberToBuilding, function() {
                sidebar.toggle();
            });
        }
  });
}

var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
});

map.addLayer(buildingLayer);

$.getJSON( "/map/data/buildings", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){

        try {
            var geo_json = JSON.parse(val.geo_data);
            geo_json.features[0].geometry.coordinates[0].key = val.id;
            buildingLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          //console.log(err);
        }
    });
});


var bikesLayer = L.geoJSON('');

map.addLayer(bikesLayer);

$.getJSON( "/map/data/bikes", function(data) { //getting the json data
    console.log(data);
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            bikesLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});
