# require 'rails_helper'
#
# describe "List of admins", type: :feature do
#
#    let(:admin) {FactoryGirl.create(:admin)}
#
#
#         email = "mds@mds.com"
#         senha = "mds123"
#
#     it "should find the page of admin sign in" do
#
#         visit login_path
#         expect(page).to have_content('Onde É UnB')
#
#     end
#
#     it "should log in as admin" do
#
#         visit login_path
#         fill_in 'admin[email]', with: email
#         fill_in 'admin[password]', with: senha
#         find('input.btn.btn-success.btn-submit').click
#         expect(page).to have_content('Administrador')
#
#     end
#
#     context "Should be logged in the system" do
#
#         email = "mds@mds.com"
#         senha = "mds123"
#
#         before(:each) do
#                 visit login_path
#                 fill_in 'admin[email]', with: email
#                 fill_in 'admin[password]', with: senha
#                 find('input.btn.btn-success.btn-submit').click
#         end
#
#         it "should find the card-banner of admins" do
#             page.find(:css, 'a[href="/admin/index"]').click
#             expect(page).to have_content('Administradores')
#         end
#
#         it "should find the field email on list of admins" do
#
#             page.find(:css, 'a[href="/admin/admins"]').click
#             expect(page).to have_content('Email')
#
#         end
#
#         it "should find the field name on list of admins" do
#
#             page.find(:css, 'a[href="/admin/admins"]').click
#             expect(page).to have_content('Nome')
#
#         end
#
#         it "should find the email of admin tester" do
#
#             page.find(:css, 'a[href="/admin/admins"]').click
#             expect(page).to have_content("mds@mds.com")
#
#         end
#
#         it "should find the name of admin tester" do
#
#             page.find(:css, 'a[href="/admin/admins"]').click
#             expect(page).to have_content("MDS")
#
#         end
#
#     end
#
# end
#
# describe "Creating Admin", type: :feature do
#
#     let(:admin) {FactoryGirl.create(:admin)}
#
#         email = "mds@mds.com"
#         senha = "mds123"
#
#      context "Should be logged in the system" do
#
#         email = "mds@mds.com"
#         senha = "mds123"
#
#         before(:each) do
#                 visit login_path
#                 fill_in 'admin[email]', with: email
#                 fill_in 'admin[password]', with: senha
#                 find('input.btn.btn-success.btn-submit').click
#                 visit new_admin_admin_path
#
#         end
#
#          it "should find the page of create admin" do
#
#             expect(page).to have_content('Criar Administrador')
#
#         end
#
#          it "should find the field name on create admin" do
#
#             expect(page).to have_content('Nome')
#
#         end
#
#          it "should find the field email on create admin" do
#
#             expect(page).to have_content('Email')
#
#         end
#
#          it "should find the field password on create admin" do
#
#             expect(page).to have_content('Senha')
#
#         end
#
#         it "should find the field password confirmation on create admin" do
#
#             expect(page).to have_content('Confirmação da senha')
#
#         end
#
#         it "should create a new admin" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Fulano'
#                 fill_in 'Email', :with => 'mesmo@mail.com'
#                 fill_in 'Senha', :with => 'mds123'
#                 fill_in 'Confirmação da senha', :with => 'mds123'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Administrador criado com êxito.')
#
#         end
#
#         it "should not let create a admin with short password" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Fulano'
#                 fill_in 'Email', :with => 'mesmo@mail.com'
#                 fill_in 'Senha', :with => '123'
#                 fill_in 'Confirmação da senha', :with => '123'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Insira a senha com no mínimo 6 caracteres.')
#
#         end
#
#         it "should not let create a admin with differents passwords" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Fulano'
#                 fill_in 'Email', :with => 'mesmo@mail.com'
#                 fill_in 'Senha', :with => '123456'
#                 fill_in 'Confirmação da senha', :with => '654321'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('As senhas não correspondem.')
#
#         end
#
#         it "should not let create a admin without name" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => ''
#                 fill_in 'Email', :with => 'mesmo@mail.com'
#                 fill_in 'Senha', :with => '123456'
#                 fill_in 'Confirmação da senha', :with => '123456'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Insira o nome.')
#
#         end
#
#         it "should not let create a admin without email" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Admin'
#                 fill_in 'Email', :with => ''
#                 fill_in 'Senha', :with => '123456'
#                 fill_in 'Confirmação da senha', :with => '123456'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Insira o email.')
#
#         end
#
#          it "should not let create a admin without password" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Admin'
#                 fill_in 'Email', :with => 'email@email.com'
#                 fill_in 'Senha', :with => ''
#                 fill_in 'Confirmação da senha', :with => '123456'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Insira a senha.')
#
#         end
#
#          it "should not let create a admin with long name" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Essenomeegrandepracarambapeloamordedeusparadedigitar'
#                 fill_in 'Email', :with => 'mail@mail.com'
#                 fill_in 'Senha', :with => '123456'
#                 fill_in 'Confirmação da senha', :with => '123456'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Insira um nome com até 20 caracteres.')
#
#         end
#
#         it "should not let create a admin with existing mail" do
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'Euzinho'
#                 fill_in 'Email', :with => 'mail@mail.com'
#                 fill_in 'Senha', :with => '123456'
#                 fill_in 'Confirmação da senha', :with => '123456'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             find('i.fa.fa-plus').click
#
#              visit new_admin_admin_path
#
#             within ("#new_admin") do
#                 fill_in 'Nome', :with => 'outro nome'
#                 fill_in 'Email', :with => 'mail@mail.com'
#                 fill_in 'Senha', :with => '123456'
#                 fill_in 'Confirmação da senha', :with => '123456'
#             end
#
#             find('input.btn.btn-sm.btn-success').click
#
#             expect(page).to have_content('Já existe administrador com esse email.')
#
#         end
#
#     end
#
# end
#
# describe "List of admins", type: :feature do
#
#    let(:admin) {FactoryGirl.create(:admin)}
#
#
#         email = "mds@mds.com"
#         senha = "mds123"
#
#     context "Should be logged in the system" do
#
#         email = "mds@mds.com"
#         senha = "mds123"
#
#         before(:each) do
#                 visit login_path
#                 fill_in 'admin[email]', with: email
#                 fill_in 'admin[password]', with: senha
#                 find('input.btn.btn-success.btn-submit').click
#                 admin_index_path
#         end
#
#     end
#
# end
