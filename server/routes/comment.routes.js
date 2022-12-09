const commentController = require("../controllers/comment.controller")
const mapSchema = require("../models/map-schema")
const tilesetSchema = require("../models/tileset-schema")

const commentRoutes = async(app) => {
  
  app.get('/comment', (req, res) => {
    res.status(200).send('Hello, I am from comment route!')
  })

  app.get('/user-comments/:username', async(req, res) => {

      
      try {
        const username = req.params.username;
        const  comments = await commentController.getComment({username: username})
        let userComments = [];
        let totalIndexSize = comments.length;
        let correntIndexSize = 0;
        await comments.map(async(comment, index) => {
            correntIndexSize = correntIndexSize + 1;
            const postTileset = await tilesetSchema.findOne({comments : { $ne : comment._id }})
            if(postTileset){
                userComments = [...userComments, {
                    postType: 'Tileset', 
                    postId: postTileset?._id, 
                    title: postTileset?.title,
                    message: comment.message, 
                    updatedAt: comment.updatedAt
                }]
            }
            const postMap = await mapSchema.findOne({comments : { $ne : comment._id }})
            if(postMap){
                
                userComments = [...userComments, {
                    postType: 'Map', 
                    postId: postMap?._id, 
                    title: postMap?.title,
                    message: comment.message, 
                    updatedAt: comment.updatedAt
                }]
            }
            console.log("correntIndexSize: ", correntIndexSize, " totalIndexSize: ", totalIndexSize)
            if(correntIndexSize == totalIndexSize){
            // console.log("hit", userComments)
                res.status(200).send(userComments)
            }
        })
    } catch (error) {
        console.log(error)
    }

  })

  app.post('/comment/create', async(req, res) => {
      console.log('hit', req.body)
      await commentController.createComment(req, res)
  })

  app.post('/comment/like', async(req, res) => {
      console.log('hit', req.body)
      await commentController.likeComment(req, res)
  })

  app.post('/comment/dislike', async(req, res) => {
      console.log('hit', req.body)
      await commentController.dislikeComment(req, res)
  })

  app.put('/comment/update/:id', async(req, res) => {
      console.log('hit', req.body)
      await commentController.updateComments(req, res)
  })

  app.delete('/comment/delete/:id', async(req, res) => {
      console.log('hit', req.body)
      await commentController.deleteComments(req, res)
  })

  app.get('/comment/all-comments', async(req, res) => {
      await commentController.getAllComments(req, res)
  })
}


module.exports = commentRoutes;