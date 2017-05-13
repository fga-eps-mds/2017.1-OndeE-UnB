class Admin::DepartmentsController < AdminController
  before_action :set_department, only: [:destroy, :edit, :update]

  def index
    @departments = Department.all
  end

  def new
  end

  def edit
  end

  def update
  end

  def create
  end

  def destroy
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
