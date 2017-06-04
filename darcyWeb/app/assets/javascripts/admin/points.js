//Loads and save points
$('.points.new .points.edit').ready(function() {
  const $point_geo_data = {
    element: $('#point_geo_data'),
    save: function(geo_json) {
      this.element.val(JSON.stringify(geo_json.toGeoJSON()));
    },
    //Points have some problem beeing loaded, cannot edit after point saved
    load: function() {
      const $geo_json = this.element.val();
      if ($geo_json) {
        drawnLayerPoints.addData(JSON.parse($geo_json));
      }
    }
  };

  $point_geo_data.load();

  //Loads and save coordinates related to points
  const $point_coords = {
    element_lat: $('#point_latitude'),
    element_lng: $('#point_longitude'),
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

  $point_coords.load();

  //Adicionate layer of points to map
  var drawnLayerPoints = L.geoJSON().addTo(map);
  map.addLayer(drawnLayerPoints);

  //Sets control to create new point, marker by default is present
  var drawControlPoints = new L.Control.Draw({
    edit: {
      featureGroup: drawnLayerPoints
    },
    draw: {
      polyline: false,
      circle: false,
      rectangle: false,
      polygon: false,
      marker: true
    }
  });

  map.on(L.Draw.Event.CREATED, function(event) {
    var pointLayer = event.layer;
    //After put an point to create, the coordinates are displayed in the form of creation of points
    const $centerPoint = pointLayer.getLatLng();
    $point_coords.save($centerPoint.lat, $centerPoint.lng);

    drawnLayerPoints.addLayer(pointLayer);
    $point_geo_data.save(drawnLayerPoints);

    //This was the only way finded to remove marker option
    drawControlPoints.setDrawingOptions({
      marker: false
    });
    map.removeControl(drawControlPoints);
    map.addControl(drawControlPoints);
  });

  map.on(L.Draw.Event.EDITED, function(event) {
    //takes the latitude and longitude and update according new edited point
    const $centerPoint = drawnLayerPoints.getLayers()[0].getLatLng();
    $point_coords.save($centerPoint.lat, $centerPoint.lng);
    $point_geo_data.save(drawnLayerPoints);
  });

  map.on(L.Draw.Event.DELETED, function(event) {
    $point_geo_data.save(drawnLayerPoints);
    //Puts again the marker as option
    drawControlPoints.setDrawingOptions({
      marker: true
    });
    map.removeControl(drawControlPoints);
    map.addControl(drawControlPoints);
  });

  map.addControl(drawControlPoints);
});
