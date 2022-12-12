const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const TilesetSchema = require('./models/tileset-schema')

dotenv.config();
const app = express();
const hostname = "0.0.0.0";


const port = 3000 || process.env.PORT ;


const routes = require('./routes');
const bodyParser = require('body-parser');
const http = require('http')
const { Server } = require("socket.io")
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://34.193.24.27",
    methods: ["GET", "POST"]
  }
})


const cors = require('cors');
app.use(cors({
  origin: 'http://34.193.24.27',
  credentials: true
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({  extended: true, limit: '50mb' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// backend1: added
routes(app);

const getUpdatePost = async(data, server) => {
  console.log("updated post", data)
  if(data.postType =='tileset'){
    const updatedTileset = await tilesetSchema.findOne({_id: data.postId})
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
    
    server.broadcast.emit('updated_post', updatedTileset)
    server.emit('updated_post', updatedTileset)
  }else if(data.postType == 'map'){
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
    
    server.broadcast.emit('updated_post', updatedMap)
    server.emit('updated_post', updatedMap)
  }
}

// For Chat
io.on('connection', server => {
  console.log('User connected', server.id)

  server.on('join', (data) => {
    server.username = data.username;
    server.editorId = data.id;
    server.join(data.id);
    server.to(data.id).emit('newUserJoin', {message: `${data.username} joined`, type: 'info'});
    server.emit('userConnected', {message: 'Connected', type: 'success'});
  });

  server.on('place', (data) => {
    server.to(server.editorId).emit('place', data);
  });

  server.on('disconnect', () => {
      server.to(server.editorId).emit('userLeft', {message: `${server.username} left`, type: 'info'});
  });
  
  
  server.on('send_comment', async(data) => {
    await commentController.createComment(data)
    await getUpdatePost(data, server)
  })

  server.on('edit_comment', async(data) => {

    await commentController.updateComments({_id: data.comment}, {message: data.message})

    await getUpdatePost(data, server)
  })

  server.on('comment_like', async(data) => {
    await commentController.likeComment(data)

    await getUpdatePost(data, server)
  })

  server.on('comment_dislike', async(data) => {
    await commentController.dislikeComment(data)

    await getUpdatePost(data, server)
  })

  server.on('comment_delete', async(data) => {
    console.log("comment_delete: ", data)
    await commentController.deleteComment({_id: data.commentId});
    await getUpdatePost(data, server)
    // 
  })

  server.on('post_like', async(data) => {
    console.log('hit')
    console.log({data})
    await postController.postLike(data)

    await getUpdatePost(data, server)
  })

  server.on('post_dislike', async(data) => {
    console.log('hit')
    console.log({data})
    await postController.postDislike(data)

    await getUpdatePost(data, server)
  })

  server.on('post_view', async(data) => {
    console.log({data})
    await postController.postView(data)

    await getUpdatePost(data, server)
  })

  server.on('guest_view', async(data) => {
    console.log({data})
    await getUpdatePost(data, server)
  })
})

const authRouter = require('./routes/auth-router');
const contentRouter = require('./routes/content-router');
const mapTileRouter = require('./routes/map-tile-router');
//const tilesetRouter = require('./routes/tileset-router');
const testRouter = require('./routes/test-router');


app.use('/auth', authRouter);
app.use('/', contentRouter);
//app.use('/', userRouter);
app.use('/editor', mapTileRouter);
app.use('/test', testRouter);

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db');
const postController = require('./controllers/post.controller');
const commentController = require('./controllers/comment.controller');
const tilesetSchema = require('./models/tileset-schema');
const mapSchema = require('./models/map-schema');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

module.exports = app;
