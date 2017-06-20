//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

function Form() {
    this.form = $('#sidebar').find('form');
    this.origin = this.form.find('input[name="route[origin]"]');
    this.destination = this.form.find('input[name="route[destination]"]');
    this.mode = this.form.find('input[name="route[mode]"]');
    this.submit = this.form.find('button[type=submit]');
}
