//= require leaflet/context-menu
// this is the common setting to starting up the map

const centerMap = [-15.764544, -47.866929];

var map = L.map('map', {
    center: centerMap,
    zoom: 18,
    minZoom: 16,
    contextmenu: true,
      contextmenuWidth: 140,
  	contextmenuItems: [{
  	    text: 'Show coordinates',
  	    callback: showCoordinates
  	}, {
  	    text: 'Center map here',
  	    callback: mapCenter
  	}, '-', {
  	    text: 'Zoom in',
  	    icon: 'images/zoom-in.png',
  	    callback: zoomIn
  	}, {
  	    text: 'Zoom out',
  	    icon: 'images/zoom-out.png',
  	    callback: zoomOut
  	}]

});

var url = "https://api.mapbox.com/styles/v1/kaironvzb/cj1y3dkki00042sn074lbuo5k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpcm9udnpiIiwiYSI6ImNpd21mbW0wbDAwNXMyenFpanlmbHZ6ZXAifQ.RtMAGQj_0ho54Rw6D812hw";

L.tileLayer(url, {
    attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>\
                  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function showCoordinates (e) {
	alert(e.latlng);
}

function mapCenter (e) {
	map.panTo(e.latlng);
}

function zoomIn (e) {
	map.zoomIn();
}

function zoomOut (e) {
	map.zoomOut();
}
