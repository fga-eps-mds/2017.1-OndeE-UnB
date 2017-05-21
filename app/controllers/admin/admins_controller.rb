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
          redirect_to admin_adm_path, notice: alert_success('Administrador criado com êxito.')
        else
          render :new
        end
  end

    def update
    end



    def destroy
    end

end
