require 'rails_helper'

describe 'Map', type: :feature do

  it 'should load the map', js: true do
    visit root_path
    map = page.evaluate_script("$('.leaflet-container').length")
    expect(map).to eq(1)
  end

  it 'should map zoom be at 16', js: true do
    visit root_path
    zoom = page.evaluate_script('map.getZoom()')
    expect(zoom).to eq(14)
  end

  it 'should not show the sidebar when you open the map', js: true do
    visit root_path
    sidebar = page.evaluate_script("$('#sidebar').html()")
    expect(sidebar).to be_empty
  end

  it 'should show the sidebar when click on building', js: true do
    FactoryGirl.create :building

    visit root_path
    wait_for_ajax

    page.execute_script("buildingLayer.getLayers()[0].fire('click')")
	  wait_for_ajax

    sidebar = page.evaluate_script('sidebar.isVisible()')
    expect(sidebar).to eq(true)
  end


  it "Should find admin link on the navbar", js:true do
    visit root_path
    page.execute_script('$(".navbar-toggler").trigger("click")')
    wait_for_ajax
    page.execute_script('$("#navbar a")[0].click()')
    wait_for_ajax
    expect(page).to have_content("Onde É UnB")
  end

end
