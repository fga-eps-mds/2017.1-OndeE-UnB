//= require leaflet/sidebar

var sidebar = L.control.sidebar("sidebar", {
    position: "left",
    autoPan: false,
    closeButton: false
}).addTo(map);

//var visible = sidebar.isVisible();

sidebar.on("show", function(){
  //$(".leaflet-map-pane").css("height", "50%");
});
