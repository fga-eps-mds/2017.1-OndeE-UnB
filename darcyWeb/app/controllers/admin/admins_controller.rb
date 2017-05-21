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
          redirect_to admin_admins_path, notice: helpers.alert_success('Administrador criado com êxito.')
        else
          render :new
        end
    end

    def edit
    end

    def update
      if @admin.update(admin_params_edit)
        redirect_to admin_admins_path, notice: helpers.alert_success('Administrador editado com êxito.')
      end
    end

    def destroy
      @admin.destroy
      redirect_to admin_admins_path, notice: helpers.alert_success('Administrador excluído com êxito.')
    end

    private
    def set_admin
      @admin = Admin.find(params[:id])
    end

    def admin_params
      params.require(:admin).permit(:name, :email, :password, :password_confirmation)
    end

    def admin_params_edit
      params.require(:admin).permit(:name, :email)
    end
end
