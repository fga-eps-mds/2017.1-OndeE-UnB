Given(/^I am a normal user$/) do
  #if  user_signed_in?
  #	@user.update_attributes(current_sign_in_token: "")
  #else
  #	# User logged out
  #end
end

When(/^I go to the homepage$/) do
  visit root_path
end

Then(/^I should see the map$/) do

end