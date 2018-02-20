var drawnLayer;
var drawControl;

$(locationsPages).ready(function() {

  //map.init(mapOptions);

  drawnLayer = L.geoJSON().addTo(map);
  drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnLayer
    },
    draw: {
      polyline: false,
      circle: false,
      rectangle: false,
      marker: false,
      polygon: false
    }
  });

  // enable drawing if there are no drawings on the map.
  drawControl.enableDrawing = function enableDrawing(options) {
    if (drawnLayer.getLayers().length == 0) {
      drawControl.update(options);
    }
  }

  // disable drawing if there are drawings on the map.
  drawControl.disableDrawing = function disableDrawing(options) {
    if (drawnLayer.getLayers().length > 0) {
      drawControl.update(options);
    }
  }

  // updates the control by removing it and then adding it again
  drawControl.update = function updatesControl(options) {
    drawControl.setDrawingOptions(options);
    map.removeControl(drawControl);
    map.addControl(drawControl);
  }

  map.addControl(drawControl);

  const locationGeoData = {
    $element: $("input[id$='_geo_data']"),
    save: function(geo_json) {
      this.$element.val(JSON.stringify(geo_json.toGeoJSON()));
    },
    load: function() {
      const geoJSON = this.$element.val();
      if (geoJSON) {
        drawnLayer.addData(JSON.parse(geoJSON));
        map.setView(drawnLayer.getBounds().getCenter());
      }
    }
  };

  const locationCoods = {
    $elementLat: $("input[id$='_latitude']"),
    $elementLng: $("input[id$='_longitude']"),
    save: function(layer) {
      var feature = layer.getLayers()[0];
      var center;

      if (feature instanceof L.Marker) {
        center = feature.getLatLng();
      } else {
        center = feature.getBounds().getCenter();
      }

      this.$elementLat.val(center.lat);
      this.$elementLng.val(center.lng);
    },
    load: function() {
      const lat = this.$elementLat.val();
      const lng = this.$elementLng.val();
    }
  }
  locationCoods.load();

  // Load json from the form
  locationGeoData.load();

  map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnLayer.addLayer(layer);
    locationGeoData.save(drawnLayer);

    // sets the center coordinates accoding to the drawn feature
    locationCoods.save(drawnLayer);
  });

  map.on(L.Draw.Event.EDITED, function(event) {
    locationGeoData.save(drawnLayer);
    // sets the center coordinates accoding to the drawn feature
    locationCoods.save(drawnLayer);
  });
  map.on(L.Draw.Event.DELETED, function(event) {
    locationGeoData.save(drawnLayer);
  });
});
