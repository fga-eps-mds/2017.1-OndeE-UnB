//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/form
//= require map/route
//= require map/util


class Map {

  constructor() {

    const self = this;

    // enable and set options to the contextmenu
    map.contextmenu.enable();
    map.contextmenu.addItem({
      text: 'Rotas a partir daqui',
      callback: self.routesFromHere(self)
    });
    map.contextmenu.addItem({
      text: 'Rotas para cá',
      callback: self.routesToHere(self)
    });

    this.control = L.Routing.control({
      plan: L.Routing.plan([], {
        createMarker: function() {
          return null;
        },
      }),
      autoRoute: false,
      router: L.Routing.mapzen('mapzen-CEq2eYW', {
        costing: 'pedestrian'
      }),
      formatter: new L.Routing.mapzenFormatter()
    }).addTo(map);

    this.form = null;
    this.route = null;

    // adds the route button to map
    L.easyButton('ion-merge', function(btn, map) {
      // triggered when user clicks the routes button.
      if (sidebar.isVisible()) {
        unLoadRoute();
      } else {
        loadRouteForm({});
      }

    }).addTo(map);

  }

  attachForm(form) {
    this.form = form;
  }

  attachRoute(route) {
    this.route = route;
  }

  getLocation() {
      try {
      navigator.geolocation.getCurrentPosition(function(position){
        positionSuccess(position, point);
      }, positionError);
    } catch (error) {
      console.warn(error);
      alert("Recurso não disponível no seu browser.");
    }
  }

  positionSuccess(position, point) {
  var location = {
    latlng: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  }
  var inside_bounds = map.getBounds().contains(location.latlng);
  if(inside_bounds){
    if(point == 'origin'){
      self.routesFromHere(location);
    } else {
      self.routesToHere(location);
    }
  } else {
    alert("Ops... Parece que você não está no campus.");
  }

  }

  positionError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Habilite o uso da localização no browser.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Localização não disponível.");
      break;
    case error.TIMEOUT:
      alert("Não foi possível obter a localização no tempo esperado.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Ocorreu um erro desconhecido. Tente novamente.")
      break;
  }
}

routesFromHere(e, self) {
  console.log(self);
  this.setRouteLocation(e, this.route.origin);
  this.control.spliceWaypoints(0, 1, e.latlng);
}

routesToHere(e, self) {
  console.log(self);
  this.setRouteLocation(e, this.route.destination);
  this.control.spliceWaypoints(this.control.getWaypoints().length - 1, 1, e.latlng);
}

setRouteLocation() {
  alert('123132');
}




}
