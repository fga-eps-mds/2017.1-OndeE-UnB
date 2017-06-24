Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  devise_scope :admin do
    get 'admin/login', to: 'devise/sessions#new', as: 'new_login'
    post 'admin/login', to: 'devise/sessions#create', as: 'login'
    get 'admin/logout', to: 'devise/sessions#destroy', as: 'logout'
    get 'admin/edit', to: 'devise/registrations#edit', as: 'edit_admin_registration'
    post 'admin/edit', to: 'devise/registrations#update', as: 'admin_registration'
    # get 'admin/registration', to: 'devise/registrations#new', as: 'new_registration'
    # post 'admin/registration', to: 'devise/registrations#create', as: 'registration'
  end
  devise_for :admins, skip: [:sessions, :registrations, :passwords]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'map#index'

  get 'about', to: 'about#index'
  
  get 'findme', to: 'map#index'

  get 'admin', to: 'admin#index'

  namespace :admin do
    resources :buildings, except: [:show]
    resources :rooms, except: [:show]
    resources :admins, except: [:show]
    resources :points, except: [:show]
    resources :plans, except: [:show]
  end

  namespace :map do
    namespace :search do
      get '/', action: 'search'
      get '/geo', action: 'search_geo'
    end

    namespace :data do
      get 'buildings', action: 'buildings'
      get 'building/:id', action: 'building'
      get 'room/:id', action: 'room', as: :room
      get 'rooms/:building_id', action: 'rooms'
      get 'bikes', action: 'bikes'
      get 'bathrooms', action: 'bathrooms'
      get 'snackbars', action: 'snackbars'
      get 'busstops', action: 'busstops'
      get 'entrances', action: 'entrances'
    end
  end

  get 'map/data'
  get 'map/building/:id', to: 'map#building'
  get 'map/routes'

  get 'parse', to: 'parser#index'

  get 'map/datapoint'
  get 'map/point/:id', to: 'map#point'

  get 'map/routes'
  get 'map/building'

  get 'map/point'

  # Provisory method to destroy points and buildings
  get 'admin/points/:id', to: 'admin/points#destroy'
  get 'admin/buildings/:id', to: 'admin/buildings#destroy'
end
