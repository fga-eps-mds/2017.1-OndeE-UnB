Rails.application.routes.draw do

  root 'map#index'

  namespace :admin do
    resources :buildings, except: [:show]
    resources :rooms
    resources :departments
    resources :admin
  end

  get "admin/index"
end
