require 'rails_helper'

describe Admin::BuildingsController do

	describe "checking the request the view of buildings" do
		it "checks the request" do
			get:index
			expect(response).to render_template("index")
		end
	end

end