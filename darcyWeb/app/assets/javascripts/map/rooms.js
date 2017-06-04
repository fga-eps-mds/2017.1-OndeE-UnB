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
const loadRooms = function loadRooms(buildingKey){
  $.get('/map/data/roomsByBuilding/'+ buildingKey, function(data) { //getting the json data

    let rooms = {
      'type': 'FeatureCollection',
      'features': [],
    };

    data.forEach((room)=>{
      console.log(room);
      try {
        let geo_json = JSON.parse(room.geo_data);
        geo_json.features[0].properties.level = room.level;
        geo_json.features[0].properties.roomType = room.room_type;
        rooms.features.push(geo_json.features[0]);
      } catch (err) {
        console.log(err);
      }
    })

    let indoorLayer = new L.Indoor(rooms, {
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
    indoorLayer.setLevel("0");
    indoorLayer.addTo(map);

    var levelControl = new L.Control.Level({
      level: "0",
      levels: indoorLayer.getLevels(),
    });

    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);
    levelControl.addTo(map);

    sidebar.on('hide', function(){
      // FIXME Remove indoorLayer and levelControl when the sidebar is hidden
      map.removeLayer(indoorLayer);
      map.removeControl(levelControl);
    });

  });
}
