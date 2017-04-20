Feature: View about page
	In order find information about the project
	As a normal user
	I want to view the about page

	Scenario: View the about menu on the navbar - Desktop
		Given I am a normal user
		And I am in the homepage
		When I click on the about link on the Desktop Version
		Then I should be redirected to the about page


	Scenario: View the about menu on the navbar - Mobile
		Given I am a normal user
		And I am in the homepage
		When I click on the about link on the Mobile Version
		Then I should be redirected to the about page


	Scenario: I should see information about the project on the about page
		Given I am a normal user
		When I go to the about page
		Then I should see information about the project
