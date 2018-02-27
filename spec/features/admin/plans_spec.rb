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

  context 'edit a plan' do

    before(:each) do
      @plan = FactoryGirl.create :plan
      visit edit_admin_plan_path(@plan)
    end

    it 'should save changes', js: true do
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_plans_path)
    end

  end

  context 'create a new plan' do

    before(:each) do
      @plan = FactoryGirl.build :plan
      visit new_admin_plan_path
    end

    before(:each) do
      within('form') do
        select 'BSA', from: :plan_building_id
        fill_in 'plan[level]', with: @plan.level
        first('#plan_geo_data', visible: false).set(@plan.geo_data)
        page.attach_file('plan[image]', Rails.root + 'spec/fixtures/plan.png')
      end
    end

    it 'should create a new plan', js: true do

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(admin_plans_path)
    end

    it 'should not create plan if has not level', js: true do

      within('form') do
        fill_in 'plan[level]', with: ''
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_plan_path)
    end

    it 'should not create plan if has not GeoData', js: true do

      within('form') do
        first('#plan_geo_data', visible: false).set('')
      end

      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_plan_path)
    end

    it 'should not create plan without related building', js: true do

      page.execute_script('$("#plan_building_id").remove()')
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_plan_path)
    end

    it 'should not create plan without an image', js: true do

      page.execute_script('$("#plan_image").remove()')
      page.execute_script('$("#plan_image").remove()')
      page.execute_script("$('form').submit()")
      expect(page).to have_current_path(new_admin_plan_path)
    end
  end
end
