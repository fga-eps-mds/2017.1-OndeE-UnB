require 'rails_helper'

describe 'Room', type: :feature do

      context "New room" do

            email = "admin@admin.com"
            senha = "123456"
            before(:each) do
                  Capybara.raise_server_errors = false
                  visit admin_session_path
                  fill_in 'admin[email]', with: email
                  fill_in 'admin[password]', with: senha
                  find('input.btn.btn-success.btn-submit').click
                  visit new_admin_point_path
            end

      end
end
