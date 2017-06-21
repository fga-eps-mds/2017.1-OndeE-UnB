var departmentLayer = L.geoJSON("").addTo(map);

// TODO Retirar link direto para imagem
var departmentIcon = L.icon({
    iconUrl: "http://icons.iconarchive.com/icons/icons8/ios7/24/Business-Department-icon.png"
    //iconUrl: "https://drive.google.com/uc?export=view&id=0B8jEDVP6IcfKOVJscS1LRHlMemc"
});

$.getJSON("/map/data/departments", function(data) { //getting the json data
  data.forEach(function(department){
    try {
      console.info("Load Departments");
      var geo_json = JSON.parse(department.geo_data);
      var coordinates = geo_json.features[0].geometry.coordinates;
      // NOTE Departments is not being loaded
      //departmentLayer.addData(geo_json); //adding the json data to the departament layer
      L.marker([coordinates[1], coordinates[0]], {icon: departmentIcon}).addTo(map);
    } catch (err) {
      console.error(err);
    }
  });
});
