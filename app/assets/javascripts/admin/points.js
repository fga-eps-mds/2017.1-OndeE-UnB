const $point_geo_data = {
  element: $('#point_geo_data'),
  save: function(geo_json){
    this.element.val(JSON.stringify(geo_json.toGeoJSON()));
  },
  load: function(){
    const $geo_json = this.element.val();
    if ($geo_json) {
        drawnLayer.addData(JSON.parse($geo_json));
    }
  }
};

$point_geo_data.load();


const $point_coords = {
  element_lat: $('#point_latitude'),
  element_lng: $('#point_longitude'),
  save: function(lat, lng){
    if (this.element_lat.val(lat) && this.element_lng.val(lng)) {
      return true;
    } else {
    return false; }
  },
  load: function(){
    const $lat = this.element_lat.val();
    const $lng = this.element_lng.val();
    if ($lat && $lng) {
        map.flyTo(new L.LatLng($lat, $lng));
    }
  }
}
$point_coords.load();

var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);


var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnLayer
    },
    draw: {
        polyline: false,
        circle: false,
        rectangle: false,
        polygon: false
    }
});

map.on(L.Draw.Event.CREATED, function(event) {
    var pointLayer = event.layer;


    const $centerPoint = pointLayer.getLatLng();
    $point_coords.save($centerPoint.lat, $centerPoint.lng);
    drawnLayer.addLayer(pointLayer);
    $point_geo_data.save(drawnLayer);

    drawControl.setDrawingOptions({
        marker: false
    });
    map.removeControl(drawControl);
    map.addControl(drawControl);

});

map.on(L.Draw.Event.EDITED, function(event) {

  const $centerPoint = drawnLayer.getLayers()[0].getLatLng()
  $point_coords.save($centerPoint.lat, $centerPoint.lng);

    $point_geo_data.save(drawnLayer);
});

map.on(L.Draw.Event.DELETED, function(event) {
    $point_geo_data.save(drawnLayer);
      drawControl.setDrawingOptions({
          marker: true
      });
      map.removeControl(drawControl);
    map.addControl(drawControl);
});

map.addControl(drawControl);
