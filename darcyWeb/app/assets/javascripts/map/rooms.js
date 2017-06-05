// Set default color based on room type
const roomColor = function color(type){
  var color = 'white';
  switch (type) {
    case 'classroom':
      color = '#169EC6';
      break;
    case 'laboratory':
      color = '#0A485B';
      break;
  }

  return color;
}

// Load rooms for specified building
var loadRooms = function loadRooms(buildingKey){
  $.get('/map/data/roomsByBuilding/'+ buildingKey, function(data) { //getting the json data

    var rooms = {
      'type': 'FeatureCollection',
      'features': [],
    };

    data.forEach((room)=>{
      try {
        var geo_json = JSON.parse(room.geo_data);
        geo_json.features[0].properties.level = room.level.toString();
        geo_json.features[0].properties.roomType = room.room_type;
        rooms.features.push(geo_json.features[0]);
      } catch (err) {
        console.log(err);
      }
    })

    var indoorLayer = new L.Indoor(rooms, {
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

    // set the default level
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
