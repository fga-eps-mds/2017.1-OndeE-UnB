require 'rails_helper'

#Integration tests.
describe MapController do

	describe "checking the request the home map of application" do
		it "checks the request" do
			get:index
			expect(response).to render_template("index")
		end
	end

	describe "Should return the information of buildings from an id" do
		it "Checking if the return is true" do
			get :building, params: { id: 1 }
			expect(assigns(:building)).to be_truthy
		end
	end
	
end