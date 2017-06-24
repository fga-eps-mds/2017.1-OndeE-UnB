//= require leaflet/sidebar

var sidebar = L.control.sidebar("sidebar", {
    position: "left",
    autoPan: false,
    closeButton: false
}).addTo(map);

sidebar.on("show", function(){
  $(".close").click(function(){
    sidebar.hide();
  });
});
