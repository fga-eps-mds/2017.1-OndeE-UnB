require 'rails_helper'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

options = {js_errors: false}
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, options)
end

 describe 'Admin', type: :feature do
   before(:each) do
     Capybara.raise_server_errors = false
     admin = FactoryGirl.create :admin
     visit login_path
     fill_in 'admin[email]', with: admin.email
     fill_in 'admin[password]', with: admin.password

     find('input.btn.btn-success.btn-submit').click
   end
   before(:each) do
     FactoryGirl.create :plan
     @building = FactoryGirl.build :building
     visit new_admin_building_path
   end
   before(:each) do
     within('form') do
       fill_in 'building[acronym]', with: @building.acronym
       fill_in 'building[title]', with: @building.title
       fill_in 'building[phone]', with: @building.phone
       fill_in 'building[latitude]', with: @building.latitude
       fill_in 'building[longitude]', with: @building.longitude
       first('#building_geo_data', visible: false).set(@building.geo_data)
       find('input.btn.btn-sm.btn-success').click
     end
   end
   it "Should have a alert when deleting a building", js:true do
     visit admin_buildings_path
     page.execute_script("$('i.fa.fa-remove').eq(0).trigger('click')")
     expect(page).to have_content("Alerta");
   end
 end
