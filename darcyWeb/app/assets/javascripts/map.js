//= require leaflet/map
//= require leaflet/awesome-markers
//= require map/sidebar
//= require leaflet/easy-button
//= require map/routes
//= require map/search

// = r equire map/points


//Buildings

//Method called when click on one building
function onEachFeature(feature,layer){
    layer.on('click', function(){
        //The key references to that building clicked
        var buildingKey = this.feature.geometry.coordinates[0].key;

        if(sidebar.isVisible()){
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

//Bikes

//Layer with bikes icon personalized
var bikesLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/24/bike-icon.png',
        });
        return L.marker(latlng, {icon: smallIcon});
    }
});

//adds layer to bikes on map
map.addLayer(bikesLayer);

//Insert each bicycle rack on the layer of bikes
$.getJSON( "/map/data/bikes", function(data) { //getting the json data
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


var departmentLayer = L.geoJSON('');

var departmentIcon = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/professionals-line/2048/1606_-_Secretary-512.png',
    iconUrl: 'https://drive.google.com/uc?export=view&id=0B8jEDVP6IcfKOVJscS1LRHlMemc'
});

map.addLayer(departmentLayer);

$.getJSON("/map/data/departments", function(data) { //getting the json data
  console.log(data);
  var items = [];
  $.each(data, function(key, val) {
    try {

      console.log('Load Departments');
      var geo_json = JSON.parse(val.geo_data);
      var coordinates = geo_json.features[0].geometry.coordinates;
      //console.log(geo_data);
      //departmentLayer.addData(geo_json); //adding the json data to the departament layer
      L.marker([coordinates[1], coordinates[0]], {icon: departmentIcon}).addTo(map);
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
  //console.log("Lat and Lng");
  if (! $.isEmptyObject(latlng) ) {
    //console.log('Create marker');
    //console.log(waypoint);
    //console.log(latlng);
    waypoint.marker = L.marker(latlng, {
      icon: L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: waypoint.icon,
        markerColor: waypoint.color
      })
    });
    map.addLayer(waypoint.marker);

    map.setView(latlng,32, {animate: true});
    //map.setZoom(200, {animate: true});
  }
}


createMarker(sharedLocation, getUrlVars());







//Bathrooms

//Layer with bathroom icon personalized
var bathroomLayer = L.geoJSON('', {
    pointToLayer: function(feature, latlng) {
        var smallIcon = new L.Icon({
            iconUrl: 'http://icons.iconarchive.com/icons/rokey/smooth/32/toilet-paper-icon.png',
            iconSize: [24, 24],
        });
        return L.marker(latlng, {icon: smallIcon});
    }
});

//adds layer to bathroom on map
map.addLayer(bathroomLayer);

//Insert each bathroom on the layer of bathrooms
$.getJSON( "/map/data/bathrooms", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            bathroomLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
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
        return L.marker(latlng, {icon: smallIcon});
    }
});

map.addLayer(snackbarLayer);

$.getJSON( "/map/data/snackbars", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            snackbarLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
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
        return L.marker(latlng, {icon: smallIcon});
    }
});

map.addLayer(busstopLayer);

$.getJSON( "/map/data/busstops", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            busstopLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
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
        return L.marker(latlng, {icon: smallIcon});
    }
});

map.addLayer(entranceLayer);

$.getJSON( "/map/data/entrances", function(data) { //getting the json data
    var items = [];
    $.each(data, function (key, val){
        try {
            var geo_json = JSON.parse(val.geo_data);
            entranceLayer.addData(geo_json); //adding the json data to the building layer
        } catch(err) {
          console.log(err);
        }
    });
});
