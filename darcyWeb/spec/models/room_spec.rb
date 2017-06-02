require 'rails_helper'

describe Room do
	it "is valid when it contains valid data" do
		room = FactoryGirl.build :room
		expect(room).to be_valid
	end

  it "should be invalid when the acronym is blank" do
    room = FactoryGirl.build :room, acronym: ''
    expect(room).to be_invalid
  end

	it "should be invalid when the acronym is too long" do
		room = FactoryGirl.build :room, acronym: 'A TOO LONG ACRONYM FOR A ROOM'
		expect(room).to be_invalid
	end

	it "should be invalid when the building is nil" do
		room = FactoryGirl.build :room, building: nil
		expect(room).to be_invalid
	end

	it "should be invalid when geo data is blank" do
		room = FactoryGirl.build :room, geo_data: ''
		expect(room).to be_invalid
	end

	it "should be invalid when latitude is blank" do
		room = FactoryGirl.build :room, latitude: ''
		expect(room).to be_invalid
	end

	it "should be invalid when latitude is not a number" do
		room = FactoryGirl.build :room, latitude: 'NOT A NUMBER'
		expect(room).to be_invalid
	end

  it "should be invalid when the level is blank" do
    room = FactoryGirl.build :room, level: ''
    expect(room).to be_invalid
  end

  it "should be invalid when the level is not a number" do
    room = FactoryGirl.build :room, level: 'NOT A NUMBER'
    expect(room).to be_invalid
  end

  it "should be invalid when the level is not a integer" do
    room = FactoryGirl.build :room, level: 1.5
    expect(room).to be_invalid
  end

  it "should be invalid when longitude is blank" do
    room = FactoryGirl.build :room, longitude: ''
    expect(room).to be_invalid
  end

	it "should be invalid when longitude is not a number" do
		room = FactoryGirl.build :room, longitude: 'NOT A NUMBER'
		expect(room).to be_invalid
	end

  # it "should should raise e when room type is unknown" do
  #   room = FactoryGirl.build :room, room_type: :some_unknown_type
  #   expect { room }.to raise_error
  # end

	it "should be invalid when the title is blank" do
		room = FactoryGirl.build :room, title: ''
		expect(room).to be_invalid
	end

  it "should be invalid when the title is too long" do
    room = FactoryGirl.build :room, title: 'A TOO LONG TITLE FOR A ROOM HAS MORE THAN 50 CHARACTERS'
    expect(room).to be_invalid
  end

end
