Given(/^I am a normal user$/) do
end

Given(/^I wait for the map to appear$/) do
  have_xpath("//div[@class='leaflet-map-pane']")
end

When(/^I go to the homepage$/) do
  visit root_path
end

Then(/^I should see the map$/) do
  begin
    field = find_by_id('map')
  rescue Capybara::ElementNotFound
    puts 'map id not found in homepage'
    return false
  end
end

@javascript
Then(/^I should see zoom in and out buttons$/) do
  # puts find_all("//a[@class='leaflet-control-zoom-in']")
  # find(".fa-map-marker")
  # page.should have_xpath("//div[@class='leaflet-map-pane']")
  # expect(page).to have_selector('.leaflet-control-zoom-in')
  # find_all("//a[@class='leaflet-control-zoom-out']")
end

Then(/^I should see a search box$/) do
  find('.search input')
  find('.search .fa-search')
end

Then(/^I should see the buttons to change the floor$/) do
  find('.level button', text:  'Subsolo').click
  find('.level button', text:  '1').click
  find('.level button', text:  '2').click
  find('.level button', text:  '3').click
end

# When(/^I click on the zoom in$/) do

#   find_all("//a[@class='leaflet-control-zoom-out']").map {
#     |zoomOut|
#     puts zoomOut
#     zoomOut.click
#   }

#   a = find_all("//div[@class='leaflet-proxy']").map {
#     |ab|
#     puts ab
#   }

#   find_all("//a[@class='leaflet-control-zoom-in']").map {
#     |zoomIn|
#     zoomIn.click
#   }
# end

# Then(/^the map should be zoomed in$/) do
#   #puts @helloa
# end

# @javascript
