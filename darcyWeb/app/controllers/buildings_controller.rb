class BuildingsController < ApplicationController
  def index
    @buildings = Building.all
  end

  def new
    @building = Building.new
  end

  def show
    @building = Building.find(params[:id])
  end

  def create
    @building = Building.new(building_params)
    if @building.save
      redirect_to @building
    else
      render :new
    end
  end

  def destroy
    @building = Building.find(params[:id])
    @building.destroy
    redirect_to action: "index"
  end

  private
     def building_params
       params.require(:building).permit(:department, :description)
     end
end
