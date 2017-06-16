var pointsPages = ".points.new, .points.edit, .points.create, .points.update";
var roomsPages = ".rooms.new, .rooms.edit, .rooms.create, .rooms.update";
var buildingsPages = ".buildings.new, .buildings.edit, .buildings.create, .buildings.update";
var departmentsPages = ".departments.new, .departments.edit, .departments.create, .departments.update";
var plansPages = ".plans.new, .plans.edit, .plans.create, .plans.update";

var locationsPages = buildingsPages.concat(",").concat(departmentsPages).concat(",").concat(pointsPages).concat(",").concat(roomsPages);
var mapPages = locationsPages.concat(",").concat(plansPages);

$(mapPages).ready(function() {
  map.init(mapOptions);
});
