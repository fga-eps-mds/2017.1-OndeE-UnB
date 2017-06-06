require 'rails_helper'

def load_routes_form
  visit root_path
  page.execute_script("$('.ion-merge').click()")
  wait_for_ajax
end

origin_field = 'route[origin]'
destination_field = 'route[destination]'

describe 'Route', type: :feature do
  it 'should show the route form when you click the route button', js: true do
    load_routes_form
    expect(page).to have_content('TRAJETOS')
  end

  context 'Swap Locations of the route' do
    before(:each) do
      load_routes_form
    end

    it 'should swap locations when there is origin and destination', js: true do

      origin = 'origin'
      destination = 'destination'

      fill_in origin_field, with: origin
      fill_in destination_field, with: destination
      find('.btn-reverse-route').click

      expect(page).to have_field(origin_field, with: destination)
      expect(page).to have_field(destination_field, with: origin)
    end

    it 'should swap origin even when destination is blank', js: true do
      origin = 'origin'

      fill_in origin_field, with: origin
      find('.btn-reverse-route').click

      expect(page).to have_field('route[origin]', with: '')
      expect(page).to have_field('route[destination]', with: origin)
    end

    it 'should swap destination even when origin is blank', js: true do
      destination = '-15.76528581775335, -47.866482138633735'

      within('#sidebar form') do
        fill_in 'route[destination]', with: destination
        find('.btn-reverse-route').click
      end

      expect(page).to have_field('route[origin]', with: destination)
      expect(page).to have_field('route[destination]', with: '')
    end
  end

  context 'Calculate the route' do
    before(:each) do
      load_routes_form
      within('#sidebar form') do
        fill_in 'route[origin]', with: '-15.76528581775335, -47.866482138633735'
        fill_in 'route[destination]', with: '-15.766824273744168, -47.867302894592285'
      end
    end

    it 'should calculate the route for pedestrian', js: true do
      within('#sidebar form') do
        page.all('label.btn.btn-outline-info')[0].click
        click_button 'Obter Trajeto'
      end
      expect(find('#mode_text')).to have_content('A pé')
      expect(page).to have_content('You have arrived at your destination.')
    end

    it 'should calculate the route for bicycle', js: true do
      within('#sidebar form') do
        page.all('label.btn.btn-outline-info')[1].click
        click_button 'Obter Trajeto'
      end
      expect(find('#mode_text')).to have_content('Bicicleta')
      expect(page).to have_content('You have arrived at your destination.')
    end

    it 'should calculate the route for car', js: true do
      within('#sidebar form') do
        page.all('label.btn.btn-outline-info')[2].click
        click_button 'Obter Trajeto'
      end
      expect(find('#mode_text')).to have_content('Carro')
      expect(page).to have_content('You have arrived at your destination.')
    end
  end

  context 'Contextmenu' do
    before(:each) do
      visit root_path
      page.execute_script('map.contextmenu.showAt(L.latLng(-15.759648154527714, -47.86931991577149));')
    end

    it 'should show the contextmenu item routes from here', js: true do
      expect(page).to have_content('Rotas a partir daqui')
    end

    it 'should show the contextmenu item routes to here', js: true do
      expect(page).to have_content('Rotas para cá')
    end
  end
end
