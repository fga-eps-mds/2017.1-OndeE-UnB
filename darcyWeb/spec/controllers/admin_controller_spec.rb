require 'rails_helper'

describe AdminController,  type: :controller do

	before do
		@admin = FactoryGirl.create(:admin)
	end

	describe "GET new" do
		it "should GET a new user" do
			get :new
			expect(response). to have_http_status(:sucess)
		end
	end
end	