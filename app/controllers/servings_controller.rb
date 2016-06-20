class ServingsController < ApplicationController

    MEALTIMES = %w(breakfast lunch dinner)
    PROPS = %w(protein carbs fat calories)

    def index
        servings = current_user.servings.includes(:food).where(date: params[:date])
        @data = construct_data(MEALTIMES, PROPS, servings)
        @times = MEALTIMES
        @macros = PROPS
        if request.xhr?
            render json: { data: @data }
        end
    end

    def create
        puts 'id', params[:entry][:item_id]
        fields = {
            _id: params[:entry][:item_id],
            name: params[:entry][:item_name],
            calories: params[:entry][:nf_calories],
            protein: params[:entry][:nf_protein],
            carbs: params[:entry][:nf_total_carbohydrate],
            fat: params[:entry][:nf_total_fat],
            serving_size: params[:entry][:nf_serving_weight_grams]
        }

        food = Food.find_or_create_by(fields)
        Serving.create(food_id: food.id, user_id: current_user.id, type: params[:time], date: params[:date])

    end

    def find
        @times = MEALTIMES
        @macros = PROPS
        @time = params[:time] || 'breakfast'
        @date = params[:date] || Date.today
        render 'servings/find'
    end

    def delete
        food = Food.find(_id: params[:id]).first()
        current_user.servings.where(date: params[:date], type: params[:type]).first().delete(food)
    end

    private

    def construct_data(meals, props, servings)
        result = { totals: {}, mealtimes: {} }
        meals.each do |meal|
            result[:mealtimes][meal] = { totals: {}, food: [] }
            props.each do |prop|
                s = servings.where(type: meal)
                result[:mealtimes][meal][:totals][prop] = s.sum(prop)
                result[:mealtimes][meal][:food] = s.map { |serving| serving.food }
                result[:totals][prop] = servings.sum(prop)
            end
        end
        result
    end

end
