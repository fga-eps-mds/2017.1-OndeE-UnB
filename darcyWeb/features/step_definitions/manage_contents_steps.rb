Given(/^I am an admin user$/) do
  email = 'testing@man.net'
  password = 'secretpass'
  Admin.new(:email => email, :password => password, :password_confirmation => password).save!

  visit '/admins/sign_in'
  fill_in "admin_email", :with => email
  fill_in "admin_password", :with => password
  click_button "Log in"

end


When(/^I go to the admin page$/) do
	visit admin_index_path
end


Then(/^I should see the admin dashboard$/) do
	find('.navbar-title', :text => 'Dashboard')
	#<li class="navbar-title">Dashboard</li>
end


Then(/^I should see a link to manage departments$/) do
	find('.title', :text => 'Departamentos')
end

Then(/^I should see a link to manage buildings$/) do
	find('.title', :text => 'Edifícios')
end

Then(/^I should see a link to manage rooms$/) do
	find('.title', :text => 'Salas')
end




Given(/^I am an not an admin user$/) do
  current_driver = Capybara.current_driver
  begin
    Capybara.current_driver = :rack_test
    page.driver.submit :delete, "admins/sign_out", {}
  ensure
    Capybara.current_driver = current_driver
  end
end

Then(/^I should be redirected to the login page$/) do
	expect(page).to have_content("Log in")
	expect(page).to have_content("Forgot your password")
end




When(/^I click on the departments link$/) do
  find('a', :text => 'Departamentos').click
end

Then(/^I should go to the departments index page$/) do
  expected = admin_buildings_path
  actual = URI.parse(current_url).path

  # to be, equal  -> same type
  expect(actual).to eql(expected)
end


When(/^I click on the buildings link$/) do
  find('a', :text => 'Edifícios').click
end

Then(/^I should go to the buildings index page$/) do
  expected = admin_buildings_path
  actual = URI.parse(current_url).path
  expect(actual).to eql(expected)
end




Given(/^I go to the buildings page$/) do
  visit admin_buildings_path
end

When(/^I click to add a building$/) do
  find_all('.card-action li a')[0].click
end

Then(/^I should go to the new building page$/) do
  expected = new_admin_building_path
  actual = URI.parse(current_url).path
  expect(actual).to eql(expected)
end





Given(/^I go to the new building page$/) do
  visit new_admin_building_path
end

When(/^I create a non valid building$/) do
  @sigla = 'adfsasdfa'
  @title = 'adfsasfsf'

  fill_in "building_acronym", :with => @sigla
  fill_in "building_title", :with => @title
  click_button "Salvar"
end

Then(/^I must not see it in the buildings page$/) do
  visit admin_buildings_path

  expect(page).not_to have_content(@sigla)
  expect(page).not_to have_content(@title)
end




