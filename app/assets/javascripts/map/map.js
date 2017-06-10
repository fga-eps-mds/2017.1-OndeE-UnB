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

  addButton() {
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







}
