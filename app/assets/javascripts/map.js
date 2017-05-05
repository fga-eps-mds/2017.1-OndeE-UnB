//= require leaflet/map
//= require map/sidebar
//= require leaflet-easy-button/easy-button
//= require map/routes
//= require map/search_building

function onEachFeature(feature, layer) {
  layer.on('click', function() {
    //slidePanel.show('/map/building/1');
  });
}

L.marker(centerMap).addTo(map)
  .bindPopup('Onde É? UnB');

var buildingLayer = L.geoJSON('', {
  onEachFeature: onEachFeature
}).addTo(map); //adding the building layers to the map
map.addLayer(buildingLayer);

$.getJSON("/map/data", function(data) { //getting the json data
  var items = [];
  $.each(data, function(key, val) {
    var geo_json = JSON.parse(val.geo_data);
    buildingLayer.addData(geo_json); //adding the json data to the building layer
  });
});

map.on('click', function(e) {
  //slidePanel.hide();
});



var nbaTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nba.json'
});

var nhlTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nhl.json'
});

$('#multiple-datasets .typeahead').typeahead({
  highlight: true
},
{
  name: 'nba-teams',
  display: 'team',
  source: nbaTeams,
  templates: {
    header: '<h3 class="league-name">NBA Teams</h3>'
  }
},
{
  name: 'nhl-teams',
  display: 'team',
  source: nhlTeams,
  templates: {
    header: '<h3 class="league-name">NHL Teams</h3>'
  }
});