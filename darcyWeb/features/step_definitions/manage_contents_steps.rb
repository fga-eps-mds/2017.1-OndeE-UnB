Given(/^I am an admin user$/) do
	# logged in
end


When(/^I go to the admin page$/) do
	visit admin_index_path
end


Then(/^I should see the admin dashboard$/) do
	find('.navbar-title', :text => 'Dashboard')
	#<li class="navbar-title">Dashboard</li>
end


Then(/^I should see a link to manage departments$/) do
	find('.title', :text => 'Departamentos')
end

Then(/^I should see a link to manage buildings$/) do
	find('.title', :text => 'Edifícios')
end

Then(/^I should see a link to manage rooms$/) do
	find('.title', :text => 'Salas')
end


#http://localhost:8080/admin/index