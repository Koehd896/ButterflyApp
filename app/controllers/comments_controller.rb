class CommentsController < ApplicationController
    def create
        butterfly = Butterfly.find(params["butterfly_id"])
        comment = butterfly.comments.build(text: "#{params["user"]["name"]} says: #{params["text"]}")
        comment.save
        render json: comment
    end

    def edit
        comment = Comment.find(params["id"])
        comment.text = "#{params["user"]["name"]} says: #{params["text"]}"
        comment.save
        render json: comment
    end
end
