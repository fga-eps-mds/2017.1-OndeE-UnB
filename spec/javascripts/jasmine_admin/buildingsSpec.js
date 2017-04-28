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
});
