//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet-easy-button/easy-button
//= require map/routes

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
        hideAndShowSlideBar(sidebar);
        var buildingKey = this.feature.geometry.coordinates[0].key;
        //var polygon = L.polygon(this._latlngs, {color: 'red'}).addTo(map);
        if(sidebar.isVisible()){
            sidebar.hide();
        } else {
            var numberToBuilding = '/map/building/' +(buildingKey);
            $("#sidebar").load( numberToBuilding, function() {
                hideAndShowSlideBar(sidebar);
            });
        }
  });
}

var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
});

map.addLayer(buildingLayer);


$.getJSON( "/map/data", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        var geo_json = JSON.parse(val.geo_data);
        geo_json.features[0].geometry.coordinates[0].key = val.id;
        try {
            buildingLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          //console.log(err);
        }
    });
});