class StaticPagesController < ApplicationController

  def landing
    if logged_in?
      redirect_to home_url
    end
  end

  def home
  end

  def contact
  end

  def about
  end

end
