require 'rails_helper'

describe "Search", type: :feature do

	conteudo = 'O que você está procurando?'
	string = 'aaaaaaaa'
	FactoryGirl.build :building

	it "Should show the search box", js: true do

		visit root_path
		expect(page).to have_field('searchBox')

	end

	it "Should in delete string in search box field", js: true do

		visit root_path
		page.execute_script("introJs.exit()")
		fill_in 'searchBox', with: string
		find('.clearButton').click
		expect(page).to have_no_field('searchBox', with: string)

	end

	it "Should find a building by title" , js:true do

		FactoryGirl.create :building
		visit root_path
		fill_in 'searchBox', with: 'Bloco'
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content('Bloco')

	end

	it "Should find a building by acronym" , js:true do

		FactoryGirl.create :building
		visit root_path
		fill_in 'searchBox', with: 'BSA'
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content('Bloco')

	end

	it "Should find a room by title" , js:true do
		FactoryGirl.create :room
		visit root_path
		fill_in 'searchBox', with: 'Sala'
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content('Sala')
	end

end
