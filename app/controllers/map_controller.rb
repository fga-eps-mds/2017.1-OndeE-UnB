class MapController < ApplicationController
  layout false
  def index

  end

  def building
    @building = Building.find(params[:id])

  end

  def data
    @buildings = Building.all
    render json: @buildings

  end

  def routes
      @buildings = Building.all
      #inspect(@buildings)
      puts "*"*50 + @buildings[0].title

      @testab = "ABCDe"
  end

  def search_building
      @buildings = Building.all
      #inspect(@buildings)
      puts "*"*50 + @buildings[0].title

      @testab = "ABCDe"
  end

end
