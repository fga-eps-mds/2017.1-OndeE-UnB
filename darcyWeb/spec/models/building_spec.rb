require 'rails_helper'

describe Building do
	it "is valid when it contains an valid acronym" do
		icc = FactoryGirl.build :building, acronym: 'ICC'
		expect(icc).to be_valid
	end

	it "should return invalid when the acronym has more than twenty characters" do
		icc = FactoryGirl.build :building, acronym: 'aaaaaaaaaaaaaaaaaaaaa'
		expect(icc).to be_invalid
	end

	it "is valid when it contains an valid title" do
		icc = FactoryGirl.build :building, title: 'Instituto Central de Ciências'
		expect(icc).to be_valid
	end

	it "should return invalid when the title has more than twenty characters" do
		icc = FactoryGirl.build :building, title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
		expect(icc).to be_invalid
	end

	it "should return invalid when the phone has more than eleven numbers" do
		icc = FactoryGirl.build :building, phone: 999999999999
		expect(icc).to be_invalid
	end

	it "is valid when it contains an valid latitude" do
		icc = FactoryGirl.build :building, latitude: 10.22
		expect(icc).to be_valid
	end

	it "is valid when it contains an valid longitude" do
		icc = FactoryGirl.build :building, longitude: 15.22
		expect(icc).to be_valid
	end

	it "should return valid if there is the presence of a string geo_data" do
		icc = FactoryGirl.build :building, geo_data: '...'
		expect(icc).to be_valid
	end


	it "is invalid when geo_data is blank" do
		icc = FactoryGirl.build :building, geo_data: ''
		expect(icc).to be_invalid
	end

	it "is invalid when latitude is blank" do
		icc = FactoryGirl.build :building, latitude: ''
		expect(icc).to be_invalid
	end

	it "is invalid when longitude is blank" do
		icc = FactoryGirl.build :building, longitude: ''
		expect(icc).to be_invalid
	end

	it "is invalid when title is blank" do
		icc = FactoryGirl.build :building, title: ''
		expect(icc).to be_invalid
	end

	it "is invalid when acronym is blank" do
		icc = FactoryGirl.build :building, acronym: ''
		expect(icc).to be_invalid
	end

end
