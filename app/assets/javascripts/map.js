//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet-easy-button/easy-button
//= require map/routes
//= require map/search_building

function onEachFeature(feature, layer) {
  layer.on('click', function() {
    //slidePanel.show('/map/building/1');
  });
}
var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
});

map.addLayer(buildingLayer);

$.getJSON("/map/data", function(data) {
  var items = [];
  $.each(data, function(key, val) {
    try {
      var geo_json = JSON.parse(val.geo_data);
      buildingLayer.addData(JSON.parse(val.geo_data));
    }
    catch(err){
      //console.log(err);
    }
  });
});

