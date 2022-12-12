import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AuthContext from '../auth';
import { socket } from '../config/SocketIO'; 
import Comment from './Comment';

export default function PostComments({ postType, currentPost}) {

  const [comments, setComments] = useState([])
  const [inputMessage, setInputMessage] = useState(null)
  
  const { auth } = useContext(AuthContext)
  console.log("user: ", auth.user)

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

    socket.emit('send_comment', {userId:currentPost.owner,username: auth.user.username, message: inputMessage, postId: currentPost._id || null, postType: postType})
    
    document.getElementById('message').value = ''
  }

  /**
 * frontend5. line 48 css pb-10 added
 */
  return (
    <div className='container postcomment__root pb-10'>
      {
        comments?.map((comment, index) => (
          <div key={index}>
            {
              !comment?.parent && <Comment comment={comment} userName={auth.user?.username} currentPost={currentPost} postType={postType} />
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
      { auth.user?._id && (
        <form onSubmit={handleSubmit} className="postcomment__input_root">
          <img src="/assets/user.png" alt="" height={120} width={120}/>
          <input onChange={handleChange} type="text" name="message" id='message' placeholder='Add a comment…' required/>
          <div className="postcomment__input_submit">
            <button type="submit">SEND</button>
          </div>
        </form>
      )}
      
    </div>
  )
}
