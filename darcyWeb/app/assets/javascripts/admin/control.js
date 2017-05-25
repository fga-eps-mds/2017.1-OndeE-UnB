function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var currentUrl = window.location.href;

var isOnBuildingsUrl = endsWith(currentUrl, "buildings/new");
var isOnPointsUrl = endsWith(currentUrl, "points/new");

//selects the right control
if(isOnBuildingsUrl) {
  map.removeControl(drawControlPoints);
} else if(isOnPointsUrl) {
  map.removeControl(drawControl);
}