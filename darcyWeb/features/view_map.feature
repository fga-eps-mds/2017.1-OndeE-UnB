Feature: View Unb Map
	In order find a specific location 
	As a normal user
	I want to view the university map

	Scenario: View Map
		Given I am a normal user
		When I go to the homepage
		Then I should see the map