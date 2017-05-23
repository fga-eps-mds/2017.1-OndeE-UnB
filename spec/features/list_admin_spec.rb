require 'rails_helper'

describe "List of admins", type: :feature do

    FactoryGirl.build :admin

    it "deve encontrar a pagina de login de admin" do

        visit admin_session_path

        expect(page).to have_content('Onde É UnB')

    end

    it "deve logar-se como admin" do

        email = "mds@mds.com"
        senha = "mds123"

        visit admin_session_path

        fill_in 'admin[email]', with: email
        fill_in 'admin[password]', with: senha

        find('input.btn.btn-success.btn-submit').click

        expect(page).to have_content('Administrador')
    end


end