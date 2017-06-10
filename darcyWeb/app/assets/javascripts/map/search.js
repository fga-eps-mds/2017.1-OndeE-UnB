//= require leaflet/geojsonautocomplete

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/search"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);

  sidebar.on('show', function() {
    $('#route_origin, #route_destination').hide();
    $('.input-location').GeoJsonAutocomplete(options);

    $('.searchButton, .divider, .clearButton').remove();

    $('.input-location').each(function(index, input){
      $(input).on('DOMSubtreeModified', function() {
        $(this).find('li').on('mouseenter', function() {
            var latLng = L.latLng($(this).data('latitude'), $(this).data('longitude'));
            latLng['latlng'] = {
              lat: latLng.lat,
              lng: latLng.lng
            };
            if($(input).hasClass('origin')){
              routesFromHere(latLng);
            } else {
              routesToHere(latLng);
            }

        });
      });
    });
  });
});
