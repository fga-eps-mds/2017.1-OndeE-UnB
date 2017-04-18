require 'rails_helper'

describe Admin::BuildingsController do

	describe "checking the request the view of buildings" do
		it "checks the request" do
			get:index
			expect(response).to render_template("index")
		end
	end


	describe "Must check out the creation of a new building" do
		it "checks the creation" do
		get :new 

		icc = Building.new(acronym: "ICC",
						   phone: "999999999",
						   title: "Instituto Central",
						   latitude: 10.0,
						   longitude: 10.0,
						   geo_data: {"type":"FeatureCollection",
						   			  "features":[
						   			 {"type":"Feature",
						   			  "properties":
						   			 {},"geometry":
						   			 {"type":"Polygon",
						   			 "coordinates":[[
						   			 [-47.86863327026368,-15.76482634373599],
						   			 [-47.86911070346833,-15.76452174802752],
						   			 [-47.86768913269043,-15.765497485209105],
						   			 [-47.86863327026368,-15.76482634373599]]]}}]})
			expect(icc).to be_instance_of Building
		end
	end

end




