require 'rails_helper'

describe 'Point', type: :feature do

      context "New point" do

            email = "admin@admin.com"
            senha = "123456"
            before(:each) do
                  Capybara.raise_server_errors = false
                  visit login_path
                  fill_in 'admin[email]', with: email
                  fill_in 'admin[password]', with: senha
                  find('input.btn.btn-success.btn-submit').click
                  visit new_admin_point_path
            end

            it "Should Save a point on map", js: true  do
                  find('div.leaflet-draw-toolbar.leaflet-bar.leaflet-draw-toolbar-top').click
                  find('#map').click
                  within("#card form") do
                        fill_in 'point[title]', with: 'titulo1'
                        fill_in 'point[description]', with: 'descricao1'
                        fill_in 'point[latitude]', with: '-15.765306468246553'
                        fill_in 'point[longitude]', with: '-47.87395477294922'
                        select 'Bicicletario', from: :point_type_point
                        page.execute_script("new_point.Salvar.click()")
                  end
                  expect(page).to have_content('êxito.')
                  expect(page).to have_content('TÍTULO')
                  expect(page).to have_content('DESCRIÇÃO')
                  expect(page).to have_current_path(admin_points_path)
            end

            it "Should Not save point if has not title", js: true  do
                  find('div.leaflet-draw-toolbar.leaflet-bar.leaflet-draw-toolbar-top').click
                  find('#map').click
                  within("#card form") do
                        fill_in 'point[description]', with: 'descricao1'
                        fill_in 'point[latitude]', with: '-15.765306468246553'
                        fill_in 'point[longitude]', with: '-47.87395477294922'
                        select 'Bicicletario', from: :point_type_point
                        page.execute_script("new_point.Salvar.click()")
                  end
                  expect(page).to have_current_path(new_admin_point_path)
            end

            it "Should Not save point if has not latitude", js: true  do
                  find('div.leaflet-draw-toolbar.leaflet-bar.leaflet-draw-toolbar-top').click
                  find('#map').click
                  within("#card form") do
                        fill_in 'point[title]', with: 'titulo1'
                        fill_in 'point[description]', with: 'descricao1'
                        fill_in 'point[longitude]', with: '-47.87395477294922'
                        select 'Bicicletario', from: :point_type_point
                        page.execute_script("new_point.Salvar.click()")
                  end
                  expect(page).to have_current_path(new_admin_point_path)
            end

            it "Should Not save point if has not longitude", js: true  do
                  find('div.leaflet-draw-toolbar.leaflet-bar.leaflet-draw-toolbar-top').click
                  find('#map').click
                  within("#card form") do
                        fill_in 'point[title]', with: 'titulo1'
                        fill_in 'point[description]', with: 'descricao1'
                        fill_in 'point[longitude]', with: '-47.87395477294922'
                        select 'Bicicletario', from: :point_type_point
                        page.execute_script("new_point.Salvar.click()")
                  end
                  expect(page).to have_current_path(new_admin_point_path)
            end

            it "Should Not save point if has not description", js: true  do
                  find('div.leaflet-draw-toolbar.leaflet-bar.leaflet-draw-toolbar-top').click
                  find('#map').click
                  within("#card form") do
                        fill_in 'point[title]', with: 'titulo1'
                        fill_in 'point[latitude]', with: '-15.765306468246553'
                        fill_in 'point[longitude]', with: '-47.87395477294922'
                        select 'Bicicletario', from: :point_type_point
                        page.execute_script("new_point.Salvar.click()")
                  end
                  expect(page).to have_current_path(new_admin_point_path)
            end

            it "Should Not save point if has not type of point", js: true  do
                  find('div.leaflet-draw-toolbar.leaflet-bar.leaflet-draw-toolbar-top').click
                  find('#map').click
                  within("#card form") do
                        fill_in 'point[title]', with: 'titulo1'
                        fill_in 'point[description]', with: 'descricao1'
                        fill_in 'point[latitude]', with: '-15.765306468246553'
                        fill_in 'point[longitude]', with: '-47.87395477294922'
                        page.execute_script("new_point.Salvar.click()")
                  end
                  expect(page).to have_current_path(new_admin_point_path)
            end
      end
end
