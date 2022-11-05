import React from 'react'
import moment from 'moment'
import { socket } from '../config/SocketIO'

export default function PostBody({currentPost, userName}) {

  const likePost = async() => {
    socket.emit('post_like', {
      post: currentPost._id,
      user: userName
    })
  }

  const dislikePost = async() => {
    socket.emit('post_dislike', {
      post: currentPost._id,
      user: userName
    })
  }

  return (
    <div className='postbody'>
      <div className="postbody__header">

        <div className="postbody__like_dislike">
          <img onClick={likePost} className='cursor-pointer' src="/assets/like.png" alt="Like" />
          <div className="postbody__counter">
            <span>{currentPost?.likes.length}</span>
          </div>
          <img onClick={dislikePost} className='cursor-pointer' src="/assets/dislike.png" alt="Dislike" />
        </div>

        <div className="postbody__heading_img">
          <img src="/assets/placeholder_image.png" alt="" />
        </div>

        <div className="postbody__heading_text">
          <h1>Outdoor landscape</h1>
          <p style={{position: 'relative'}}>created <span className='postbody_display_ago'>{moment(currentPost?.createdAt).fromNow()}</span> by <span className='postbody_display_user'>{currentPost?.user}</span>
            <span>
              <img style={{position: 'absolute', right: '-70px', top: '-50px'}} src="/assets/user.png" alt="" />
            </span>
          </p>
          <p>
            <span className='postbody_display_comment'>{currentPost?.comments.length} comments</span>
            <span className='postbody_display_views'>{currentPost?.views.length} views</span>
            <span className='postbody_action_share'>share</span>
            <span className='postbody_action_save'>save</span>
            <span className='postbody_action_edit'>edit</span>
            <span className='postbody_action_report'>report</span>
            <span className='postbody_action_export'>export</span>
          </p>
        </div>

      </div>
      {/* Display Image */}
      <div className="postbody__big_image">
        <img src="/assets/placeholder_image_big.png" alt="" />
      </div>
    </div>
  )
}
