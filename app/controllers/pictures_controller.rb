class PicturesController < ApplicationController

  before_action do
    if params[:id]
      @picture = Picture.find(params[:id])
    end
  end

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

def update
  @picture.update!(picture_params)
  render json: @picture, status: :ok
end

def destroy
  @picture.destroy
  render json: {success: true}, status: :ok
end

private
def picture_params
  params.require(:picture).permit(:name, :summary, :image, :rank)
end

end
