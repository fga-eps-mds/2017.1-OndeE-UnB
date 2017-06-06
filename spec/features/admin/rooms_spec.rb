require 'rails_helper'

describe 'Rooms', type: :feature do

  context "access rooms" do

    before(:each) do
      Capybara.raise_server_errors = false
      FactoryGirl.create :admin
      FactoryGirl.create :building
      visit login_path
      fill_in 'admin[email]', with: 'mds@mds.com'
      fill_in 'admin[password]', with: 'mds123'

      find('input.btn.btn-success.btn-submit').click
      visit new_admin_room_path
    end

    it "Should create a new room", js: true  do

      room = FactoryGirl.build :room

      scpt = page.evaluate_script("$('#room_geo_data').val()")
      puts scpt

      find('#map').click
      within("form") do
        fill_in 'room[acronym]', with: room.acronym
        fill_in 'room[title]', with: room.title
        select 'BSA', from: :room_building
        select 'Laboratório', from: :room_room_type
        fill_in 'room[level]', with: room.level
        fill_in 'room[latitude]', with: room.latitude
        fill_in 'room[longitude]', with: room.longitude
        fill_in 'room[geo_data]', with: room.geo_data
        page.save_screenshot
        #page.execute_script("new_point.Salvar.click()")
      end

      # expect(page).to have_content('êxito.')
      # expect(page).to have_content('TÍTULO')
      # expect(page).to have_content('DESCRIÇÃO')
      # expect(page).to have_current_path(admin_points_path)
    end
  end
end
