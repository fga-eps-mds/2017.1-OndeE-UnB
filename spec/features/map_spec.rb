require 'rails_helper'

describe 'Map', type: :feature do

  it 'should load the map', js: true do
    map = page.evaluate_script("$('.leaflet-container').length")
    expect(map).to eq(1)
  end

  it 'should map zoom be at 17', js: true do
    zoom = page.evaluate_script('map.getZoom()')
    expect(zoom).to eq(17)
  end

  it 'should not show the sidebar when you open the map', js: true do
    sidebar = page.evaluate_script("$('#sidebar').html()")
    expect(sidebar).to be_empty
  end

  it 'should show the sidebar when click on building', js: true do
    page.execute_script("buildingLayer.getLayers()[0].fire('click')")
	  wait_for_ajax
    sidebar = page.evaluate_script('sidebar.isVisible()')
    expect(sidebar).to eq(true)
  end
end
