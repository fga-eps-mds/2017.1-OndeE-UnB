//= require leaflet/routing-machine
//= require leaflet/lrm-mapzen

class Summary {
  constructor() {
    this.summary = $('.leaflet-routing-alt').find('h3').text().split(',');
    this.distance = this.summary[0];
    this.time = this.summary[1];

    this.mode = function() {
      this.mode = FormObj.mode.parent('.btn.active');
      this.icon = this.mode.find('i').attr('class');
      this.text = this.mode.text();
      return this;
    };

  }
}
