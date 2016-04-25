class PicturesController < ApplicationController

def index
  @pictures = Picture.all
  respond_to do |format|
    format.html
    format.json{ render json: @pictures, status: :ok }
  end
end


def show
  render json: @pictures, status: :ok
end

def create
   @picture = Picture.create!(picture_params)
   render json: @picture, status: :ok
end

end
