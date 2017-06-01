require 'rails_helper'

describe BuildingController do

	before do
		@building = FactoryGirl.create(:building)
	end

	describe "POST create" do
  		it "should successfull create a building" do
	  		post :create, :building => {
	        		:acronym=>"Predio",
	        		:title=>"Prediozão",
	        		:phone=>12312345,
	        		:latitude=>0.0,
	        		:longitude =>0.0,
	        		:geo_data=>'{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-47.867375314235694,-15.762756116441665],[-47.86702126264573,-15.762497981882012],[-47.866597473621376,-15.763055552119592],[-47.8669622540474,-15.763303360622453],[-47.867375314235694,-15.762756116441665]]]}}]}'
				}
	      		expect(response).to have_http_status(:success)
      		end
      	end
end
