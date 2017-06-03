//= require leaflet/sidebar

var sidebar = L.control.sidebar('sidebar', {
    position: 'left',
    autoPan: false,
    closeButton: false
}).addTo(map);

//var visible = sidebar.isVisible();

sidebar.on('show', function(){
  //$('.leaflet-map-pane').css('height', '50%');
});

// sidebar.on('shown', function () {
//   var myBlock = document.getElementsByClassName('sidebar-header')[0];
//
//   var mc = new Hammer(myBlock);
//
//   var pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
//
//   var sidebarEl = $('#sidebar');
//
//   mc.add(pan);
//
//   mc.on("pan", handleDrag);
//
//   var lastPosY = 0;
//   function handleDrag(ev) {
//
//     console.log('okkk');
//
//     var elem = ev.target;
//
//     lastPosY = sidebarEl.css('top');
//     console.log(parseInt(lastPosY));
//
//     var posY = ev.deltaY + lastPosY;
//
//     sidebarEl.css('top', posY + "px");
//     sidebarEl.height('50px');
//   }
//
// });
