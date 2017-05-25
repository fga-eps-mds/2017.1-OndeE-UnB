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

  namespace :admin do
    resources :buildings, except: [:show]
    resources :rooms
    resources :departments
    resources :admin
  end

  get 'app/views/map/index.html.erb', to: 'map#index', as: 'map'
  get 'app/views/about/about.html.erb', to: 'about#about', as: 'about'
  get 'admin/index'

  get 'map/data'

  get 'map/building/:id', to: 'map#building'
  get 'parse', to:'parser#get_departaments'

  get 'map/routes'
  get 'map/search_building'
  get 'map/collect_building_data'
  get 'map/building'

  get "app/views/map/index.html.erb", to: "map#index", as: "map"
  get "app/views/about/about.html.erb", to: "about#about", as: "about"
  get "admin/index"

  get "map/data"
  get "map/building/:id", to:"map#building"
  get "map/routes"

  get "parse", to:"parser#index"
end
