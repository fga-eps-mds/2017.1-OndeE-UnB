require 'rails_helper'

describe "List of admins", type: :feature do

    FactoryGirl.build :admin


        email = "mds@mds.com"
        senha = "mds123"

    it "should find the page of admin sign in" do

        visit admin_session_path

        expect(page).to have_content('Onde É UnB')

    end

    it "should log in as admin" do

        visit admin_session_path

        fill_in 'admin[email]', with: email
        fill_in 'admin[password]', with: senha

        find('input.btn.btn-success.btn-submit').click

        expect(page).to have_content('Administrador')
    end

    context "Should be logged in the system" do

        email = "mds@mds.com"
        senha = "mds123"

        before(:each) do
                visit admin_session_path

                fill_in 'admin[email]', with: email
                fill_in 'admin[password]', with: senha

                find('input.btn.btn-success.btn-submit').click
        end

        it "should find the card-banner of admins" do

            page.find(:css, 'a[href="/admin/index"]').click

            expect(page).to have_content('Administradores')
        end

        it "should find the field email on list of admins" do


            page.find(:css, 'a[href="/admin/admins"]').click

            expect(page).to have_content('Email')

        end

        it "should find the field name on list of admins" do


            page.find(:css, 'a[href="/admin/admins"]').click

            expect(page).to have_content('Nome')

        end

        it "should find the email of admin tester" do


            page.find(:css, 'a[href="/admin/admins"]').click

            expect(page).to have_content("mds@mds.com")

        end

        it "should find the name of admin tester" do


            page.find(:css, 'a[href="/admin/admins"]').click

            expect(page).to have_content("MDS")

        end
    end

end