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
    FactoryGirl.create :building

    visit root_path
    wait_for_ajax

    page.execute_script("buildingLayer.getLayers()[0].fire('click')")
	  wait_for_ajax

    sidebar = page.evaluate_script('sidebar.isVisible()')
    expect(sidebar).to eq(true)
  end

  it 'should show the departments', js: true do
    visit root_path
    wait_for_ajax
    departments = page.execute_script("departmentLayer.getLayers()")
    expect(departments).not_to eq(0)
  end

  it "Should find a navbar", js:true do

    visit root_path
    expect(find('.navbar')).to have_content("Onde É? Universidade de Brasília")

  end

  it "Should find admin link on the navbar", js:true do

    visit root_path
    expect(find('.navbar')).to have_content("Administração")

  end

  it "Should find the link of admin on the navbar", js:true do

    visit root_path
    expect(find('.navbar')).to have_link("Administração")

  end

end
