//= require leaflet/draw
//= require leaflet/map
//= require leaflet/easy-button
//= require leaflet/draw.translations

const $department_geo_data = {
  element: $("#department_geo_data"),
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

const $department_coords = {
  element_lat: $("#department_latitude"),
  element_lng: $("#department_longitude"),
  save: function(lat, lng){
    this.element_lat.val(lat);
    this.element_lng.val(lng);
  },
  load: function(){
    const $lat = this.element_lat.val();
    const $lng = this.element_lng.val();
    if ($lat && $lng) {
        map.flyTo(new L.LatLng($lat, $lng));
    }
  }
}
$department_coords.load();


var drawnLayer = L.geoJSON().addTo(map);
map.addLayer(drawnLayer);

// Load json from the form
$department_geo_data.load();

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnLayer
    },
    draw: {
        polyline: false,
        circle: false,
        rectangle: false,
        // polygon: {
        //     allowIntersection: false,
        //     showArea: false
        // }
        polygon: false,
        marker: true
    }
});


map.on(L.Draw.Event.CREATED, function (event) {
    var pointLayer = event.layer;
    //After put an point to create, the coordinates are displayed in the form of creation of points
    const $centerPoint = pointLayer.getLatLng();
    $department_coords.save($centerPoint.lat, $centerPoint.lng);

    drawnLayer.addLayer(pointLayer);
    $department_geo_data.save(drawnLayer);

    //This was the only way finded to remove marker option
    drawControl.setDrawingOptions({
      marker: false
    });
    map.removeControl(drawControl);
    map.addControl(drawControl);
});

map.on(L.Draw.Event.EDITED, function(event) {
    //takes the latitude and longitude and update according new edited point
    const $centerPoint = drawnLayer.getLayers()[0].getLatLng();
    $department_coords.save($centerPoint.lat, $centerPoint.lng);
    $department_geo_data.save(drawnLayer);
});

map.on(L.Draw.Event.DELETED, function(event) {
    $department_geo_data.save(drawnLayer);
    //Puts again the marker as option
    drawControl.setDrawingOptions({
      marker: true
    });
    map.removeControl(drawControl);
    map.addControl(drawControl);
});

map.addControl(drawControl);
