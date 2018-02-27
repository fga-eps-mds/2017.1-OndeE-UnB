describe("Buildings", function() {

    const $building_test = $building_coords;

  it("Should save latitude", function() {
    $building_test.save(1, 10.2)
    expect($building_test.element_lat.val()).not.toBeNull();
  });

  it("Should save longitude", function() {
    $building_test.save(1, 10.2)
    expect($building_test.element_lng.val()).not.toBeNull();
  });

  const $building_data = $building_geo_data;

  it("Should load data of building to a layer", function(){
    $.getJSON( "/map/data", function(data) { //getting the json data
        $.each(data, function (key, val){
            var geo_json = JSON.parse(val.geo_data);
            building_data.load(geo_json); //adding the json data to the building layer
        });
    });
  });

  it("Should save data of building to a layer", function(){
    $.getJSON( "/map/data", function(data) { //getting the json data
        $.each(data, function (key, val){
            var geo_json = JSON.parse(val.geo_data);
            building_data.save(geo_json); //adding the json data to the building layer
        });
    });
  }); });
