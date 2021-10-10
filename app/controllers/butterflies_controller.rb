class ButterfliesController < ApplicationController
    def index
        butterflies = Butterfly.all
        render json: butterflies
    end
end
