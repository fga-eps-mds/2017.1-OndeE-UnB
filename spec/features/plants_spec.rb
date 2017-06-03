require 'rails_helper'

describe 'Plant', type: :feature do

      context "Change plant" do

            before(:each) do
                  Capybara.raise_server_errors = false
                  visit root_path
            end

            it "Should show a image on map", js: true  do
              overlay = page.evaluate_script('overlay._url')
              expect(overlay).to eq('https://s14.postimg.org/4i5f9ehe9/icc_centro_ter.png')
            end
            it "Should change image", js: true do
              select "2", :from => "options"
              overlay = page.evaluate_script('overlay._url')
              expect(overlay).to eq('https://s2.postimg.org/r3jg952mh/icc_sul_ter.png')
            end

            it "Should not load the wrong image", js:true do
              select "1", :from => "options"
              overlay = page.evaluate_script('overlay._url')
              expect(overlay).not_to eq('https://s2.postimg.org/r3jg952mh/icc_sul_ter.png')
            end

            it "Should have markers", js:true do
              marker1 = page.evaluate_script('marker1')
              marker2 = page.evaluate_script('marker2')
              marker3 = page.evaluate_script('marker3')
              expect(marker1).not_to be_nil
              expect(marker2).not_to be_nil
              expect(marker3).not_to be_nil
            end

          end

end
