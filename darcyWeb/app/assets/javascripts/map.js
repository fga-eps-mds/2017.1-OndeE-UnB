//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet/easy-button
//= require map/routes
//= require map/search


function onEachFeature(feature, layer) {
  layer.on('click', function() {
    var buildingKey = this.feature.geometry.coordinates[0].key;
    //var polygon = L.polygon(this._latlngs, {color: 'red'}).addTo(map);
    if (sidebar.isVisible()) {
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

$.getJSON("/map/data", function(data) { //getting the json data
  console.log(data);
  var items = [];
  $.each(data, function(key, val) {
    try {
      console.log('Load Building');
      var geo_json = JSON.parse(val.geo_data);
      geo_json.features[0].geometry.coordinates[0].key = val.id;
      buildingLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});



var sharedLocation = {
  marker: null,
  title: 'sharedLocation',
  icon: 'arrow-down-c',
  color: 'blue'
};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

function createMarker(waypoint, latlng) {
  console.log('Create marker');
  console.log(waypoint);
  console.log(latlng);
  waypoint.marker = L.marker(latlng, {
    icon: L.AwesomeMarkers.icon({
      prefix: 'ion',
      icon: waypoint.icon,
      markerColor: waypoint.color
    })
  });
  map.addLayer(waypoint.marker);
}


createMarker(sharedLocation, getUrlVars());







