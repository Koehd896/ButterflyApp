Rails.application.routes.draw do
  resources :comments
  resources :butterflies
  resources :butterflies do
    resources :comments
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
