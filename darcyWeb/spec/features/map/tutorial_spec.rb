require 'rails_helper'

describe "Tutorial", type: :feature do

	before(:each) do
		visit root_path
	end

  it "Should show the tutorial", js:true do
    control = page.evaluate_script("$('.introjs-tooltip').length")
    expect(control).to be(1)
  end
  it "Should have a previous button", js:true do
    control = page.evaluate_script("$('.introjs-prevbutton').length")
    expect(control).to be(1)
  end
  it "Should have a next butoon", js:true do
    control = page.evaluate_script("$('.introjs-nextbutton').length")
    expect(control).to be(1)
  end
  it "Should have a skip button", js:true do
    control = page.evaluate_script("$('.introjs-skipbutton').length")
    expect(control).to be(1)
  end
 it "Should show the text of step 1", js:true do
 	expect(page).to have_content("WELCOME!");
 end
 it "Should go to step 2", js:true do
	 page.find('.introjs-nextbutton').click
	 expect(page).to have_content("PESQUISA");
 end
 it "Should go to step 3", js:true do
	 2.times do
	 	page.find('.introjs-nextbutton').click
	 end
	 expect(page).to have_content("ZOOM");
 end
 it "Should go to step 4", js:true do
	 3.times do
	 	page.find('.introjs-nextbutton').click
	 end
	 expect(page).to have_content("ROTAS");
 end
 it "Should go to step 5", js:true do
	 4.times do
	 	page.find('.introjs-nextbutton').click
	 end
	 expect(page).to have_content("PONTOS");
 end
 it "Should go to step 6", js:true do
	 5.times do
	 	page.find('.introjs-nextbutton').click
	 end
	 expect(page).to have_content("MENU");
 end
 it "Should go to step 7", js:true do
	 6.times do
	 	page.find('.introjs-nextbutton').click
	 end
	 expect(page).to have_content("FIM!");
 end

end
