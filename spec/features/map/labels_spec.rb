require 'rails_helper'

describe 'Labels', type: :feature do

  it 'should show building labels', js: true do
    FactoryGirl.create :building

    visit root_path
    wait_for_ajax

    tooltip = page.evaluate_script("buildingLayer.getLayers()[0].getTooltip().isOpen()")
    expect(tooltip).to eq(true)
  end

  it 'should show building acronym initially', js: true do
    building = FactoryGirl.create :building

    visit root_path
    wait_for_ajax

    acronym = page.evaluate_script("buildingLayer.getLayers()[0].getTooltip()._container.innerText")
    expect(acronym).to eq(building.acronym)
  end

  it 'should show building title when zoom in the map', js: true do
    building = FactoryGirl.create :building

    visit root_path
    wait_for_ajax

    page.execute_script("map.setZoom(18)")
    title = page.evaluate_script("buildingLayer.getLayers()[0].getTooltip()._container.innerText")
    expect(title).to eq(building.title)
  end

  it 'should show the room label', js: true do
    FactoryGirl.create :room
    visit root_path
    wait_for_ajax

    # clicks the building layer feature
    page.execute_script("buildingLayer.getLayers()[0].fire('click')")
    wait_for_ajax

    tooltip = page.evaluate_script("indoorLayer._layers[0]._layers[Object.keys(indoorLayer._layers[0]._layers)[0]].getTooltip().isOpen()")
    expect(tooltip).to eq(true)
  end

  it 'should show the room acronym', js: true do
    room = FactoryGirl.create :room
    visit root_path
    wait_for_ajax

    # clicks the building layer feature
    page.execute_script("buildingLayer.getLayers()[0].fire('click')")
    wait_for_ajax

    acronym = page.evaluate_script("indoorLayer._layers[0]._layers[Object.keys(indoorLayer._layers[0]._layers)[0]].getTooltip()._container.innerText")
    expect(acronym).to eq(room.acronym)
  end

  it 'should show the room title', js: true do
    room = FactoryGirl.create :room
    visit root_path
    wait_for_ajax

    # clicks the building layer feature
    page.execute_script("buildingLayer.getLayers()[0].fire('click')")
    wait_for_ajax

    page.execute_script("map.setZoom(20)")
    title = page.evaluate_script("indoorLayer._layers[0]._layers[Object.keys(indoorLayer._layers[0]._layers)[0]].getTooltip()._container.innerText")
    expect(title).to eq(room.title)
  end

end
