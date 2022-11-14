import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { socket } from '../config/SocketIO'; 
import Comment from './Comment';

export default function PostComments({ userName, currentPost}) {

  const [comments, setComments] = useState([])
  const [inputMessage, setInputMessage] = useState(null)
  
  function nestComments(commentList) {
    const commentMap = {};
  
    // move all the comments into a map of id => comment
    commentList.forEach(comment => commentMap[comment.id] = comment);
  
  }

  useEffect(() => {
    console.log("current post: ", currentPost)
    setComments(currentPost?.comments)
  }, [currentPost])

  // useEffect(() => {
  //   socket.on('updated_post', data => {
  //     console.log('updated_post: ', data)
  //     setComments(data[0].comments)
  //   })
  // }, [socket])

  const handleChange = async(e) => {
    setInputMessage(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    socket.emit('send_comment', {username: userName, message: inputMessage, post: currentPost._id})
    
    document.getElementById('message').value = ''
  }

  return (
    <div className='container postcomment__root'>
      {
        comments?.map((comment, index) => (
          <div key={index}>
            {
              !comment?.parent && <Comment comment={comment} userName={userName} currentPost={currentPost}/>
            }
            
            {/* {
              !comment.parent && (
                <p className='postcomment__message_parent'>{comment.message}</p>
              )
            }
            {
              comment?.children.map((child, index) => (
                <p className='postcomment__message_children' key={index}>{child.message}</p>
              ))
            } */}
          </div>
        ))
      }


      {/* Comment input  */}
      <form onSubmit={handleSubmit} className="postcomment__input_root">
        <img src="/assets/user.png" alt="" height={120} width={120}/>
        <input onChange={handleChange} type="text" name="message" id='message' placeholder='Add a comment…' required/>
        <div className="postcomment__input_submit">
          <button type="submit">SEND</button>
        </div>
      </form>
      
    </div>
  )
}
