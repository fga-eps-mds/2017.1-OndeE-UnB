Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #Olá MDS, agora sim, estamos comecando a desenvolver em ruby on rails, tire o comentário da linha abaixo e você deverá ver uma mensagem no seu navagador.
  #root 'home#home'

  root 'buildings#index'

  resources :buildings

end
