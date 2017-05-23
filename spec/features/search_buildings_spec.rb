require 'rails_helper'

describe "Search-buildings", type: :feature do

	conteudo = 'O que você está procurando?'
	string = 'aaaaaaaa'
	FactoryGirl.build :building
	search = 'R'

	it "should show the search box", js: true do

		visit root_path
		expect(page).to have_field('searchBox')

	end

	it "should in delete string in search box field", js: true do

		visit root_path
		fill_in 'searchBox', with: string
		find('.clearButton').click
		expect(page).to have_no_field('searchBox', with: string)

	end

	it "should find suggestions" , js:true do

		visit root_path
		fill_in 'searchBox', with: search
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content('Reitoria')

	end
/--
	it "should show the message 'Nada foi encontrado' when there is no buildings in database", js:true do

		vist root_path
		fill_in 'searchBox', with: 'LALALALALAL'
		wait_for_ajax
		expect(find('#resultsDiv')).to have_content("Nada foi encontrado")
	end
--/

end