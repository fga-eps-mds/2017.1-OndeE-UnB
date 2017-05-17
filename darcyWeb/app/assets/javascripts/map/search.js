//= require leaflet/geojsonautocomplete

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/collect_building_data"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);

});
