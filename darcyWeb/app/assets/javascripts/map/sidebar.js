//= require leaflet/sidebar

var sidebar = L.control.sidebar("sidebar", {
    position: "left",
    autoPan: false,
    closeButton: false
}).addTo(map);

//var visible = sidebar.isVisible();

sidebar.on("show", function(){
  $(".close").click(function(){
    sidebar.hide();
  });
  //$(".leaflet-map-pane").css("height", "50%");
});
