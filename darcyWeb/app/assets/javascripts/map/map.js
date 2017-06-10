//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Map {


  constructor(route) {

  // this.route = route;
  // console.log(this.route);
  // enable and set options to the contextmenu
    map.contextmenu.enable();
    map.contextmenu.addItem({
      text: 'Rotas a partir daqui',
      callback: this.routesFromHere
    });
    map.contextmenu.addItem({
      text: 'Rotas para cá',
      callback: this.routesToHere
    });


  }

  routesFromHere(e) {
    console.log(this.route);
    this.route.setRouteLocation(e, origin);
    this.route.control.spliceWaypoints(0, 1, e.latlng);
  }

  routesToHere(e) {
    this.route.setRouteLocation(e, destination);
    this.route.control.spliceWaypoints(this.route.control.getWaypoints().length - 1, 1, e.latlng);
  }

  location() {
    return {
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
            routesFromHere(location);
          } else {
            routesToHere(location);
          }
        } else {
          alert("Ops... Parece que você não está no campus.");
        }
      },
      getLocation(point) {
        try {
          navigator.geolocation.getCurrentPosition(function(position){
            positionSuccess(position, point);
          }, positionError);
        } catch (error) {
          console.warn(error);
          alert("Recurso não disponível no seu browser.");
        }
      },
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
      },

    }
  }

  removeMarker(waypoint) {
    try {
      map.removeLayer(waypoint.marker);
      waypoint.marker = null;
    } catch (err) {
      console.error(err.message);
    }
  }

  createMarker(waypoint, latlng) {
    waypoint.marker = L.marker(latlng, {
      icon: L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: waypoint.icon,
        markerColor: waypoint.color
      })
    });
    map.addLayer(waypoint.marker);
  }

}
