require 'rails_helper'

RSpec.describe Course, type: :model do

    it "should be valid when course data is valid" do
        course = FactoryGirl.build :course
        expect(course).to be_valid
    end

    it "should be invalid when code is blank" do
        course = FactoryGirl.build :course, code: ''
        expect(course).to be_invalid
    end

    it "should be invalid when title is blank" do
        course = FactoryGirl.build :course, title: ''
        expect(course).to be_invalid
    end

    it "should be invalid when day_of_week is blank" do
        course = FactoryGirl.build :course, day_of_week: ''
        expect(course).to be_invalid
    end

    it "should be invalid when start_time data is blank" do
        course = FactoryGirl.build :course, start_time: ''
        expect(course).to be_invalid
    end

    it "should be invalid when end_time is blank" do
        course = FactoryGirl.build :course, end_time: ''
        expect(course).to be_invalid
    end

    it "should be invalid when classroom is blank" do
        course = FactoryGirl.build :course, classroom: ''
        expect(course).to be_invalid
    end
end
