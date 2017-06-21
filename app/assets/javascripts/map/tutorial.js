//= require introjs

var introJs = introJs().setOption("nextLabel", " Próximo ")
.setOption("prevLabel", "Anterior")
.setOption("skipLabel", "Fechar")
.setOption("doneLabel", "Fechar")
.setOption("showStepNumbers", false);


L.easyButton("fa-question-circle", function(btn, map) {
  introJs.start();
}).addTo(map);

$(".navbar")
  .attr("data-intro",
  "<h2>WELCOME!</h2> Facilite seu trajeto pela universidade com o <b>Onde é? UnB</b>, através dele você será capaz de traçar rotas entre edifícios, localizar salas, prédios, departamentos e muito mais. Para conhecer mais sobre a aplicação clique em <b>Próximo</b>.")
  .attr("data-step", "1")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "bottom-middle-aligned");
$("#searchContainer")
  .attr("data-intro",
  "<h2>PESQUISA</h2> Aqui é possível pesquisar qualquer <b>prédio</b>, <b>sala</b> e <b>departamento</b> da universidade!")
  .attr("data-step", "2")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "bottom-middle-aligne");
$(".leaflet-control-zoom")
  .attr("data-intro",
  "<h2>ZOOM</h2> Para interagir melhor com o mapa é possível dar zoom nos lugares do seu interesse. Basta clicar nos sinais de <b>+</b> e <b>-</b>.")
  .attr("data-step", "3")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "auto");
$(".leaflet-bar.easy-button-container.leaflet-control").eq(0)
  .attr("data-intro",
  "<h2>ROTAS</h2> Clicando nesse botão e inserindo o <b>Local de Partida</b> e o <b>Local de chegada</b>, uma rota será traçada e você vai conseguir navegar pela universidade sem nenhum problema!")
  .attr("data-step", "4")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "auto");
$(".leaflet-control-layers.leaflet-control")
  .attr("data-intro",
  "<h2>PONTOS</h2> Aqui você será capaz de localizar diversos pontos da universidade, como <b>bicicletários</b>, <b>banheiros</b>, <b>lanchonetes</b>, <b>pontos de acesso</b> e <b>pontos de ônibus</b>!")
  .attr("data-step", "5")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "auto");
$(".leaflet-contextmenu")
  .attr("data-intro",
  "<h2>MENU</h2> Clicando com o botão direito do mouse no mapa um menu irá aparecerá com opções para selecionar <b>rotas</b> e <b>compartilhar sua posição</b>!")
  .attr("data-step", "6")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "bottom-middle-aligne");
$(".leaflet-bar.easy-button-container.leaflet-control").eq(1)
  .attr("data-intro",
  "<h2>FIM!</h2> Chegamos ao fim! Caso tenha alguma <b>dúvida</b> ou queira ver o tutorial denovo clique nesse <b>botão</b>")
  .attr("data-step", "7")
  .attr("data-tooltipClass", "tutorialStyle")
  .attr("data-position", "auto");

introJs.oncomplete(function() {
  map.contextmenu.hide();
  localStorage.setItem("hideTutorial", true);
});
introJs.onexit(function(){
  localStorage.setItem("hideTutorial", true);
});

window.addEventListener("load", function() {
  if(!localStorage.hasOwnProperty("hideTutorial")){
    introJs.start();
  }
});

introJs.onchange(function(element){
  var step = $(element).data("step");
  if (step == 6){
    // var center = map.getCenter();
    map.contextmenu.showAt(L.latLng(-15.759648154527714, -47.86931991577149));
  } else {
    map.contextmenu.hide();
  }
});
