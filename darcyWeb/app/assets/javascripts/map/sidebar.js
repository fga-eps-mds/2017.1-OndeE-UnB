//= require leaflet/sidebar

var sidebar = L.control.sidebar("sidebar", {
  position: "left",
  autoPan: false,
  closeButton: false
}).addTo(map);

$("#sidebar").bind("DOMSubtreeModified", function() {
  $(".close").click(function() {
    sidebar.hide();
  });
});
