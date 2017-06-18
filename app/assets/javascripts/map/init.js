// instantiate the map
mapOptions.contextmenu = true;
mapOptions.contextmenuWidth = 140;
map.init(mapOptions);

var tooltipOptions = {
  offset: [0, 0],
  permanent: true,
  direction: 'right',
  opacity: 1,
  className: 'tooltip'
};

const acronymTooltipOffset = 6;
const titleTooltipOffset = 3;
const zoomTooltipRoom = 20; // the zoom which the tooltip content will be changed
const zoomTooltipBuilding = 18; // the zoom which the tooltip content will be changed
