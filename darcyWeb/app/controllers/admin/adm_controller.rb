class Admin::AdmController < AdminController
  before_action :set_admin, only: [:destroy, :edit, :update]

    def index
        @admins = Admin.all
    end

    def new
    end

    def update
    end

    def create
    end

    def destroy
    end

end