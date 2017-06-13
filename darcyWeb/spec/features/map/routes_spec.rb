require 'rails_helper'

def load_routes_form
  visit root_path
  wait_for_ajax
  page.execute_script("$('.ion-merge').click()")
  wait_for_ajax
end

origin_field = 'searchBox'
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

      origin_before_value = 'origin'
      destination_before_value = 'destination'

      fill_in origin_field, with: origin_before_value
      fill_in destination_field, with: destination_before_value

      page.execute_script('$(".btn-reverse-route").trigger("click")')

      origin_after_value = page.evaluate_script('$("#route_origin").val()')
      destination_after_value = page.evaluate_script('$("#route_destination").val()')

      expect(origin_after_value).to eq(destination_before_value)
      expect(destination_after_value).to eq(origin_before_value)
    end

    it 'should swap origin even when destination is blank', js: true do
      origin_before_value = 'origin'

      fill_in origin_field, with: origin_before_value

      page.execute_script('$(".btn-reverse-route").trigger("click")')

      origin_after_value = page.evaluate_script('$("#route_origin").val()')
      destination_after_value = page.evaluate_script('$("#route_destination").val()')

      expect(origin_after_value).to eq('')
      expect(destination_after_value).to eq(origin_before_value)

    end

    it 'should swap destination even when origin is blank', js: true do
      destination_before_value = 'destination'

      fill_in destination_field, with: destination_before_value

      page.execute_script('$(".btn-reverse-route").trigger("click")')

      origin_after_value = page.evaluate_script('$("#route_origin").val()')
      destination_after_value = page.evaluate_script('$("#route_destination").val()')

      expect(origin_after_value).to eq(destination_before_value)
      expect(destination_after_value).to eq('')

    end
  end

context 'Calculate the route without coordination' do
    before(:each) do
      load_routes_form
    end

   it 'should autocomplete orgin field', js: true do
      FactoryGirl.create :building
      page.execute_script('$(".input-location.origin").find(".searchBox").val("Bl").trigger("keyup")')
      wait_for_ajax
      expect(page).to have_content('Bloco')
    end

   it 'should autocomplete destination field', js: true do
      FactoryGirl.create :building
      page.execute_script('$(".input-location.destination").find(".searchBox").val("Bl").trigger("keyup")')
      wait_for_ajax
      expect(page).to have_content('Bloco')
    end

    it 'should create foot route with origin and destination made by autocomplete', js: true do
      FactoryGirl.create :building
      FactoryGirl.create :building2
      page.execute_script('$(".input-location.origin").find(".searchBox").val("Bl").trigger("keyup")')
      find('#listElement0', :text => 'Bloco').click
      page.execute_script('$(".input-location.destination").find(".searchBox").val("IC").trigger("keyup")')
      find('#listElement0', :text => 'ICC').click
      wait_for_ajax
      expect(page).to have_content('Bloco')
      expect(page).to have_content('Instituto') 

      find('.ion-android-walk').click()
      find('.btn.btn-info.btn-block').click()

      expect(page).to have_content('TEMPO')

    end



  end

  context 'Calculate the route' do
    before(:each) do
      load_routes_form
      within('#sidebar form') do
        fill_in origin_field, with: '-15.76528581775335, -47.866482138633735'
        fill_in destination_field, with: '-15.766824273744168, -47.867302894592285'
      end
    end

    it 'should calculate the route for pedestrian', js: true do
      within('#sidebar form') do
        page.all('label.btn.btn-outline-info')[0].click
        page.execute_script('$("#route_submit").click()')
      end
      expect(find('#mode_text')).to have_content('A pé')
      expect(page).to have_content('Você chegou ao seu destino.')
    end

    it 'should calculate the route for bicycle', js: true do
      within('#sidebar form') do
        page.all('label.btn.btn-outline-info')[1].click
        page.execute_script('$("#route_submit").click()')
      end
      expect(find('#mode_text')).to have_content('Bicicleta')
      expect(page).to have_content('Você chegou ao seu destino.')
    end

    it 'should calculate the route for car', js: true do
      within('#sidebar form') do
        page.all('label.btn.btn-outline-info')[2].click
        page.execute_script('$("#route_submit").click()')
      end
      expect(find('#mode_text')).to have_content('Carro')
      expect(page).to have_content('Você chegou ao seu destino.')
    end

  end

  context 'Translate Routes' do
    before(:each) do
      visit root_path
    end

    it 'should translate routes from english - test1', js: true do
      translation = page.evaluate_script('translateRoute("Turn left.")')
      expect(translation).to eq('Vire à esquerda.')
    end

    it 'should translate routes from english - test2', js: true do
      translation = page.evaluate_script('translateRoute("Turn right.")')
      expect(translation).to eq('Vire à direita.')
    end

    it 'should translate routes from english - test3', js: true do
      translation = page.evaluate_script('translateRoute("Drive east.")')
      expect(translation).to eq('Siga em direção leste.')
    end

    it 'should translate routes from english - test4', js: true do
      translation = page.evaluate_script('translateRoute("Turn right onto ABCDE")')
      expect(translation).to eq('Vire a direita em ABCDE')
    end

    it 'should not fail if there is no translation, it should return the original string', js: true do
      translation = page.evaluate_script('translateRoute("There is no translation!")')
      expect(translation).to eq('There is no translation!')
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
