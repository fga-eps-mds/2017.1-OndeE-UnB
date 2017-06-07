//= require leaflet/geojsonautocomplete

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/search"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);

  //sidebar.on('shown', function(){
  //	$('.input-location').GeoJsonAutocomplete(options);
  //	$('.searchButton, .divider, .clearButton').remove();
  //})
});
