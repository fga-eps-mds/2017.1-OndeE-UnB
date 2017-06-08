require 'rails_helper'

describe "Point" do
	it "is valid when it contains valid data" do
		point = FactoryGirl.build :point
		expect(point).to be_valid
	end

	it "should be invalid when description is blank" do
		point = FactoryGirl.build :point, description: ''
		expect(point).to be_invalid
	end

	it "should be invalid when geo data is blank" do
		point = FactoryGirl.build :point, geo_data: ''
		expect(point).to be_invalid
	end

	it "should be invalid when latitude is blank" do
		point = FactoryGirl.build :point, latitude: ''
		expect(point).to be_invalid
	end

	it "should be invalid when latitude is not a number" do
		point = FactoryGirl.build :point, latitude: 'NOT A NUMBER'
		expect(point).to be_invalid
	end

  it "should be invalid when longitude is blank" do
    point = FactoryGirl.build :point, longitude: ''
    expect(point).to be_invalid
  end

	it "should be invalid when longitude is not a number" do
		point = FactoryGirl.build :point, longitude: 'NOT A NUMBER'
		expect(point).to be_invalid
	end

  # it "should should raise e when point type is unknown" do
  #   point = FactoryGirl.build :point, point_type: :some_unknown_type
  #   expect { point }.to raise_error
  # end

	it "should be invalid when the title is blank" do
		point = FactoryGirl.build :point, title: ''
		expect(point).to be_invalid
	end

  it "should be invalid when the title is too long" do
    point = FactoryGirl.build :point, title: 'A TOO LONG TITLE FOR A POINT HAS MORE THAN 50 CHARACTERS'
    expect(point).to be_invalid
  end

end
