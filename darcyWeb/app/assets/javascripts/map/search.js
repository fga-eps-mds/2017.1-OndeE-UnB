//= require leaflet/geojsonautocomplete
//= require jquery/typeahead

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/search/geo"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);

  sidebar.on('show', function() {
    var locations = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: '/map/search',
      remote: {
        url: '/map/search?search=%QUERY',
        wildcard: '%QUERY'
      }
    });

    $('.input-location .origin, .input-location .destination').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'locations',
      display: 'title',
      source: locations
    }).bind('typeahead:select', function(ev, suggestion) {
      var latLng = L.latLng(suggestion.latitude, suggestion.longitude);
      latLng['latlng'] = {
        lat: latLng.lat,
        lng: latLng.lng
      };
      if ($(this).hasClass('origin')) {
        routesFromHere(latLng);
      } else {
        routesToHere(latLng);
      }
    });
  });
});
