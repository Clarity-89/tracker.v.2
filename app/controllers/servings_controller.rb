class ServingsController < ApplicationController

    MEALTIMES = %w(breakfast lunch dinner)
    PROPS = %w(protein carbs fat calories)

    def index
        servings = current_user.servings.includes(:food).where(date: params[:date])
        @data = construct_data(MEALTIMES, PROPS, servings)
        @times = MEALTIMES
        @macros = PROPS
        if request.xhr?
            render json: {data: @data}
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
        Serving.create(food_id: food.id, user_id: current_user.id, type: params[:time], date: params[:date])

    end

    def find
        @times = MEALTIMES
        @macros = PROPS
        @time = params[:time] || 'breakfast'
        render 'servings/find'
    end

    private

    def construct_data(meals, props, servings)
        result = {totals: {}, mealtimes: {}}
        meals.each do |meal|
            result[:mealtimes][meal] = {totals: {}, food: []}
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
