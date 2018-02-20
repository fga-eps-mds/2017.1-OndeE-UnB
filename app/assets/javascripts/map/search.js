//= require leaflet/geojsonautocomplete
//= require jquery/typeahead

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/search/geo"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);
});
