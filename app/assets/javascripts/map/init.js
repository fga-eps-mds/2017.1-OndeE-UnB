// instantiate the map
mapOptions.contextmenu = true;
mapOptions.contextmenuWidth = 140;
mapOptions.baseLayer = "Mapa";
map.init(mapOptions);

var tooltipOptions = {
  offset: [0, 0],
  permanent: true,
  direction: "right",
  opacity: 1,
  className: "tooltip"
};

const acronymTooltipOffset = 6;
const titleTooltipOffset = 3;
const zoomTooltipShow = 16; // the zoom which the tooltip will be shown
const zoomTooltipRoom = 20; // the zoom which the tooltip content will be changed
const zoomTooltipBuilding = 18; // the zoom which the tooltip content will be changed

var buildingStyles = {}

buildingStyles["Satélite"] = {
  color: '#856FC1',
  fillOpacity: 0.5
}

buildingStyles["Mapa"] = {
  color: '#6a7c83',
  fillOpacity: 1
}
var roomStyles = {}

roomStyles["Satélite"] = {
  fillOpacity: 0.3
}

roomStyles["Mapa"] = {
  fillOpacity: 1
}
