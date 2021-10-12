class CommentsController < ApplicationController
    def create
        butterfly = Butterfly.find(params["butterfly_id"])
        comment = butterfly.comment.build(text: "#{params["user"]["name"]} says: #{params["text"]}")
        render json: comment
    end
end
