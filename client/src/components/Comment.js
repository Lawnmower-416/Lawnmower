import React, { useContext, useState } from 'react'
import moment from 'moment'
import { useEffect } from 'react'
import { socket } from '../config/SocketIO'
import AuthContext from '../auth'

export default function Comment({comment, userName, currentPost}) {

  const [actionType, setActionType] = useState(null)
  const [inputExpand, setInputExpand] = useState(false)
  const [inputMessage, setInputMessage] = useState(null)
  const [userID, setUserID] = useState(null)

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  })

  const {auth} = useContext(AuthContext)

  useEffect(() => {
    console.log("comments.like: ", comment.likes)
    const getUserID = async() => {
      const savedUserID = await localStorage.getItem('userID')
      setUserID(savedUserID)
    }
    getUserID()
  }, [])

  const handleChange = async(e) => {
    setInputMessage(e.target.value)
  }

  const onClickAction = async(type) => {
    setInputExpand(!inputExpand)
    setActionType(type)
  }

  const hanldeSubmit = async(e) => {
    e.preventDefault()

    switch(actionType){
      case 'reply': 
        socket.emit('send_comment', {userId:currentPost.owner,username: currentPost.ownerUsername, message: inputMessage, postId: currentPost._id || null, type: 'tileset', parent: comment._id})
      
        document.getElementById('message').value = ''
        setInputExpand(false)
        break;

      case 'edit': 
        console.log('Edit');
        socket.emit('edit_comment', {comment: comment._id, message: inputMessage, postId: currentPost._id})
        setInputExpand(false)
      
        break;
    }
  }

  const handleDelete = async() => {
    socket.emit('comment_delete', { commentId: comment._id, postId: currentPost._id })
  }

  const handleCreateLike = async() => {
    socket.emit('comment_like', { userId: auth.user._id, commentId: comment._id, postId: currentPost._id })
  }

  const handleCreateDislike = async() => {
    socket.emit('comment_dislike', { userId: auth.user._id, commentId: comment._id, postId: currentPost._id })
  }

  return (
    <>    
    <div className="comment__root_main">
      <div className='comment__root'>
        <div className="comment__like_count">
          <img onClick={handleCreateLike} src="/assets/comment_like.png" alt="" />
          <p>{comment?.likes?.length - comment?.dislikes.length}</p>
          <img onClick={handleCreateDislike} src="/assets/comment_dislike.png" alt="" />
        </div>
        <div className="comment__body">
          <div className="comment__header">
            <div className="comment__header_left">
              {/* user picture */}
              <img src="/assets/Oval.png" alt="" />
              <p>{comment.username}</p>
              {
                userName == comment.username && 
                <small className='comment__header_left_tag'>You</small>
              }
              <small>{moment(comment.createdAt).fromNow()}</small>
            </div>
            <div className="comment__header_right">
              {
                userName != comment.username && (
                  <button>Report</button>
                )
              }
              {
                userName == comment.username && comment.isDeleted == false && (
                  <>
                    <button onClick={handleDelete}>
                      <div className="comment__icon_btn">
                        <img src="/assets/delete.png" alt="" />
                        <span className='delete'>Delete</span>
                      </div>
                    </button>
                    <button onClick={() => onClickAction('edit')}>
                      <div className="comment__icon_btn">
                        <img src="/assets/edit.png" alt="" />
                        <span>Edit</span>
                      </div>
                    </button>
                  </>
                )
              }
              <button>
                <div onClick={() => onClickAction('reply')} className="comment__icon_btn">
                  <img className='reply' src="/assets/reply.png" alt="" />
                  <span className=''>Reply</span>
                </div>
              </button>
            </div>
          </div>
          <div className="comment__content">
            {
              comment.isDeleted ? (
                <p>[ Message Deleted! ]</p>
              ) : (
                <p>{comment.message}</p>
              )
            }
          </div>
        </div>
      </div>
      {
        inputExpand && (
          <form onSubmit={hanldeSubmit} className="comment__input_box">            
            {
              actionType == 'reply' ? (
                <input onChange={handleChange} placeholder={`${actionType=='reply'&& 'Write your reply......'}`} type="text" name="" id="message" required />
              ) : (
                <input defaultValue={comment.message} onChange={handleChange} placeholder={`${actionType=='reply'&& 'Write your reply......'}`} type="text" name="" id="message" required />
              )
            }
            <button type='submit'>
              {actionType=='edit' ? 'UPDATE' : 'SEND'}
            </button>
          </form>
        )
      }
    </div>
    <div className="comment__nested">
      {
        comment?.children?.map((com, index) => (
          <Comment comment={com} userName={userName} currentPost={currentPost}/>
        ))
      }
    </div>
    </>
  )
}

