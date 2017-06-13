# TODO Incluir mais testes para as outras actions
require 'rails_helper'
require 'spec_helper'
require 'json'

# Integration tests.
describe MapController do
  describe '#index' do
    it 'responds successfully with an HTTP 200 status code' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'GET #data' do
    it 'responds successfully with an HTTP 200 status code' do
      get :data
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'responds with JSON' do
      building = FactoryGirl.create :building
      get :data, format: :json
      expect(response).to be_success
    end
  end
end
