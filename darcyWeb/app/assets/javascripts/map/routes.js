//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/form
//= require map/route
//= require map/map


Map = new Map();
Route = new Route();
Form = new Form(Map, Route);


Form.load();
Form.addButton();
Form.registerControlEvents();



// TODO Require to fill out origin and destination in the form, before calculate route
// TODO Add button to create a new route
// TODO Suggest locations on whe form
// TODO Suggest locations on whe form
