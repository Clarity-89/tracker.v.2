class ServingsController < ApplicationController
    def index
        servings = current_user.servings.includes(:food).where(date: params[:date])
        breakfast = servings.where(type: 'breakfast')
        lunch = servings.where(type: 'lunch')
        dinner = servings.where(type: 'dinner')
        foods = []
        servings.each do |serving|
            foods.push(serving.food)
        end
        @totals = {
            breakfast: {
                cals: breakfast.sum(:calories),
                protein: breakfast.sum(:protein),
                carbs: breakfast.sum(:carbs),
                fat: breakfast.sum(:fat)
            },
            lunch: {
                cals: lunch.sum(:calories),
                protein: lunch.sum(:protein),
                carbs: lunch.sum(:carbs),
                fat: lunch.sum(:fat)
            },
            dinner: {
                cals: dinner.sum(:calories),
                protein: dinner.sum(:protein),
                carbs: dinner.sum(:carbs),
                fat: dinner.sum(:fat)
            },
            bf: foods
        }

        if request.xhr?
            render json: { totals: @totals }
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
        food = Food.find_or_create_by(fields)
        Serving.create(food_id: food.id, user_id: current_user.id, type: 'breakfast', date: params[:date])

    end

end
