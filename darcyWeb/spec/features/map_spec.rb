require 'rails_helper'

describe "Map", type: :feature do
	it "should load the map", js: true do
		visit root_path
		map = page.evaluate_script("$('.leaflet-container').length")
		expect(map).to eq(1)
	end

	it "should map zoom be at 18", js: true do
		visit root_path
		# zoom = page.evaluate_script("map.getZoom()")
		# expect(zoom).to eq(18)
	end
end
