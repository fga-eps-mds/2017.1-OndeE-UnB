require 'rails_helper'

describe "Route", type: :feature do

	it "should show the route form when you click the route button", js: true do
		visit root_path
		page.evaluate_script("$('.ion-merge').click()")
		expect(page).to have_content('Trajetos')
	end

	context "Swap Locations of the route" do

		before(:each) do
			visit root_path
			page.evaluate_script("$('.ion-merge').click()")
  	end

		it "should swap locations when there is origin and destination", js: true do

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

		it "should swap origin even when destination is blank", js: true do

			origin = '-15.76528581775335, -47.866482138633735'

			within("#sidebar form") do
				fill_in 'route[origin]', with: origin
				find('.btn-reverse-route').click
			end

			expect(page).to have_field('route[origin]', with: '')
			expect(page).to have_field('route[destination]', with: origin)
		end

		it "should swap destination even when origin is blank", js: true do

			destination = '-15.76528581775335, -47.866482138633735'

			within("#sidebar form") do
				fill_in 'route[destination]', with: destination
				find('.btn-reverse-route').click
			end

			expect(page).to have_field('route[origin]', with: destination)
			expect(page).to have_field('route[destination]', with: '')
		end
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
end
