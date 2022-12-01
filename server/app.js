const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const hostname = "0.0.0.0";
const port = 3000;

const routes = require('./routes');
const bodyParser = require('body-parser');
const http = require('http')
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    //origin: "http://localhost:3001",
    origin: "http://34.193.24.27",
    methods: ["GET", "POST"]
  }
})


const cors = require('cors');
app.use(cors({
  //origin: 'http://localhost:3001',
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

// For Chat
io.on('connection', server => {
  console.log('User connected', server.id)

  server.on('join', (data) => {
    server.join(data.id);
    server.to(data).emit('newUserJoin', {message: `${data.username} joined`, type: 'info'});
    server.emit('userConnected', {message: 'Connected', type: 'success'});
  });

  server.on('place', (data) => {
    server.to(data).emit('place', data);
  });
  
  
  server.on('send_comment', async(data) => {
    console.log(data)
    const result = await commentController.createComment(data)

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
  })

  server.on('edit_comment', async(data) => {

    await commentController.updateComments({_id: data.comment}, {message: data.message})

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
  })

  server.on('comment_like', async(data) => {
    await commentController.likeComment(data)

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
  })

  server.on('comment_dislike', async(data) => {
    await commentController.dislikeComment(data)

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
  })

  server.on('comment_delete', async(data) => {
    await commentController.deleteComment({_id: data.comment})

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
  })

  server.on('post_like', async(data) => {
    console.log('hit')
    console.log({data})
    await postController.postLike(data)

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
  })

  server.on('post_dislike', async(data) => {
    console.log('hit')
    console.log({data})
    await postController.postDislike(data)

    const posts = await postController.getPosts()
    server.broadcast.emit('updated_post', posts)
    server.emit('updated_post', posts)
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
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

module.exports = app;
