require 'rails_helper'

describe Plan do
	it "is valid when it contains valid data" do
		plan = FactoryGirl.build :plan
		expect(plan).to be_valid
	end

	it "should be invalid when the building is nil" do
		plan = FactoryGirl.build :plan, building: nil
		expect(plan).to be_invalid
	end

	it "should be invalid when geo data is blank" do
		plan = FactoryGirl.build :plan, geo_data: ''
		expect(plan).to be_invalid
	end

  it "should be invalid when the level is blank" do
    plan = FactoryGirl.build :plan, level: ''
    expect(plan).to be_invalid
  end

  it "should be invalid when the level is not a number" do
    plan = FactoryGirl.build :plan, level: 'NOT A NUMBER'
    expect(plan).to be_invalid
  end

  it "should be invalid when the level is not a integer" do
    plan = FactoryGirl.build :plan, level: 1.5
    expect(plan).to be_invalid
  end
end
