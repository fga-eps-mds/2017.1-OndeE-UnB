var centerMap = [-15.764544, -47.866929];

var map = L.map('map', {
    center: centerMap,
    zoom: 18,
    minZoom: 16,
    maxZoom: 25
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
