require 'rails_helper'

RSpec.describe Department, type: :model do
it "is valid when it contains an valid acronym" do
  enc = FactoryGirl.build :department, acronym: 'ENC'
  expect(enc).to be_valid
end

	it "should return invalid when the acronym has more than twenty characters" do
		enc = FactoryGirl.build :department, acronym: 'aaaaaaaaaaaaaaaaaaaaa'
		expect(enc).to be_invalid
	end

	it "is valid when it contains an valid title" do
		enc = FactoryGirl.build :department, title: 'Departamento de Engenharia Civil e Ambiental'
		expect(enc).to be_valid
	end

	it "should return invalid when the title has more than twenty characters" do
		enc = FactoryGirl.build :department, title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
		expect(enc).to be_invalid
	end

	it "should return invalid when the phone has more than eleven numbers" do
		enc = FactoryGirl.build :department, phone: 888888888888
		expect(enc).to be_invalid
	end

	it "is valid when it contains an valid latitude" do
		enc = FactoryGirl.build :department, latitude: 10.11
		expect(enc).to be_valid
	end

	it "is valid when it contains an valid longitude" do
		enc = FactoryGirl.build :department, longitude: 15.11
		expect(enc).to be_valid
	end

	it "should return valid if there is the presence of a string geo_data" do
		enc = FactoryGirl.build :department, geo_data: '...'
		expect(enc).to be_valid
	end

	it "is invalid when geo_data is blank" do
		enc = FactoryGirl.build :department, geo_data: ''
		expect(enc).to be_invalid
	end

	it "is invalid when latitude is blank" do
		enc = FactoryGirl.build :department, latitude: ''
		expect(enc).to be_invalid
	end

	it "is invalid when longitude is blank" do
		enc = FactoryGirl.build :department, longitude: ''
		expect(enc).to be_invalid
	end

	it "is invalid when title is blank" do
		enc = FactoryGirl.build :department, title: ''
		expect(enc).to be_invalid
	end

	it "is invalid when acronym is blank" do
		enc = FactoryGirl.build :department, acronym: ''
		expect(enc).to be_invalid
	end

end
