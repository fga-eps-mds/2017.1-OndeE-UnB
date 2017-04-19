require 'rails_helper'

describe Admin::BuildingsController do
    describe 'checking the request the view of buildings' do
        it 'checks the request' do
            get:index
            expect(response).to render_template('index')
        end
    end

    describe 'Must check out the creation of a new building' do
        it 'checks the creation' do
            get :new

            icc = FactoryGirl.create :building
            expect(icc).to be_instance_of Building
        end
    end
end
