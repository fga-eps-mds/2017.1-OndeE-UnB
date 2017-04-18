class Admin::BuildingsController < AdminController
    before_action :set_building, only: [:destroy, :edit, :update]

    def index
        @buildings = Building.all
    end

    def new
        @building = Building.new
    end

    def edit
    end

    def update
        if @building.update(building_params)
            redirect_to admin_buildings_path, notice: 'Edifício atualizado com êxito.'
        else
            render :edit
        end
    end

    def create
        @building = Building.new(building_params)
        if @building.save
            redirect_to admin_buildings_path, notice: 'Edifício criado com êxito.'
        else
            render :new
        end
    end

    def destroy
        @building.destroy
        redirect_to admin_buildings_path, notice: 'Edifício excluído com êxito.'
    end

    private

    def set_building
        @building = Building.find(params[:id])
    end

    def building_params
        params.require(:building).permit(:acronym, :title, :phone, :latitude, :longitude, :geo_data)
    end
end
