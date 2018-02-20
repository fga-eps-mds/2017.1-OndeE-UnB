class Admin::PointsController < AdminController
  before_action :set_point, only: [:destroy, :edit, :update]

  def index
    @points = Point.order("type_point").page(params['page']).per(13)
  end

  def new
    @point = Point.new
  end

  def edit
  end

  def update
    if @point.update(point_params)
      redirect_to admin_points_path, notice: alert_success('Ponto editado com êxito.')
    else
      render :edit
    end
  end

  def create
    @point = Point.new(point_params)
    if @point.save
      redirect_to admin_points_path, notice: alert_success('Ponto criado com êxito.')
    else
      render :new
    end
  end

  def destroy
    @point.destroy
    redirect_to admin_points_path, notice: alert_success('Ponto excluído com êxito.')
  end

  private

  def alert_success(message)
    "<div class='alert alert-success'>#{message}</div>"
  end

  def alert_danger(message)
    "<div class='alert alert-danger'>#{message}</div>"
  end

  def set_point
    @point = Point.find(params[:id])
  end

  def point_params
    params.require(:point).permit(:title, :type_point, :description, :latitude, :longitude, :geo_data)
  end
end
