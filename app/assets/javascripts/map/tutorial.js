//= require introjs

$(".leaflet-control-zoom")
  .attr("data-intro", "Oi")
  .attr("data-step", "3")
  .attr("data-position", "auto");
$(".leaflet-control-layers.leaflet-control")
  .attr("data-intro", "Filtro")
  .attr("data-step", "4")
  .attr("data-position", "auto");
$(".leaflet-bar.easy-button-container.leaflet-control")
.attr("data-intro", "Rota")
.attr("data-step", "5")
.attr("data-position", "auto");
//$("a.introjs-button.introjs-skipbutton")

introJs().setOption('showProgress', true).start();
