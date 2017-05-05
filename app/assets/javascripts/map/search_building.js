//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

L.easyButton('fa-search', function(btn, map) {
  if (sidebar.isVisible()){
    sidebar.hide();
  }
  else {
    $("#sidebar").load( "/map/search_building", function() {
      sidebar.show();
    });
  }
}).addTo(map);