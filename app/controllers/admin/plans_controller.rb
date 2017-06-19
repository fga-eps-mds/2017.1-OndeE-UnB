class Admin::PlansController < AdminController
  before_action :set_plans, only: [:destroy, :edit, :update]
  before_action :set_buildings, only: [:new, :edit, :update, :create]

  def index
    @plans = Plan.all
  end

  def new
    @plan = Plan.new
  end

  def edit
  end

  def update
    if @plan.update(plans_params)
      redirect_to admin_plans_path, notice: helpers.alert_success('Planta editada com êxito.')
    else
      render :edit
    end
  end

  def create
    @plan = Plan.new(plans_params)
    if @plan.save
      redirect_to admin_plans_path, notice: helpers.alert_success('Planta cadastrada com êxito.')
    else
      render :new
    end
  end

  def destroy
    @plan.destroy
    redirect_to admin_plans_path, notice: helpers.alert_success('Planta excluída com êxito.')
  end

  private

  def set_buildings
    @buildings = Building.all
  end

  def set_plans
    @plan = Plan.find(params[:id])
  end

  def plans_params
    params.require(:plan).permit(:building_id, :level, :geo_data, :image)
  end
end
