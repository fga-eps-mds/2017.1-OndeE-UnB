Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  devise_scope :admin do
    get 'admin/login', to: 'devise/sessions#new', as: 'new_login'
    post 'admin/login', to: 'devise/sessions#create', as: 'login'
    get 'admin/logout', to: 'devise/sessions#destroy', as: 'logout'
    get 'admin/registration', to: 'devise/registrations#new', as: 'new_registration'
    post 'admin/registration', to: 'devise/registrations#create', as: 'registration'
  end
  devise_for :admins
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'map#index'

  get "admin/", to: 'admin#index'
  namespace :admin do
    resources :buildings, except: [:show]
    resources :rooms
    resources :departments
    resources :admin
    resources :points, except: [:show]
  end

  namespace :map do
    namespace :data do
      get 'buildings', action: 'buildings'
      get 'building/:id', action: 'building'
      get 'bikes', action: 'bikes'
      get 'bathrooms', action: 'bathrooms'
      get 'snackbars', action: 'snackbars'
      get 'busstops', action: 'busstops'
      get 'entrances', action: 'entrances'
    end
  end

  get 'map/data'
  get "map/building/:id", to:"map#building"
  get "map/routes"

  get "parse", to:"parser#index"

  get 'map/building/:id', to: 'map#building'
  get 'parse', to:'parser#get_departaments'

  get 'map/datapoint'
  get 'map/point/:id', to: 'map#point'

  get 'map/routes'
  get 'map/search_building'
  get 'map/collect_building_data'
  get 'map/building'

  get 'map/point'

  # Provisory method to destroy points and buildings
  get 'admin/points/:id', to: 'admin/points#destroy'
  get 'admin/buildings/:id', to: 'admin/buildings#destroy'
  get 'app/views/map/index.html.erb', to: 'map#index', as: 'map'
  get 'app/views/about/about.html.erb', to: 'about#about', as: 'about'
  get 'admin/index'

  get 'map/search_building'
  get 'map/collect_building_data'
end
