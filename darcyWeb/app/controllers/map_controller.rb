class MapController < ApplicationController
    layout false
    def index

    end

    def data
    @buildings = Building.all
    render json: @buildings

  end

end
