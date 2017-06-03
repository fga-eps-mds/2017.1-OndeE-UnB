class Admin::RoomsController < AdminController
  before_action :set_room, only: [:destroy, :edit, :update]
  before_action :set_room_types, :set_buildings, only: [:new, :edit, :update, :create]

  def index
    @rooms = Room.all
  end

  def new
    @room = Room.new
  end

  def edit
  end

  def update
    if @room.update(room_params)
      redirect_to admin_rooms_path, notice: helpers.alert_success('Sala editada com êxito.')
    else
      render :edit
    end
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to admin_rooms_path, notice: helpers.alert_success('Sala criada com êxito.')
    else
      render :new
    end
  end

  def destroy
    @room.destroy
    redirect_to admin_rooms_path, notice: helpers.alert_success('Sala excluída com êxito.')
  end

  private

  def set_buildings
    @buildings = Building.all
  end

  def set_room_types
    @room_types = Room.room_types.keys
  end

  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:acronym, :title, :building_id, :room_type, :level, :latitude, :longitude, :geo_data)
  end
end
