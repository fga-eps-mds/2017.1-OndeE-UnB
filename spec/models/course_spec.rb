require 'rails_helper'

RSpec.describe Course, type: :model do

    it "should be valid when course data is valid" do
        course = FactoryGirl.build :course
        expect(course).to be_valid
    end

    it "should be invalid when code is blank" do

        expect(course).to be_invalid
    end

    it "should be invalid when title is blank" do

        expect(course).to be_invalid
    end

    it "should be invalid when day_of_week is blank" do

        expect(course).to be_invalid
    end

    it "should be invalid when start_time data is blank" do

        expect(course).to be_invalid
    end

    it "should be invalid when end_time is blank" do

        expect(course).to be_invalid
    end

    it "should be invalid when class is blank" do

        expect(course).to be_invalid
    end
end

