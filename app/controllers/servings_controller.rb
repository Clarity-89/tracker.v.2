class ServingsController < ApplicationController
    def index
        @servings = current_user.servings.where(date: params[:date])
        if request.xhr?
            render json: {sevings: @servings}
        end
    end

    def create

        fields = {
            name: params[:entry][:fields][:item_name],
            calories: params[:entry][:fields][:nf_calories],
            protein: params[:entry][:fields][:nf_protein],
            carbs: params[:entry][:fields][:nf_total_carbohydrate],
            fat: params[:entry][:fields][:nf_total_fat],
            serving_size: params[:entry][:fields][:nf_serving_weight_grams]
        }
        food = Food.find_by(fields) || Food.create(fields)
        Serving.create(food_id: food.id, user_id: current_user.id, type: 'breakfast', date: params[:date])

    end
end
