require 'rails_helper'

describe "Map mask", type: :feature do
  before(:each) do
    visit root_path
    wait_for_ajax
  end

  it "should show map mask" , js: true do
    mask = page.evaluate_script('map.hasLayer(mask)')
    expect(mask).to be(true)
  end
  
end
