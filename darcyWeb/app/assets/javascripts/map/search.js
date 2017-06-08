//= require leaflet/geojsonautocomplete

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/search"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);

});
