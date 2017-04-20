class AdminController < ApplicationController
    before_action :authenticate_admin!
    layout 'admin'
    # TODO:30 add devise auth verification in order to prevent normal users to have access
    def index
    end

    private
    def authenticate_admin
      admin_signed_in?
    end
end
