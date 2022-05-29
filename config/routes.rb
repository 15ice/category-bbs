Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/posts/search/:category', to: 'posts#search'
      put '/posts/update_hidden/:id', to: 'posts#update_hidden'
      put '/posts/update_display/:id', to: 'posts#update_display'
      resources :posts, only: %i[index show create]
      resources :categories, only: %i[index show create update destroy]
    end
  end
end
