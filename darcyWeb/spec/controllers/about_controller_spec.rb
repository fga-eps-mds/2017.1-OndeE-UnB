require 'rails_helper'

describe AboutController do

	describe "checking the request the about view" do
		it "checks the request" do
			get:about
			expect(response).to render_template("about")
		end
	end

end