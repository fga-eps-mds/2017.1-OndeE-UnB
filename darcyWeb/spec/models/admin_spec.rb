require 'rails_helper'

describe Admin do
  it "is valid when it contains an valid name" do
  	user = FactoryGirl.build :admin, name: 'Nome Admin'
		expect(user).to be_valid
  end

	it "should return invalid when the name has more than twenty characters" do
		user = FactoryGirl.build :admin, name: 'abcdefghijklmnopqrstvxz'
		expect(user).to be_invalid
	end

	it "is invalid when name is blank" do
    user = FactoryGirl.build :admin, name: ''
    expect(user).to be_invalid
  end
end
