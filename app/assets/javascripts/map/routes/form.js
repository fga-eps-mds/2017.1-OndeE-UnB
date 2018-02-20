function Form() {
  this.form = $("#sidebar").find("form");
  this.origin = this.form.find("#route_origin");
  this.destination = this.form.find("#route_destination");
  this.originText = this.form.find("input.origin");
  this.destinationText = this.form.find("input.destination");
  this.submit = this.form.find("button[type=submit]");
}

Form.prototype.setMode = function(){
  this.mode = this.form.find("label.btn-outline-info.route_mode.active");
  return this;
}

Form.prototype.swap = function(){
  var originLatLng = this.origin.val();
  var destinationLatLng = this.destination.val();

  var originText = this.originText.val();
  var destinationText = this.destinationText.val();

  this.origin.val(destinationLatLng);
  this.destination.val(originLatLng);

  this.originText.val(destinationText);
  this.destinationText.val(originText);
}
