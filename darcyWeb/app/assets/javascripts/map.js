//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet/easy-button
//= require map/routes
//= require map/search
//= require leaflet/indoor-map


//Buildings

//Method called when click on one building
function onEachFeature(feature, layer) {
  layer.on('click', function() {
    //The key references to that building clicked
    var buildingKey = this.feature.geometry.coordinates[0].key;

    if (sidebar.isVisible()) {
      sidebar.hide();
    } else {
      //selects the building clicked and shows sidebar
      var numberToBuilding = '/map/data/building/' + buildingKey;
      $("#sidebar").load(numberToBuilding, function() {
        sidebar.toggle();
      });
    }
  });
}

var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
});

//adds layer of building on map
map.addLayer(buildingLayer);

//Insert each building on the layer of building
$.getJSON("/map/data/buildings", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {

    try {
      var geo_json = JSON.parse(val.geo_data);
      geo_json.features[0].geometry.coordinates[0].key = val.id;
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
});

//adds layer to bikes on map
map.addLayer(bikesLayer);

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
});

//adds layer to bathroom on map
map.addLayer(bathroomLayer);

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
});

map.addLayer(snackbarLayer);

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
});

map.addLayer(busstopLayer);

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
});

map.addLayer(entranceLayer);

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

//Indoor map

// Indoor Map


//Indoor Map

// $.getJSON("#", function(geoJSON) {
var data = [];
var indoorLayer = new L.Indoor(data, {
  getLevel: function(feature) {
    if (feature.properties.relations.length === 0)
      return null;

    return feature.properties.relations[0].reltags.level;
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup(JSON.stringify(feature.properties, null, 4));
  },
  style: function(feature) {
    var fill = 'white';

    if (feature.properties.tags.buildingpart === 'corridor') {
      fill = '#169EC6';
    } else if (feature.properties.tags.buildingpart === 'verticalpassage') {
      fill = '#0A485B';
    }

    return {
      fillColor: fill,
      weight: 1,
      color: '#666',
      fillOpacity: 1
    };
  }
});

indoorLayer.setLevel("0");

indoorLayer.addTo(map);

var levelControl = new L.Control.Level({
  level: "0",
  levels: indoorLayer.getLevels()
});

// Connect the level control to the indoor layer
levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);

levelControl.addTo(map);
// });
