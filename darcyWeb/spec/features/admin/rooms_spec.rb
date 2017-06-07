require 'rails_helper'

describe 'Admin', type: :feature do

  before(:each) do
    Capybara.raise_server_errors = false
    FactoryGirl.create :admin
    visit login_path
    fill_in 'admin[email]', with: 'mds@mds.com'
    fill_in 'admin[password]', with: 'mds123'

    find('input.btn.btn-success.btn-submit').click
  end

  context 'edit a room' do

    before(:each) do
      @room = FactoryGirl.create :room
      visit edit_admin_room_path(@room)
    end

    it 'should save changes', js: true do
      page.save_screenshot
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_rooms_path)
    end

  end

  context 'create a new room' do

    before(:each) do
      @room = FactoryGirl.build :room
      visit new_admin_room_path
    end

    before(:each) do
      within('form') do
        fill_in 'room[acronym]', with: @room.acronym
        fill_in 'room[title]', with: @room.title
        select 'BSA', from: :room_building_id
        select 'Laboratório', from: :room_room_type
        fill_in 'room[level]', with: @room.level
        fill_in 'room[latitude]', with: @room.latitude
        fill_in 'room[longitude]', with: @room.longitude
        first('#room_geo_data', visible: false).set(@room.geo_data)
      end
    end

    it 'should create a new room', js: true do

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_rooms_path)
    end

    it 'should not create room if has not title', js: true do

      within('form') do
        fill_in 'room[title]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room if has not acronym', js: true do

      within('form') do
        fill_in 'room[acronym]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room if has not level', js: true do

      within('form') do
        fill_in 'room[level]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room if has not latitude', js: true do

      within('form') do
        fill_in 'room[latitude]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room if has not longitude', js: true do

      within('form') do
        fill_in 'room[longitude]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room if has not GeoData', js: true do

      within('form') do
        first('#room_geo_data', visible: false).set('')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room without related building', js: true do

      within('form') do
        page.execute_script('$("#room_building_id").remove()')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end

    it 'should not create room without room type', js: true do

      within('form') do
        page.execute_script('$("#room_room_type").remove()')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_room_path)
    end
  end
end
