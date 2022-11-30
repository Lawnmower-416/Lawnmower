const tilesetSchema = require("../models/tileset-schema");
const postService = require("../services/post.service");

const postController = {
  createPost: async(req, res) => {
    console.log('new post data: ', req.body)
    const newPost = await postService.createPost(req.body)
    res.status(200).send(newPost)
  },
  getAllPost: async(req, res) => {
    const allPost = await postService.getAllPost()
    res.status(200).send(allPost)
  },

  // for socket.io
  getPosts: async(req, res) => {
    return await postService.getAllPost()
  },

  createView: async(req, res) => {

    console.log('hit')
    const postID = req.body.post;
    const userName = req.body.user;

    const existPost = await postService.findOnePost({_id: postID})

    if(existPost){
      const existViews = existPost.views;

      let isViewExist = false;
      existViews.map(user => {
        if(user == userName){
          isViewExist = true;
        }
      })

      if(!isViewExist){
        const updatedViews = [...existViews, userName]
        const updatedPost = await postService.updatePost({_id: postID}, {views: updatedViews})

        res.status(200).send(updatedPost)
      }
    }
  },
  
  postLike: async(data) => {
    try {
      const userId = data.userId
      const postId = data.postId
      console.log({data})
      if(data.type == 'tileset'){
        console.log("hit51")
        const existTileSet = await tilesetSchema.findOne({_id: postId})

        if(existTileSet){
  
          const tilesetLikes = existTileSet.likedUsers;
          const tilesetDislikes = existTileSet.dislikedUsers;
  
          const isAlreadyLiked = tilesetLikes.filter(existUserId => {if(existUserId == userId){return existUserId}})
          
          if(isAlreadyLiked == 0){
  
            const hasInDisliked = tilesetDislikes.filter(existUserId => {if(existUserId == userId){return existUserId}})
  
            if(hasInDisliked != 0){
              uniqueDislikes = tilesetDislikes.filter(existUserId =>{if(existUserId != userId){return existUserId}})
              await tilesetSchema.updateOne({_id: postId}, {dislikedUsers: uniqueDislikes})
            }else{
              uniqueLikes = [...tilesetLikes, userId];
              console.log({uniqueLikes})
              await tilesetSchema.updateOne({_id: postId}, {likedUsers: uniqueLikes})
            }
  
          }else{
            // console.log('already disliked', {isAlreadydisliked})
            console.log("likes: ", {tilesetLikes: tilesetLikes})
            console.log("dislikes: ", {tilesetDislikes: tilesetDislikes})
  
            // res.status(200).send('already liked')
          }
        }
      }

      

    } catch (error) {
      console.log(error)
    }
  },

  postDislike: async(data) => {
    try {
      const userId = data.userId
      const postId = data.postId

      if(data.type == 'tileset'){
        const existTileSet = await tilesetSchema.findOne({_id: postId})


        if(existTileSet){
  
          const tilesetLikes = existTileSet.likedUsers;
          const tilesetDislikes = existTileSet.dislikedUsers;
  
          const isAlreadyDisliked = tilesetDislikes.filter(existUserId => {if(existUserId == userId){return existUserId}})
          
          if(isAlreadyDisliked.length == 0){
  
            const hasInLiked = tilesetLikes.filter(existUserId => {if(existUserId == userId){return existUserId}})
            
            if(hasInLiked.length != 0){
              const uniqueLikes = tilesetLikes.filter(existUserId =>{if(existUserId != userId){return existUserId}})
              console.log("hit99 : ", uniqueLikes )
              const updatedTileset = await tilesetSchema.updateOne({_id: postId}, {likedUsers: uniqueLikes})
            }else{
              const uniqueDislikes = [...tilesetDislikes, userId];
              await tilesetSchema.updateOne({_id: postId}, {dislikedUsers: uniqueDislikes})
            }
  
          }else{
            // console.log('already disliked', {isAlreadydisliked})
            // console.log("likes: ", {tilesetLikes: tilesetLikes})
            // console.log("dislikes: ", {tilesetDislikes: tilesetDislikes})
  
            // res.status(200).send('already liked')
          }
        }
      }

      

    } catch (error) {
      console.log(error)
    }
  },


  postView: async (data) =>{
    const userId = data.userId;
    const postId = data.postId;
    const type = data.type;

    if(type == 'tileset'){
      const existPost = await tilesetSchema.findOne({_id: postId});
      console.log("views: ", existPost)
      const alreadyViewed = existPost?.viewers?.filter(viewUser => {
        if(viewUser == userId){
          return viewUser;
        }
      })

      if(alreadyViewed.length == 0){{
        const existViews = existPost.viewers;
        const updatedViews = [...existViews, userId]
        await tilesetSchema.updateOne({_id: postId}, {viewers: updatedViews})
      }}
    }
  }
}


module.exports = postController;