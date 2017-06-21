require 'rails_helper'

describe 'Admin', type: :feature do

  before(:each) do
    Capybara.raise_server_errors = false
    admin = FactoryGirl.create :admin
    visit login_path
    fill_in 'admin[email]', with: admin.email
    fill_in 'admin[password]', with: admin.password

    find('input.btn.btn-success.btn-submit').click
  end

  context 'edit a building' do

    before(:each) do
      @building = FactoryGirl.create :building
      visit edit_admin_building_path(@building)
    end

    it 'should save changes', js: true do
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_buildings_path)
    end

  end

  context 'create a new building' do

    before(:each) do
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
        page.attach_file('building[image]', Rails.root + 'spec/fixtures/building.png')
      end
    end

    it 'should create a new building', js: true do

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_buildings_path)
    end

    it 'should not create building if has not acronym', js: true do

      within('form') do
        fill_in 'building[acronym]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end

    it 'should not create building if has not title', js: true do

      within('form') do
        fill_in 'building[title]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end

    it 'should not create building if has not phone', js: true do

      within('form') do
        fill_in 'building[phone]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end

    it 'should not create building if has not latitude', js: true do

      within('form') do
        fill_in 'building[latitude]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end

    it 'should not create building if has not longitude', js: true do

      within('form') do
        fill_in 'building[longitude]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end

    it 'should not create building if has not GeoData', js: true do

      within('form') do
        first('#building_geo_data', visible: false).set('')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end

    it 'should not create building without an image', js: true do

      page.execute_script('$("#building_image").remove()')
      page.execute_script('$("#building_image").remove()')
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_building_path)
    end
  end
end
