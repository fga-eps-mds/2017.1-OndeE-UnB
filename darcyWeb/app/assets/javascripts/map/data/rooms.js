// Set default color based on room type
const roomColor = function color(type) {
  var color = "#3F51B5";
  switch (type) {
    case "classroom":
      color = "#2196F3";
      break;
    case "laboratory":
      color = "#9C27B0";
      break;
    case "professor_room":
      color = "#F44336";
      break;
    case "study_room":
      color = "#00BCD4";
      break;
    case "amphitheater":
      color = "#8BC34A";
      break;
  }

  return color;
}

// Load rooms for specified building
var indoorLayer;
var loadRooms = function loadRooms(buildingKey) {
  $.get("/map/data/rooms/" + buildingKey, function(data) { //getting the json data

    var rooms = {
      "type": "FeatureCollection",
      "features": [],
    };

    data.forEach(function(room) {
      try {
        var geoJSON = JSON.parse(room.geo_data);
        geoJSON.features[0].properties.level = room.level.toString();

        geoJSON.features[0].properties.room = {
          id: room.id,
          acronym: room.acronym,
          title: room.title,
          type: room.room_type
        }
        rooms.features.push(geoJSON.features[0]);
      } catch (err) {
        console.log(err);
      }
    });

    indoorLayer = new L.Indoor(rooms, {
      onEachFeature: function(feature, layer) {

        layer.on("add", function(ev) {

          var content = layer.feature.properties.room.acronym;
          // Define the offset of the label based on the word length
          tooltipOptions.offset[0] = -(content.length)*acronymTooltipOffset;

          layer.bindTooltip(function(layer) {
            return content; // Needs to be a string
          }, tooltipOptions);
        });
        // Trigger when user click on a building
        layer.on("click", function() {
          // The key references to that building clicked
          var roomId = feature.properties.room.id;
          var urlToRoom = "/map/data/room/" + roomId;
          $("#sidebar").load(urlToRoom, function() {
            // shows the clicked room in the sidebar
            if (!sidebar.isVisible()) {
              sidebar.show();
            }
          });
        });
      },

      style: function(feature) {
        var fillColor = roomColor(feature.properties.room.type);

        return {
          fillColor: fillColor,
          weight: 1,
          color: "#666",
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
    sidebar.on("hide", function() {
      indoorLayer.onRemove(map);
      map.removeControl(levelControl);
    });

  });
}
