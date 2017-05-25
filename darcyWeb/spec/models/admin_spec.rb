require 'rails_helper'

describe Admin do


	it "is invalid when name is blank" do
		user = FactoryGirl.build :admin, name: nil
		expect(user).to be_invalid
	end


end