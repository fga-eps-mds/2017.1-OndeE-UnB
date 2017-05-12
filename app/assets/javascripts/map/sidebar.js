//= require leaflet/sidebar

var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
}).addTo(map);

var visible = sidebar.isVisible();
