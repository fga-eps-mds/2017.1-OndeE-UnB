//= require introjs

L.easyButton('fa-question-circle', function(btn, map) {
  introJs().setOption('showProgress', true).setOption("showStepNumbers", false).start();
}).addTo(map);

$(".leaflet-control-zoom")
  .attr("data-intro", "Oi")
  .attr("data-step", "3")
  .attr("data-position", "auto");
$(".leaflet-bar.easy-button-container.leaflet-control")
  .attr("data-intro", "Rota")
  .attr("data-step", "4")
  .attr("data-position", "auto");
  $(".leaflet-bar.easy-button-container.leaflet-control")
    .attr("data-intro", "Rota")
    .attr("data-step", "6")
    .attr("data-position", "auto");
$(".leaflet-control-layers.leaflet-control")
  .attr("data-intro", "Filtro")
  .attr("data-step", "5")
  .attr("data-position", "auto");

introJs().setOption('showProgress', true).setOption("showStepNumbers", false).start();
