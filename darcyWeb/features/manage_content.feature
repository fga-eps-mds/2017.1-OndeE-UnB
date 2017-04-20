Feature: Manage the web application content
	In order to manage the website content
	As an admin user
	I want to interact with the admin dashboard



	Scenario: Try to visit the admin dashboard as normal user
		Given I am an not an admin user
		When I go to the admin page
		Then I should be redirected to the login page


	Scenario: View the Admin Dashboard
		Given I am an admin user
		When I go to the admin page
		Then I should see the admin dashboard


	Scenario: Show a link to manage departments
		Given I am an admin user
		When I go to the admin page
		Then I should see a link to manage departments


	Scenario: Show a link to manage buildings
		Given I am an admin user
		When I go to the admin page
		Then I should see a link to manage buildings


	Scenario: Show a link to manage rooms
		Given I am an admin user
		When I go to the admin page
		Then I should see a link to manage rooms



	Scenario: Redirect to the departments page
		Given I am an admin user
		When I go to the admin page
		And I click on the departments link
		Then I should go to the departments index page



	Scenario: Redirect to the buildings page
		Given I am an admin user
		When I go to the admin page
		And I click on the buildings link
		Then I should go to the buildings index page



	#Scenario: Redirect to the rooms page
	#	Given I am an admin user
	#	When I go to the admin page
	#	And I click on the rooms link
	#	Then I should go to the rooms index page



	#Scenario: Go to the page to create departments
	#	Given I am an admin user
	#	When I go to the departments page
	#	And I click on new department
	#	Then I should see a link to manage rooms
