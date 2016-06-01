class ServingsController < ApplicationController

    MEALTIMES = %w(breakfast lunch dinner)
    PROPS = %w(calories protein carbs fat)

    def index
        servings = current_user.servings.includes(:food).where(date: params[:date])
        @data = construct_data(MEALTIMES, PROPS, servings)

        if request.xhr?
            render json: { totals: @data }
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

    private

    def construct_data(meals, props, servings)
        result = {}
        meals.each do |meal|
            result[meal] = { totals: {}, food: [] }
            props.each do |prop|
                result[meal][:totals][prop] = servings.where(type: meal).sum(prop)
                result[meal][:food] = servings.map { |serving| serving.food }
            end
        end
        result
    end

end
