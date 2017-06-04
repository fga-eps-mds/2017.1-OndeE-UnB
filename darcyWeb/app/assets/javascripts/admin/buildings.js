//= require leaflet/draw
//= require leaflet/map
//= require leaflet/easy-button
//= require leaflet/draw.translations

$('.buildings.new .buildings.edit').ready(function() {
  const $building_geo_data = {
    element: $('#building_geo_data'),
    save: function(geo_json) {
      this.element.val(JSON.stringify(geo_json.toGeoJSON()));
    },
    load: function() {
      const $geo_json = this.element.val();
      if ($geo_json) {
        drawnLayer.addData(JSON.parse($geo_json));
      }
    }
  };

  const $building_coords = {
    element_lat: $('#building_latitude'),
    element_lng: $('#building_longitude'),
    save: function(lat, lng) {
      if (this.element_lat.val(lat) && this.element_lng.val(lng)) {
        return true;
      } else {
        return false;
      }
    },
    load: function() {
      const $lat = this.element_lat.val();
      const $lng = this.element_lng.val();
      if ($lat && $lng) {
        map.flyTo(new L.LatLng($lat, $lng));
      }
    }
  }
  $building_coords.load();

  var drawnLayer = L.geoJSON().addTo(map);
  map.addLayer(drawnLayer);

  // Load json from the form
  $building_geo_data.load();

  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnLayer
    },
    draw: {
      polyline: false,
      circle: false,
      rectangle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true
      }
    }
  });

  map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnLayer.addLayer(layer);
    $building_geo_data.save(drawnLayer);
  });

  map.on(L.Draw.Event.EDITED, function(event) {
    $building_geo_data.save(drawnLayer);
  });

  map.on(L.Draw.Event.DELETED, function(event) {
    $building_geo_data.save(drawnLayer);
  });

  map.addControl(drawControl);

  L.easyButton('fa-map-marker', function(btn, map) {
    const $center = map.getCenter();
    $building_coords.save($center.lat, $center.lng);
  }).addTo(map);
});
