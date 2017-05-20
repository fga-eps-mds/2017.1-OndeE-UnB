require 'rails_helper'

describe "Search", type: :feature do

	conteudo = 'O que você está procurando?'
	string = 'aaaaaaaa'
	FactoryGirl.build :building
	FactoryGirl.build :department

	it "Should show the search box", js: true do

		visit root_path
		expect(page).to have_field('searchBox')

	end

	it "should in delete string in search box field", js: true do

		visit root_path
		fill_in 'searchBox', with: string
		find('.clearButton').click
		expect(page).to have_no_field('searchBox', with: string)

	end

	it "Should find a department" , js:true do

		visit root_path
		fill_in 'searchBox', with: 'DA'
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content('Departamento de Administração')

	end

	it "Should find a building" , js:true do

		visit root_path
		fill_in 'searchBox', with: 'Reitoria'
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content('Reitoria')

	end

end
