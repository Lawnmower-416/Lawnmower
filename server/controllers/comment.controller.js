const commentService = require("../services/comment.service");
const postService = require("../services/post.service");
const databaseManager = require("../controllers/AWSManager/AWSmongoose-manager");
const Tileset = require("../models/tileset-schema");
const mapSchema = require("../models/map-schema");
const tilesetSchema = require("../models/tileset-schema");

const commentController = {
  createComment: async(data) => {
    try {
      const parent = data.parent || null

      console.log("send comment: ", data)

      if(data.postType == 'tileset' && data.userId != null){
        
      

      const existPost = await Tileset.findOne({_id:data.postId});
      console.log("existPost", existPost);
      const postComments = existPost?.comments;

      const newComment = await commentService.createComment(data)
      console.log("newComment", newComment);
      
      if(parent){
        const parentComment = await commentService.findOneComment({_id: parent})
        const children = parentComment.children;
        children.push(newComment._id)

        const updatedParentComment = await commentService.updateOneComment({_id: parent}, {children: children})
        console.log("updatedParentComment", updatedParentComment);
      
        const updatedTileset = await Tileset.findOne({_id: data.postId})
        .populate({
          path: 'comments', model: 'Comment',
          populate: {
            path: 'children', model: 'Comment',
            populate: {
              path: 'children', model: 'Comment',
              populate: {
                path: 'children', model: 'Comment',
                populate: {
                  path: 'children', model: 'Comment',
                  populate: {
                    path: 'children', model: 'Comment',
                    populate: {
                      path: 'children', model: 'Comment',
                    },
                  },
                },
              },
            },
          },
          
        })
        return updatedTileset
        // res.status(200).send(newComment)        
      }else{
        const updatedPostComments = [...postComments, newComment._id]
        console.log("updatedPostComments", updatedPostComments)
        const updatedTileset = await Tileset.findOneAndUpdate({_id: data.postId}, {comments: updatedPostComments})
        .populate({
          path: 'comments', model: 'Comment',
          populate: {
            path: 'children', model: 'Comment',
            populate: {
              path: 'children', model: 'Comment',
              populate: {
                path: 'children', model: 'Comment',
                populate: {
                  path: 'children', model: 'Comment',
                  populate: {
                    path: 'children', model: 'Comment',
                    populate: {
                      path: 'children', model: 'Comment',
                    },
                  },
                },
              },
            },
          },
          
        })
        console.log('updated tiles: ', updatedTileset)
        return updatedTileset;
      }


    } else if(data.postType == 'map'){
      
      const existPost = await mapSchema.findOne({_id:data.postId});
      console.log("existPost", existPost);
      const postComments = existPost?.comments;

      const newComment = await commentService.createComment(data)
      console.log("newComment", newComment);
      
      if(parent){
        const parentComment = await commentService.findOneComment({_id: parent})
        const children = parentComment.children;
        children.push(newComment._id)

        const updatedParentComment = await commentService.updateOneComment({_id: parent}, {children: children})
        console.log("updatedParentComment", updatedParentComment);
      
        const updatedMap = await mapSchema.findOne({_id: data.postId})
        .populate({
          path: 'comments', model: 'Comment',
          populate: {
            path: 'children', model: 'Comment',
            populate: {
              path: 'children', model: 'Comment',
              populate: {
                path: 'children', model: 'Comment',
                populate: {
                  path: 'children', model: 'Comment',
                  populate: {
                    path: 'children', model: 'Comment',
                    populate: {
                      path: 'children', model: 'Comment',
                    },
                  },
                },
              },
            },
          },
          
        })
        return updatedMap
        // res.status(200).send(newComment)        
      }else{
        const updatedPostComments = [...postComments, newComment._id]
        console.log("updatedPostComments", updatedPostComments)
        const updatedMap = await mapSchema.findOneAndUpdate({_id: data.postId}, {comments: updatedPostComments})
        .populate({
          path: 'comments', model: 'Comment',
          populate: {
            path: 'children', model: 'Comment',
            populate: {
              path: 'children', model: 'Comment',
              populate: {
                path: 'children', model: 'Comment',
                populate: {
                  path: 'children', model: 'Comment',
                  populate: {
                    path: 'children', model: 'Comment',
                    populate: {
                      path: 'children', model: 'Comment',
                    },
                  },
                },
              },
            },
          },
          
        })
        console.log('updated tiles: ', updatedMap)
        return updatedMap;
      }
    }



    } catch (error) {
      console.log(error)
      return error.message
      // res.status(401).send(error.message)
    }
  },


  getAllComments: async(req, res) => {
    try {
      const allComments = await commentService.getAllComments();
      // res.status(200).send(allComments)
    } catch (error) {
      console.log(error)
      // res.status(401).send(error.message)
    }
  },

  updateComments: async(query, data) => {
    try {
      return await commentService.updateOneComment(query, data);
      // res.status(200).send(updated)
    } catch (error) {
      console.log(error)
      // res.status(401).send(error.message)
    }
  },

  getComment: async(filter) => {
    try {
      const comments = await commentService.findComments(filter)
      return comments;
    } catch (error) {
      console.log(error)
    }
  },

  likeComment: async(data) => {
    try {
      const userId = data.userId
      const commentId = data.commentId

      const existComment = await commentService.findOneComment({_id: commentId})

      if(existComment){

        const commentLikes = existComment.likes;
        const commentDislikes = existComment.dislikes;

        const isAlreadyLiked = commentLikes.filter(existUserId => {if(existUserId == userId){return existUserId}})
        
        if(isAlreadyLiked == 0){

          const hasInDisliked = commentDislikes.filter(existUserId => {if(existUserId == userId){return existUserId}})

          if(hasInDisliked != 0){
            uniqueDislikes = commentDislikes.filter(existUserId =>{if(existUserId != userId){return existUserId}})
            await commentService.updateOneComment({_id: commentId}, {dislikes: uniqueDislikes})
          }else{
            uniqueLikes = [...commentLikes, userId];
            await commentService.updateOneComment({_id: commentId}, {likes: uniqueLikes})
          }

        }else{
          // console.log('already disliked', {isAlreadydisliked})
          console.log("likes: ", {commentLikes})
          console.log("dislikes: ", {commentDislikes})

          // res.status(200).send('already liked')
        }
      }

    } catch (error) {
      console.log(error)
    }
  },

 
  dislikeComment: async(data) => {
    try {
      const userId = data.userId
      const commentId = data.commentId

      const existComment = await commentService.findOneComment({_id: commentId})

      if(existComment){

        const commentLikes = existComment.likes;
        const commentDislikes = existComment.dislikes;

        const isAlreadydisliked = commentDislikes.filter(existUserId => {if(existUserId == userId){return existUserId}})
        
        if(isAlreadydisliked.length == 0){
console.log('hit1')
          const hasInLiked = commentLikes.filter(existUserId => {if(existUserId == userId){return existUserId}})

          if(hasInLiked.length != 0){
            uniquelikes = commentLikes.filter(existUserId =>{if(existUserId != userId){return existUserId}})
            console.log('hit2', uniquelikes)
            await commentService.updateOneComment({_id: commentId}, {likes: uniquelikes})
          }else{
            uniqueDislikes = [...commentDislikes, userId];
            console.log('hit3', uniqueDislikes)
            await commentService.updateOneComment({_id: commentId}, {dislikes: uniqueDislikes})
          }

        }else{
          // console.log('already disliked', {isAlreadydisliked})
          console.log("likes: ", {commentLikes})
          console.log("dislikes: ", {commentDislikes})

          // res.status(200).send('already liked')
        }
      }

    } catch (error) {
      console.log(error)
    }
  },

 

  deleteComment: async(query) => {
    try {
      return await commentService.deleteComment(query);

    } catch (error) {
      console.log(error)

    }
  },

}

module.exports = commentController;