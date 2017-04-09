Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'map#index'

  root 'buildings#index'

  resources :buildings

  get "app/views/map/index.html.erb", to: "map#index", as: "map"
  get "app/views/about/about.html.erb", to: "about#about", as: "about"

end
