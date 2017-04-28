describe("Buildings", function() {

  it("Should save latitude and longitude", function() {
    expect($building_coods.save()).toBeTruthy();
  });
});
