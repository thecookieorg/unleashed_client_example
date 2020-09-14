module Api
  module V1
    class UnleashedController < ApplicationController
      skip_before_action :verify_authenticity_token, only: [:get_number_of_pages]

      def get_some_data
        api_key = params[:api_key]
        api_id = params[:api_id]

        client = UnleashedClient::SalesOrder.new(api_key: api_key, api_id: api_id)

        pages = client.get_number_of_pages

        obj = {
          :number_of_pages => pages
        }

        render :status => 200, json: obj.to_json and return
      end
    end
  end
end