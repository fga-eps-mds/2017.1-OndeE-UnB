require 'rails_helper'

RSpec.describe Schedule, type: :model do

    it "should be valid when schedule data is valid" do
        schedule = FactoryGirl.build :schedule
        expect(schedule).to be_valid
    end

    it "should be invalid when code is blank" do
        schedule = FactoryGirl.build :schedule, code: ''
        expect(schedule).to be_invalid
    end

    it "should be invalid when title is blank" do
        schedule = FactoryGirl.build :schedule, title: ''
        expect(schedule).to be_invalid
    end

    it "should be invalid when day_of_week is blank" do
        schedule = FactoryGirl.build :schedule, day_of_week: ''
        expect(schedule).to be_invalid
    end

    it "should be invalid when start_time data is blank" do
        schedule = FactoryGirl.build :schedule, start_time: ''
        expect(schedule).to be_invalid
    end

    it "should be invalid when end_time is blank" do
        schedule = FactoryGirl.build :schedule, end_time: ''
        expect(schedule).to be_invalid
    end

    it "should be invalid when classroom is blank" do
        schedule = FactoryGirl.build :schedule, classroom: ''
        expect(schedule).to be_invalid
    end
end
