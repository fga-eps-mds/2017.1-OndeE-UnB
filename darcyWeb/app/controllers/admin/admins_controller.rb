class Admin::AdminsController < AdminController
  before_action :set_admin, only: [:destroy, :edit, :update]

    def index
        @admins = Admin.all
    end

    def new
        @admin = Admin.new
    end

    def create
        @admin = Admin.new(admin_params)
        if @admin.save
          redirect_to admin_admins_path, notice: ('Administrador criado com êxito.')
        else
          render :new
        end
  end

    def update
    end

    def destroy
    end

    private
    def admin_params
      params.require(:admin).permit(:name, :email, :password, :password_confirmation)
    end
end
