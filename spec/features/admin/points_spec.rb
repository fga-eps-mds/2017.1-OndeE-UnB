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

  context 'edit a point' do

    before(:each) do
      @point = FactoryGirl.create :point
      visit edit_admin_point_path(@point)
    end

    it 'should save changes', js: true do
      page.save_screenshot
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_points_path)
    end

  end

  context 'create a new point' do

    before(:each) do
      @point = FactoryGirl.build :point
      visit new_admin_point_path
    end

    before(:each) do
      within('form') do
        fill_in 'point[title]', with: @point.title
        fill_in 'point[description]', with: @point.description
        select 'Bicicletario', from: :point_type_point
        fill_in 'point[latitude]', with: @point.latitude
        fill_in 'point[longitude]', with: @point.longitude
        first('#point_geo_data', visible: false).set(@point.geo_data)
      end
    end

    it 'should create a new point', js: true do

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_points_path)
    end

    it 'should not create point if has no title', js: true do

      within('form') do
        fill_in 'point[title]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_point_path)
    end

    it 'should not create point if has no description', js: true do

      within('form') do
        fill_in 'point[description]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_point_path)
    end

    it 'should not create point if has no latitude', js: true do

      within('form') do
        fill_in 'point[latitude]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_point_path)
    end

    it 'should not create point if has no longitude', js: true do

      within('form') do
        fill_in 'point[longitude]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_point_path)
    end

    it 'should not create point if has no GeoData', js: true do

      within('form') do
        first('#point_geo_data', visible: false).set('')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_point_path)
    end

    it 'should not create point without point type', js: true do

      within('form') do
        page.execute_script('$("#point_point_type").remove()')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_point_path)
    end
  end
end
