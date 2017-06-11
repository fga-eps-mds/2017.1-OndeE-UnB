// Set default color based on room type
const roomColor = function color(type){
  var color = 'white';
  switch (type) {
    case 'classroom':
      color = '#2196F3';
      break;
    case 'laboratory':
      color = '#9C27B0';
      break;
    case 'professor_room':
      color = '#F44336';
      break;
    case 'study_room':
      color = '#00BCD4';
      break;
    case 'amphitheater':
      color = '#8BC34A';
      break;
  }

  return color;
}

// Load rooms for specified building
var loadRooms = function loadRooms(buildingKey){
  $.get('/map/data/rooms/'+ buildingKey, function(data) { //getting the json data

    var rooms = {
      'type': 'FeatureCollection',
      'features': [],
    };

    data.forEach(function(room){
      try {
        var geo_json = JSON.parse(room.geo_data);
        geo_json.features[0].properties.level = room.level.toString();
        geo_json.features[0].properties.id = room.id;
        geo_json.features[0].properties.roomType = room.room_type;
        rooms.features.push(geo_json.features[0]);
      } catch (err) {
        console.log(err);
      }
    });

    var indoorLayer = new L.Indoor(rooms, {
      onEachFeature: function(feature, layer) {
          // Trigger when user click on a building
          layer.on('click', function() {
            // The key references to that building clicked
            var roomKey = feature.properties.id ;

            if (sidebar.isVisible()) {
              sidebar.hide();
            } else {
              //selects the building clicked and shows sidebar
              var numberToRoom = '/map/data/room/' + roomKey;
              $("#sidebar").load(urlToRoom, function() {
                sidebar.toggle();
              });
            }
          });
  },

      style: function(feature) {
        var fillColor = roomColor(feature.properties.roomType);

        return {
          fillColor: fillColor,
          weight: 1,
          color: '#666',
          fillOpacity: 1
        };
      }
    });

    // Set the default level
    var levels = indoorLayer.getLevels();
    var level = levels[0];

    indoorLayer.addTo(map);
    indoorLayer.setLevel(level);

    var levelControl = new L.Control.Level({
      level: level,
      levels: levels,
    });

    // Listener to level control
    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);
    levelControl.addTo(map);

    // Clean indoor when toogled
    sidebar.on('hide', function(){
      indoorLayer.clean();
      map.removeControl(levelControl);
    });

  });
}
