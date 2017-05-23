require 'rails_helper'

describe "List of admins", type: :feature do

    FactoryGirl.build :admin


        email = "mds@mds.com"
        senha = "mds123"

    it "deve encontrar a pagina de login de admin" do

        visit admin_session_path

        expect(page).to have_content('Onde É UnB')

    end

    it "deve logar-se como admin" do

        visit admin_session_path

        fill_in 'admin[email]', with: email
        fill_in 'admin[password]', with: senha

        find('input.btn.btn-success.btn-submit').click

        expect(page).to have_content('Administrador')
    end

    it "deve encontrar o card-banner administradores" do

        visit admin_session_path

        fill_in 'admin[email]', with: email
        fill_in 'admin[password]', with: senha

        find('input.btn.btn-success.btn-submit').click

        page.find(:css, 'a[href="/admin/index"]').click

        expect(page).to have_content('Administradores')
    end

    it "deve encontrar campo email na lista de administradores" do

        visit admin_session_path

        fill_in 'admin[email]', with: email
        fill_in 'admin[password]', with: senha

        find('input.btn.btn-success.btn-submit').click

        page.find(:css, 'a[href="/admin/admins"]').click

        expect(page).to have_content('Email')

    end

    it "deve encontrar campo nome na lista de administradores" do

        visit admin_session_path

        fill_in 'admin[email]', with: email
        fill_in 'admin[password]', with: senha

        find('input.btn.btn-success.btn-submit').click

        page.find(:css, 'a[href="/admin/admins"]').click

        expect(page).to have_content('Nome')

    end

end