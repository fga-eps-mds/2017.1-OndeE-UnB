//= require leaflet/geojsonautocomplete
//= require jquery/typeahead

$(document).ready(function() {

  var options = {
    geojsonServiceAddress: "/map/search"
  };
  $("#searchContainer").GeoJsonAutocomplete(options);

  sidebar.on('show', function() {
    var locations = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: '/map/search',
      remote: {
        url: '/map/search',
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
    });
  });
});
//   sidebar.on('show', function() {
//     $('#route_origin, #route_destination').hide();
//     $('.input-location').GeoJsonAutocomplete(options);
//
//     $('#sidebar').find('.searchButton, .divider, .clearButton').remove();
//     $('#sidebar').find('.searchContainer').removeClass('searchContainer');
//     $('#sidebar').find('.searchBox').removeClass('searchBox').addClass('form-control');
//
//     $('#sidebar .form-control').find(".input-location.origin")
//       .find(".form-control").attr("autocomplete", "off").attr("placeholder", "Partindo de onde?");
//
//       $('#sidebar .form-control').find(".input-location.destination")
//         .find(".form-control").attr("autocomplete", "off").attr("placeholder", "Para onde?");
//
//     $('.input-location').each(function(index, input){
//       $(input).on('DOMSubtreeModified', function() {
//         console.log($(this).find("ul").html())
//         $(this).find("li").each(function(index, listItem)){
//
//           $(listItem)
//             var latLng = L.latLng($(this).data('latitude'), $(this).data('longitude'));
//             latLng['latlng'] = {
//               lat: latLng.lat,
//               lng: latLng.lng
//             };
//             if($(input).hasClass('origin')){
//               routesFromHere(latLng);
//             } else {
//               routesToHere(latLng);
//             }
//
//         });
//       });
//     });
//   });
// });
