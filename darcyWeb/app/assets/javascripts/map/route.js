//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Route {
  constructor() {

    this.origin = {
      marker: null,
      title: 'origin',
      icon: 'arrow-up-c',
      color: 'green'
    };

    this.destination = {
      marker: null,
      title: 'destination',
      icon: 'arrow-down-c',
      color: 'red'
    };

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

}
