class ServingsController < ApplicationController
  def index
    @servings = current_user.servings.where(date: params[:date])
    @totals = {
        cals: @servings.joins(:food).sum(:calories),
        protein: @servings.joins(:food).sum(:protein),
        carbs: @servings.joins(:food).sum(:carbs),
        fat: @servings.joins(:food).sum(:fat)
    }

    if request.xhr?
      render json: {servings: @servings, totals: @totals}
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
