require 'rails_helper'

describe "Route", type: :feature do
	it "should show the route form when you click the route button", js: true do
		visit root_path
		page.evaluate_script("$('.ion-merge').click()")
		expect(page).to have_content('Trajetos')
	end
end
