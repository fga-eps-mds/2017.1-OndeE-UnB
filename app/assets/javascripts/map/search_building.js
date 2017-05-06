//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require leaflet/sidebar/index

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

$(document).ready(function () {

    var dataSource = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('country'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: "http://jsbin.com/nepazu/1.json"
        }
    });


    dataSource.initialize();

    $('.typeahead').typeahead({
        highlight: true
    }, {
        displayKey: 'country',
        source: dataSource.ttAdapter()
    });

});