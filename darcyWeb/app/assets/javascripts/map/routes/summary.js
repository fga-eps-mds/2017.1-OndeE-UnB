function Summary() {
  this.summary = $(".leaflet-routing-alt").find("h3").text().split(",");
  this.distance = this.summary[0];
  this.time = this.summary[1];
}

Summary.prototype.mode = function(labelMode) {
  this.icon = labelMode.find("i").attr("class");
  this.text = labelMode.text();
  return this;
};
