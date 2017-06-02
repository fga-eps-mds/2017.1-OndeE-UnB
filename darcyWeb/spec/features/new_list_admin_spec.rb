require 'rails_helper'

feature "signing in" do 
	admin = FactoryGirl.create(:admin)

	email = "mds@mds.com"
        	senha = "mds123"

	def fill_in_signin_fields
		fill_in 'admin[email]', with: admin.email
        		fill_in 'admin[password]', with: admin.senha
        		find('input.btn.btn-success.btn-submit').click
        	end

        	scenario "visiting the site to sign in" do 
        		visit admin_session_path
        		fill_in_signin_fields
        		expect(page).to have_content('Administrador')
        	end
	
end