Feature: View Unb Map
	In order find a specific location 
	As a normal user
	I want to view the university map

	Scenario: View the Map
		Given I am a normal user
		When I go to the homepage
		And  I wait for the map to appear
		Then I should see the map
		And I should see zoom in and out buttons
		And I should see the buttons to change the floor


	#Scenario: Zoom in the map
	#	Given I go to the homepage
	#	And I wait for the map to appear
	#	When I click on the zoom in
	#	Then the map should be zoomed in



	Scenario: Search for places
		Given I am a normal user
		When I go to the homepage
		Then I should see a search box

