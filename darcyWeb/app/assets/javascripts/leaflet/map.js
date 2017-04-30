// this is the common setting to starting up the map

const centerMap = [-15.764544, -47.866929];

var map = L.map('map', {
    center: centerMap,
    zoom: 18,
    minZoom: 16
});

L.tileLayer('https://api.mapbox.com/styles/v1/kaironvzb/cj1m79xc9000p2sqrhrjdhel2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpcm9udnpiIiwiYSI6ImNpd21mbW0wbDAwNXMyenFpanlmbHZ6ZXAifQ.RtMAGQj_0ho54Rw6D812hw', {
    attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>\
                  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
