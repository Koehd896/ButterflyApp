class CommentsController < ApplicationController
    def create
        comment = Comment.create(text: "#{params["user"]["name"]} says: #{params["text"]}")
        render json: comment
    end
end
