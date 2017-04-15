require 'rails_helper'

describe MapController do

	describe "checking the request the home map of application" do
		it "checks the request" do
			get:index
			expect(response).to render_template("index")
		end
	end

end