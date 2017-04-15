Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  root 'map#index'

  namespace :admin do
    resources :buildings, except: [:show]
    resources :rooms
    resources :departments
    resources :admin
  end


  get "app/views/map/index.html.erb", to: "map#index", as: "map"
  get "app/views/about/about.html.erb", to: "about#about", as: "about"
  get "admin/index"

  get "map/data"
end
