require 'rails_helper'

describe Building do
	it "is valid when it contains an acronym, phone, title, latitude, longitude and geo_data" do
		icc = FactoryGirl.create :building
		expect(icc).to be_valid
	end

	it "is invalid when geo_data is blank" do
		icc = FactoryGirl.create :building, geo_data: ''
		expect(icc).to be_invalid
	end
end
