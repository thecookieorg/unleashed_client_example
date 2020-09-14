Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    scope module: :v1 do
      resources :unleashed do
        collection do
          get :get_some_data
        end
      end
    end
  end
  
  root 'pages#index'
end
