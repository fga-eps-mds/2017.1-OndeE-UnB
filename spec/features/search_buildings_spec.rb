require 'rails_helper'

describe "Search-buildings", type: :feature do

	conteudo = 'O que você está procurando?'
	string = 'aaaaaaaa'

	it "should in delete string in search box field", js: true do
		
		visit root_path
		fill_in 'searchBoxName', with: string
		find('.clearButton').click
		expect(page).to have_no_field('searchBoxName', with: string)

	end
	
end