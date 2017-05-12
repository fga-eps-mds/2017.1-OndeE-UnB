require 'rails_helper'

describe "Route", type: :feature do

	it "should show the route form when you click the route button", js: true do
		visit root_path
		page.evaluate_script("$('.ion-merge').click()")
		expect(page).to have_content('Trajetos')
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

	context "Calculate the route" do

		before(:each) do
			Capybara.raise_server_errors = false
			visit root_path
			page.evaluate_script("$('.ion-merge').click()")
			within("#sidebar form") do
	      fill_in 'route[origin]', with: '-15.76528581775335, -47.866482138633735'
	      fill_in 'route[destination]', with: '-15.766824273744168, -47.867302894592285'
	    end
  	end

		it "should calculate the route for pedestrian", js: true do
			within("#sidebar form") do
				page.all('label.btn.btn-outline-info')[0].click
				click_button 'Obter Trajeto'
			end
			expect(find('#mode_text')).to have_content('A pé')
			expect(page).to have_content('You have arrived at your destination.')
		end

		it "should calculate the route for bicycle", js: true do
			within("#sidebar form") do
				page.all('label.btn.btn-outline-info')[1].click
				click_button 'Obter Trajeto'
			end
			expect(find('#mode_text')).to have_content('Bicicleta')
			expect(page).to have_content('You have arrived at your destination.')
		end

		it "should calculate the route for car", js: true do
			within("#sidebar form") do
				page.all('label.btn.btn-outline-info')[2].click
				click_button 'Obter Trajeto'
			end
			expect(find('#mode_text')).to have_content('Carro')
			expect(page).to have_content('You have arrived at your destination.')
		end
	end

	context "Context Menu" do
		it "should show context menu when right click the map", js: true do
			visit root_path
			tiles_origin = page.evaluate_script('$(".leaflet-tile").eq(3).trigger("contextmenu")')
			
			tiles_destination = page.evaluate_script('$(".leaflet-tile").eq(4)')

			#puts tiles_origin
			#puts tiles_destination
			#page.evaluate_script('$("#map").trigger("contextmenu")')
			##puts page.evaluate_script('$(".leaflet-contextmenu").html()')
			#expect(page).to have_content('Rotas a partir daqui')
			page.save_screenshot
		end
	end
end
