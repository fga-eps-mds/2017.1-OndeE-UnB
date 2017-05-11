require 'rails_helper'
require 'spec_helper'
require 'json'

#Integration tests.
describe MapController do

    describe "#index" do
        it "responds successfully with an HTTP 200 status code" do
            get :index
            expect(response).to be_success
            expect(response).to have_http_status(200)
        end

        it "renders the index template" do
            get :index
	expect(response).to render_template("index")
        end
    end

    describe "GET #data" do
        it "responds successfully with an HTTP 200 status code" do
            get :data
            expect(response).to be_success
            expect(response).to have_http_status(200)
        end

        it "responds with JSON" do
            building = FactoryGirl.create :building
	get :data, format: :json
	expect(response).to be_success
        end
    end

    describe "Refactoring json of building for search" do
        it "responds with JSON" do
            get :collect_building_data, format: :json
            expect(response).to be_success
        end

/
        it "responds a valid JSON building search" do

            obj_in = '#<ActiveRecord::Relation [#<Building id: 1, acronym: "reitoria", phone: 11111111>, #<Building id: 2, acronym: "RU", phone: 1112222>, #<Building id: 3, acronym: "ICC", phone: 999999999>, #<Building id: 4, acronym: "BCE", phone: 11111111>, #<Building id: 5, acronym: "PAT", phone: 11111111>, #<Building id: 6, acronym: "BSAS", phone: 33333333>, #<Building id: 7, acronym: "Beijodromo", phone: 1122222>]>'

            json_out = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"popupContent":"MDS","title":"reitoria","description":"reitoria","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.867402136325836,-15.76273030300047],[-47.86704272031784,-15.762508307270709],[-47.866640388965614,-15.76306587747993],[-47.8669622540474,-15.763287872599891],[-47.867402136325836,-15.76273030300047]]]}},{"type":"Feature","properties":{"popupContent":"MDS","title":"RU","description":"Restaurante","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.870784401893616,-15.764067434935013],[-47.87047326564789,-15.763866091307447],[-47.87016212940217,-15.764310079554127],[-47.87041425704957,-15.76449077216717],[-47.870784401893616,-15.764067434935013]]]}},{"type":"Feature","properties":{"popupContent":"MDS","title":"ICC","description":"Instituto Central de Ciências","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.87097752094269,-15.76057745045204],[-47.870301604270935,-15.76042256809339],[-47.86965787410737,-15.762477331103055],[-47.86929309368134,-15.763303360622453],[-47.86908924579621,-15.763592470160068],[-47.866782546043396,-15.765316793492365],[-47.86714732646942,-15.765884681203234],[-47.86928236484528,-15.764346218089612],[-47.86985099315644,-15.76374735010011],[-47.87016212940217,-15.763138154987503],[-47.87097752094269,-15.76057745045204]]]}},{"type":"Feature","properties":{"popupContent":"MDS","title":"BCE","description":"Biblioteca Central","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.86828190088272,-15.760990469497422],[-47.868335545063026,-15.760923353959729],[-47.8677186369896,-15.760494846542127],[-47.86764889955521,-15.760541311245584],[-47.86752551794053,-15.760463870067257],[-47.86725729703904,-15.76078912281777],[-47.867396771907806,-15.760897540285477],[-47.867337763309486,-15.76094400489676],[-47.86798685789109,-15.761382836812224],[-47.86804050207139,-15.761351860472834],[-47.86825507879257,-15.761491253962843],[-47.86851793527604,-15.761135025964798],[-47.86828190088272,-15.760990469497422]]]}},{"type":"Feature","properties":{"popupContent":"MDS","title":"PAT","description":"Pavilhão Anísio Teixeira","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.87107139825821,-15.758532993803733],[-47.870819270610816,-15.75845555185935],[-47.8705295920372,-15.759488108689157],[-47.87074416875839,-15.759550061931952],[-47.87107139825821,-15.758532993803733]]]}},{"type":"Feature","properties":{"popupContent":"MDS","title":"BSAS","description":"Bloco de Salas de Aula Sul","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.86673158407211,-15.766669396152254],[-47.86677986383439,-15.766622932851625],[-47.866608202457435,-15.766426754353922],[-47.86641508340836,-15.766540331402023],[-47.866602838039405,-15.766808785990285],[-47.86672085523605,-15.766762322721577],[-47.86675840616227,-15.766808785990285],[-47.86641508340836,-15.767263092946001],[-47.866602838039405,-15.767366344384994],[-47.86699444055558,-15.766829436328521],[-47.86682277917863,-15.766741672376524],[-47.86678522825242,-15.766653908386552],[-47.86673158407211,-15.766669396152254]]]}},{"type":"Feature","properties":{"popupContent":"MDS","title":"Beijodromo","description":"Memorial Darcy Ribeiro","image":"fa-building"},"geometry":{"type":"Polygon","coordinates":[[[-47.86594837903977,-15.764077760243865],[-47.86603957414628,-15.764186175955091],[-47.86598056554795,-15.76423780246388],[-47.8659000992775,-15.764253290413963],[-47.865808904171,-15.764263615713363],[-47.86574989557267,-15.764258453063722],[-47.86578744649888,-15.76410357351369],[-47.86571770906449,-15.764051946970742],[-47.865664064884186,-15.763984832445294],[-47.865664064884186,-15.763907392580663],[-47.8657016158104,-15.763850603327809],[-47.86574453115464,-15.763804139381845],[-47.86581426858902,-15.763783488735784],[-47.865867912769325,-15.763778326073941],[-47.86591619253159,-15.763798976720524],[-47.86596447229386,-15.763835115347],[-47.86599665880203,-15.763881579285876],[-47.86599665880203,-15.763943531187827],[-47.86598592996597,-15.76401580838288],[-47.86594837903977,-15.764077760243865]]]}}]}'


            get :json_building_search, obj_in

            expect(response).to be_equals(json_out)
        end
/
    end

end
