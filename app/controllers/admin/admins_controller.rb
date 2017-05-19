class Admin::AdminsController < AdminsController
  before_action :set_admin, only: [:destroy, :edit, :update]

    def index
        @admins = Admin.all
    end

end