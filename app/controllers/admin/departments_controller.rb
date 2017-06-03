class Admin::DepartmentsController < AdminController
  before_action :set_department, only: [:destroy, :edit, :update]

  def index
    @departments = Department.all
  end

  def new
    @department = Department.new
  end

  def edit
  end

  def update
    if @department.update(department_params)
      redirect_to admin_departments_path, notice: alert_success('Departamento editado com êxito.')
    else
      render :edit
    end
  end

  def create
    @department = Department.new(department_params)
    if @department.save
      redirect_to admin_departments_path, notice: alert_success('Departamento criado com êxito.')
    else
      render :new
    end
  end

  def destroy
    @department.destroy
    redirect_to admin_departments_path, notice: alert_success('Departmento excluído com êxito.')
  end


  private

  def alert_success(message)
    "<div class='alert alert-success'>#{message}</div>"
  end

  def alert_danger(message)
    "<div class='alert alert-danger'>#{message}</div>"
  end

  def set_department
    @department = Department.find(params[:id])
  end

  def department_params
    params.require(:department).permit(:acronym, :title, :phone, :latitude, :longitude, :geo_data)
  end

end
