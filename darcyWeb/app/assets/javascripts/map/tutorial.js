//= require introjs

var introJs = introJs().setOption("nextLabel", " Próximo ")
.setOption("prevLabel", "Anterior")
.setOption("skipLabel", "Fechar")
.setOption("doneLabel", "Fechar")
.setOption("showStepNumbers", false);


L.easyButton('fa-question-circle', function(btn, map) {
  introJs.start();
}).addTo(map);

$(".navbar")
  .attr("data-intro",
  "<h2>Welcome!</h2><b> ao Onde é? Unb Aqui iremos mostrar como utilizar o nosso site")
  .attr("data-step", "1")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "auto");
$("#searchContainer")
  .attr("data-intro",
  "Aqui é possível pesquisar qualquer prédio, sala e departamento")
  .attr("data-step", "2")
  .attr("data-position", "auto");
$(".leaflet-control-zoom")
  .attr("data-intro", "Oi")
  .attr("data-step", "3")
  .attr("data-position", "auto");
$(".leaflet-bar.easy-button-container.leaflet-control").eq(0)
  .attr("data-intro", "Rota")
  .attr("data-step", "4")
  .attr("data-position", "auto");
$(".leaflet-control-layers.leaflet-control")
  .attr("data-intro", "Filtro")
  .attr("data-step", "5")
  .attr("data-position", "auto");
$(".leaflet-bar.easy-button-container.leaflet-control").eq(1)
  .attr("data-intro", "Rota")
  .attr("data-step", "6")
  .attr("data-position", "auto");
$(".leaflet-contextmenu")
  .attr("data-intro", "Context")
  .attr("data-step", "7")
  .attr("data-position", "auto");
$(".leaflet-bar.easy-button-container.leaflet-control").eq(1)
  .attr("data-intro", "Botão Tutorial")
  .attr("data-step", "8")
  .attr("data-position", "auto");

introJs.oncomplete(function() {
  map.contextmenu.hide();
  localStorage.setItem("hideTutorial", true);
});
introJs.onexit(function(){
  localStorage.setItem("hideTutorial", true);
});

window.addEventListener("load", function() {
  if(!localStorage.hasOwnProperty('hideTutorial')){
    introJs.start();
  }
});

introJs.onchange(function(element){
  var step = $(element).data("step");
  if (step == 7){
    var center = map.getCenter();
    map.contextmenu.showAt(center);
  } else {
    map.contextmenu.hide();
  }
});
