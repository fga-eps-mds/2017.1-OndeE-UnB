require 'rails_helper'

latTest = "-15.759648154527714"
lngTest = "-47.86931991577149"

describe 'Route', type: :feature do

  context 'View the Pin when visiting the url shared' do
    before(:each) do
      visit findme_path(lat: latTest, lng: lngTest)
    end


    it 'should show the contextmenu share location', js: true do
      expect(page.evaluate_script("sharedLocation.marker.getLatLng().lat").to_s).to eq latTest
      expect(page.evaluate_script("sharedLocation.marker.getLatLng().lng").to_s).to eq lngTest
    end

  end

  context 'View the share location submenu' do
    before(:each) do
      visit root_path
      page.execute_script('map.contextmenu.showAt(L.latLng(-15.759648154527714, -47.86931991577149));')
    end

    it 'should show the contextmenu share location', js: true do
      expect(page).to have_content('Compartilhar localização')
    end
  end

end
