// load leaflet libraries
//= require leaflet/map
//= require leaflet/context-menu
//= require leaflet/awesome-markers
//= require leaflet/indoor-map
//= require leaflet/easy-button

//= require map/init
//= require map/sidebar
//= require map/routes
//= require map/search
//= require map/rooms


var buildingLayer = L.geoJSON('', {
  onEachFeature: function onEachBuilding(feature, layer) {
    layer.setStyle({
      fillColor: '#6a7c83',
      fillOpacity: 1,
      color: '#6a7c83',
      weight: 3
    });
    // Trigger when user click on a building
    layer.on('click', function() {
      // The key references to that building clicked
      var buildingKey = this.feature.geometry.coordinates[0].key;

      if (sidebar.isVisible()) {
        sidebar.hide();
      } else {
        //selects the building clicked and shows sidebar
        var numberToBuilding = '/map/data/building/' + buildingKey;
        $("#sidebar").load(numberToBuilding, function() {
          sidebar.toggle();
        });
        // Load rooms for clicked building
        loadRooms(buildingKey);
      }
    });
  }
}).addTo(map);

// Insert each building on the layer of building
$.getJSON("/map/data/buildings", function(buildings) { //getting the json data
  buildings.forEach(function(building) {
    try {
      var geo_json = JSON.parse(building.geo_data);
      geo_json.features[0].geometry.coordinates[0].key = building.id;
      buildingLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      //console.log(err);
    }
  });
});

//Bikes

//Layer with bikes icon personalized
var bikesLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/24/bike-icon.png',
    });
    return L.marker(latlng, {
      icon: smallIcon
    });
  }
}).addTo(map);

//Insert each bicycle rack on the layer of bikes
$.getJSON("/map/data/bikes", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {
    try {
      var geo_json = JSON.parse(val.geo_data);
      bikesLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});

//Bathrooms

//Layer with bathroom icon personalized
var bathroomLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      iconUrl: 'http://icons.iconarchive.com/icons/rokey/smooth/32/toilet-paper-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    });
  }
}).addTo(map);

//Insert each bathroom on the layer of bathrooms
$.getJSON("/map/data/bathrooms", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {
    try {
      var geo_json = JSON.parse(val.geo_data);
      bathroomLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});

//Snackbar

var snackbarLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/24/Restaurant-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    });
  }
}).addTo(map);

$.getJSON("/map/data/snackbars", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {
    try {
      var geo_json = JSON.parse(val.geo_data);
      snackbarLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});

//Bus Stops

var busstopLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/32/school-bus-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    });
  }
}).addTo(map);

$.getJSON("/map/data/busstops", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {
    try {
      var geo_json = JSON.parse(val.geo_data);
      busstopLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});

//Entrances

var entranceLayer = L.geoJSON('', {
  pointToLayer: function(feature, latlng) {
    var smallIcon = new L.Icon({
      iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/24/door-icon.png',
      iconSize: [24, 24],
    });
    return L.marker(latlng, {
      icon: smallIcon
    });
  }
}).addTo(map);

$.getJSON("/map/data/entrances", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {
    try {
      var geo_json = JSON.parse(val.geo_data);
      entranceLayer.addData(geo_json); //adding the json data to the building layer
    } catch (err) {
      console.log(err);
    }
  });
});
