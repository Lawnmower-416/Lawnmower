import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthContext from '../../auth'
import GlobalStoreContext from '../../store'
import NavBar from '../NavBar'
import PostBody from '../PostBody'
import PostComments from '../PostComments'
import { socket } from './../../config/SocketIO'

export default function Home() {
  
  const [currentPost, setCurrentPost] = useState(null)
  const [userName, setUserName] = useState(null);

 
   const [searchParams, setSearchParams] = useSearchParams();
   const postID = searchParams.get("id")
   const postType = searchParams.get("postType")
   const navigate = useNavigate()

 
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const userTilesets = store.userTilesets
  const userMaps = store.userMaps

  useEffect(() => {
    console.log({auth})
  }, [auth])

  useEffect(() => {
    socket.on('updated_post', data => {
      console.log('updated_post: ', data)
      setCurrentPost(data)
    })

    if(auth.user?._id){
      socket.emit('post_view', {
        postId: postID,
        userId: auth.user?._id,
        postType: postType
      })
    }else{
      socket.emit('guest_view', {
        postId: postID,
        postType: postType
      })
    }

  }, [socket])


  // 

/**
 * frontend*. added
 */
  // useEffect(() => {
  //   // if(userTilesets.length == 0){
  //   //   navigate('/login')
  //   // }
  
  //   userTilesets.map((tileset, index) => {
  //     if(tileset._id == postID){
  //       // setCurrentPost(tileset);
  //       console.log({tileset})
  //     }
  //   })

  //   console.log("UserMaps: ", {userMaps})

  // }, [userTilesets, postID, userMaps])
  
  

  const createUserAndUniqueView = async() => {
    const existUser = await localStorage.getItem('userName')
    setUserName(existUser)
    if( !existUser ){
      const randomNumber = Math.round(Math.random() * 1000000)
      const username = 'user__'+randomNumber

      fetch('http://34.193.24.27:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: username})     
      }).then(res => res.json())
      .then( async result => {   
        console.log(result)     
        setUserName(result.name)
        await localStorage.setItem('userName', result.name)
        await localStorage.setItem('userID', result._id)
      })

    }else{
      console.log('exist user')
    }
    
  }

  useEffect(() => {    
    createUserAndUniqueView()   
    // createUniqueView()
  }, [currentPost])

  /**
 * frontend6. line 93 css bg-gradient-to-t from-[#54c941] to-[#c9e8b1] added
 */
  return (
    <div className='bg-gradient-to-t from-[#54c941] to-[#c9e8b1]'>
      <NavBar/>
      {
        currentPost ? (
          <>
            <div className="container">
              <PostBody currentPost={currentPost} userName={userName} postType={postType} />
            </div>
            <div className="">
              <PostComments userName={userName} currentPost={currentPost} postType={postType} />
            </div>
          </>
        ) : (
          <p>No post yet.</p>
        )
      }
    </div>
  )
}
