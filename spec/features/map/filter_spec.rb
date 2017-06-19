require 'rails_helper'

describe "Map filter", type: :feature do

	before(:each) do
		[:building, :bike, :snackbar, :bathroom, :busstop, :entrance].each do |factory|
			FactoryGirl.create factory
		end
		visit root_path
		wait_for_ajax
	end

	it "should show filter button", js: true do
    control = page.evaluate_script("$('.leaflet-control-layers').length")
		expect(control).to be(1)
	end

  it "should hide buildings when building checkbox is unchecked", js: true do
    # clicks the buildings checkbox
    page.execute_script("$('.leaflet-control-layers-selector').eq(2).trigger('click')")
    layer = page.evaluate_script("map.hasLayer(buildingLayer)")
    expect(layer).to be(false)
  end

	it "should show the bicycle racks when bicycle rack checkbox is checked", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(3).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(bikesLayer)")
		expect(layer).to be(true)
	end

	it "should show the bathrooms when bathrooms checkbox is checked", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(4).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(bathroomLayer)")
		expect(layer).to be(true)
	end

	it "should show the snackbar when snackbars checkbox is checked", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(5).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(snackbarLayer)")
		expect(layer).to be(true)
	end

	it "should show the entrance when the entrances checkbox is checked", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(6).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(entranceLayer)")
		expect(layer).to be(true)
	end

	it "should show the busstop when the busstops checkbox is checked", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(7).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(busstopLayer)")
		expect(layer).to be(true)
	end

	it "should show the satelite map when the satelite button is selected", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(0).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(esri_WorldImagery)")
		expect(layer).to be(true)
	end

	it "should not show the street map when the streets button is not selected", js: true do
		page.execute_script("$('.leaflet-control-layers-selector').eq(0).trigger('click')")
		layer = page.evaluate_script("map.hasLayer(mapBox)")
		expect(layer).to be(false)
	end
end
