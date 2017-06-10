//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Map {


  constructor() {

    // enable and set options to the contextmenu
    map.contextmenu.enable();
    map.contextmenu.addItem({
      text: 'Rotas a partir daqui',
      callback: routesFromHere
    });
    map.contextmenu.addItem({
      text: 'Rotas para cá',
      callback: routesToHere
    });

  }


}
