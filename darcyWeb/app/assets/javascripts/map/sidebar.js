//= require leaflet/sidebar

var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
}).addTo(map);

var visible = sidebar.isVisible();

// assign options settings to sidebar
Object.assign(sidebar, {
  mode: null
});
