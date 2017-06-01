require 'rails_helper'

describe "Map filter", type: :feature do

	it "should show filter button", js: true do
    #
		visit root_path
    control = page.evaluate_script("$('.leaflet-control-layers').length")
		expect(control).to be(1)
	end

  it "should hide buildings when building checkbox is unchecked", js: true do
    visit root_path
    # clicks the buildings checkbox
    page.execute_script("$('.leaflet-control-layers-selector').eq(2).trigger('click')")
    layer = page.evaluate_script("map.hasLayer(buildingLayer)")
    expect(layer).to be(false)
  end

end
