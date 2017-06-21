require 'rails_helper'

def load_routes_form
  visit root_path
  wait_for_ajax
  page.execute_script("$('.ion-merge').click()")
  wait_for_ajax
end

origin_field = '#route_origin'
destination_field = '#route_destination'

describe 'Route', type: :feature do
  it 'should show the route form when you click the route button', js: true do
    load_routes_form
    expect(page).to have_content('TRAJETOS')
  end

  context 'Swap Locations of the route' do
    before(:each) do
      load_routes_form
    end

    pending 'should swap locations when there is origin and destination', js: true do

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

    pending 'should swap origin even when destination is blank', js: true do
      origin_before_value = 'origin'

      fill_in origin_field, with: origin_before_value

      page.execute_script('$(".btn-reverse-route").trigger("click")')

      origin_after_value = page.evaluate_script('$("#route_origin").val()')
      destination_after_value = page.evaluate_script('$("#route_destination").val()')

      expect(origin_after_value).to eq('')
      expect(destination_after_value).to eq(origin_before_value)

    end

    pending 'should swap destination even when origin is blank', js: true do
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
      FactoryGirl.create :building
      load_routes_form
    end

   it 'should autocomplete origin field', js: true do
      page.execute_script('$("input.origin.tt-input").focus().typeahead("val", "Bl").focus()')
      wait_for_ajax
      expect(page).to have_content('Bloco')
    end

   it 'should autocomplete destination field', js: true do
      page.execute_script('$("input.destination.tt-input").focus().typeahead("val", "Bl").focus()')
      wait_for_ajax
      expect(page).to have_content('Bloco')
    end

    it 'should create foot route with origin and destination made by autocomplete', js: true do
      FactoryGirl.create :building_icc

      # Trigger autocomplete origin field
      page.execute_script('$("input.origin.tt-input").focus().typeahead("val", "Bl").focus()')
      wait_for_ajax

      # Trigger click on the first suggestion for origin
      page.execute_script('$("input.origin").parent().find(".tt-suggestion").eq(0).trigger("click")')

      # Trigger autocomplete for destination field
      page.execute_script('$("input.destination.tt-input").focus().typeahead("val", "Bl").focus()')
      wait_for_ajax

      # Trigger click on the first sugestion for destination
      page.execute_script('$("input.destination").parent().find(".tt-suggestion").eq(0).trigger("click")')

      page.execute_script('$("#route_submit").click()')
      expect(page).to have_content('TEMPO')
    end

  end

  context 'Calculate the route' do
    before(:each) do
      load_routes_form
      within('#sidebar form') do
        first(origin_field, visible: false).set('-15.76528581775335, -47.866482138633735')
        first(destination_field, visible: false).set('-15.766824273744168, -47.867302894592285')
      end
    end

    it 'should calculate the route for pedestrian', js: true do
      page.execute_script("$('label.btn.btn-outline-info').eq(0).trigger('click')")
      page.execute_script('$("#route_submit").click()')
      expect(find('#mode_text')).to have_content('A pé')
    end

    it 'should calculate the route for bicycle', js: true do
      page.execute_script("$('label.btn.btn-outline-info').eq(1).trigger('click')")
      page.execute_script('$("#route_submit").click()')
      expect(find('#mode_text')).to have_content('Bicicleta')
    end

    it 'should calculate the route for car', js: true do
      page.execute_script("$('label.btn.btn-outline-info').eq(2).trigger('click')")
      page.execute_script('$("#route_submit").click()')
      expect(find('#mode_text')).to have_content('Carro')
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
