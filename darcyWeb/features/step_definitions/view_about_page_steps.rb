Given(/^I am in the homepage$/) do
  visit root_path
end

When(/^I click on the about link on the Desktop Version$/) do
  find_all('a', :text => 'Sobre')[0].click
end

When(/^I click on the about link on the Mobile Version$/) do
  find_all('a', :text => 'Sobre')[0].click
end

Then(/^I should be redirected to the about page$/) do
  expected = about_path
  actual = URI.parse(current_url).path
  
  # to be, equal  -> same type
  expect(actual).to eql(expected)

end



When(/^I go to the about page$/) do
  visit about_path
end

Then(/^I should see information about the project$/) do
  expect(page).to have_content("Projeto")
  expect(page).to have_content("Darcy Ribeiro")
  expect(page).to have_content("Time")
end

