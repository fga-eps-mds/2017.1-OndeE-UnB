//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen
//= require map/util


class Route {

  constructor() {

    this.name = 'Route Object';
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

}
