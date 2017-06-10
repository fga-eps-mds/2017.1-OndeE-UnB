require 'rails_helper'

describe "Tutorial", type: :feature do

	before(:each) do
		visit root_path
	end

  # it "Should show a tutorial button", js: true do
  #   # control = page.evaluate_script("$('.leaflet-bar.easy-button-container.leaflet-control').length")
  #   # expect(control).to be(1)
  # end
  it "Should show the tutorial", js:true do
    control = page.evaluate_script("$('.introjs-tooltip').length")
    expect(control).to be(1)
  end
  it "Should have a previous button", js:true do
    control = page.evaluate_script("$('.introjs-prevbutton').length")
    expect(control).to be(1)
  end
  it "Should have a next butoon", js:true do
    control = page.evaluate_script("$('.introjs-nextbutton').length")
    expect(control).to be(1)
  end
  it "Should have a skip button", js:true do
    control = page.evaluate_script("$('.introjs-skipbutton').length")
    expect(control).to be(1)
  end

end
