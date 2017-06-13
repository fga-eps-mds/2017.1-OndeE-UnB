# TODO Substituir por testes de aceitacao
# TODO Fix the problem with needing an admin before creation
require 'rails_helper'
require 'spec_helper'
require 'json'

# describe AdminController,  type: :controller do
#
# 	before do
# 		@admin = FactoryGirl.create(:admin)
# 	end
#
# 	describe "GET new" do
# 		it "should GET a new user" do
# 			get 'admin'
# 			response.should be_success
# 		end
# 	end
# end

RSpec.describe AdminController, :type => :controller do
  describe "GET admin" do
    it "should get a new admin" do
			admin = FactoryGirl.create(:admin)
      get :admin
      expect(assigns(:admin)).to eq([admin])
    end
  end
end
