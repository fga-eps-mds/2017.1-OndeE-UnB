Feature: Manage the web application content
	In order to manage the website content
	As an admin user
	I want to interact with the admin dashboard

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
