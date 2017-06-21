function Form() {
  this.form = $("#sidebar").find("form");
  this.origin = this.form.find("#route_origin");
  this.destination = this.form.find("#route_destination");
  this.submit = this.form.find("button[type=submit]");
}

Form.prototype.setMode = function(){
  this.mode = this.form.find("label.btn-outline-info.route_mode.active");
  return this;
}
