require 'rails_helper'

describe "Route", type: :feature do

	it "should show the route form when you click the route button", js: true do
		visit root_path
		page.evaluate_script("$('.ion-merge').click()")
		expect(page).to have_content('Trajetos')
	end

	it "should calculate the route", js: true do

		Capybara.raise_server_errors = false

		visit root_path
		page.evaluate_script("$('.ion-merge').click()")
		within("#sidebar form") do
      fill_in 'route[origin]', with: '-15.76528581775335, -47.866482138633735'
      fill_in 'route[destination]', with: '-15.766824273744168, -47.867302894592285'
    end
    click_button 'Obter Trajeto'
		expect(page).to have_content('You have arrived at your destination.')
	end

	it "should swap locations of the route", js: true do
		visit root_path
		page.evaluate_script("$('.ion-merge').click()")

		origin = '-15.76528581775335, -47.866482138633735'
		destination = '-15.766824273744168, -47.867302894592285'

		within("#sidebar form") do
      fill_in 'route[origin]', with: origin
      fill_in 'route[destination]', with: destination
			find('.btn-reverse-route').click
    end

		expect(page).to have_field('route[origin]', with: destination)
		expect(page).to have_field('route[destination]', with: origin)
	end

end
