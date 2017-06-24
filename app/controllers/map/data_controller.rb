class Map::DataController < MapController
  def buildings
    @buildings = Building.all
    render json: @buildings
    end

  def building
    @building = Building.find(params[:id])
  end

  def rooms
    @rooms = Room.where(building_id: params[:building_id])
    render json: @rooms
  end

  def room
    @today = Time.now.wday

    @room = Room.find(params[:id])
    @days_of_week = Schedule.translated_day_of_weeks

    @schedule = []
    @days_of_week.map do |_translated, day,  index|
    @schedule[index] = @room.schedules.where(day_of_week: day)
    end
  end

  def bikes
    @bikes = Point.where(type_point: 'Bicicletario')
    render json: @bikes
  end

  def bathrooms
    @bathrooms = Point.where(type_point: 'Banheiro')
    render json: @bathrooms
  end

  def snackbars
    @snackbars = Point.where(type_point: 'Lanchonete')
    render json: @snackbars
  end

  def busstops
    @busstops = Point.where(type_point: 'Parada de Onibus')
    render json: @busstops
  end

  def entrances
    @entrances = Point.where(type_point: 'Entrada de Edificio')
    render json: @entrances
  end

end
