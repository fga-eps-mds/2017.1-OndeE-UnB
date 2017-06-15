//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Form {

  constructor() {
    this.name = 'Form Object';

    this.form = $('#sidebar').find('form');
    this.origin = this.form.find('input[name="route[origin]"]');
    this.destination = this.form.find('input[name="route[destination]"]');
    this.mode = this.form.find('input[name="route[mode]"]');
    this.submit = this.form.find('button[type=submit]');

  }

}
