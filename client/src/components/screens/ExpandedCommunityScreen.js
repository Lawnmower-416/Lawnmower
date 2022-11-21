import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../../constants'
import NavBar from '../NavBar'
import PostBody from '../PostBody'
import PostComments from '../PostComments'
import { socket } from './../../config/SocketIO'

export default function Home() {
  
  const [currentPost, setCurrentPost] = useState(null)
  const [userName, setUserName] = useState(null);
  
  
  useEffect(() => {
    socket.on('updated_post', data => {
      console.log('updated_post: ', data)
      setCurrentPost(data[0])
    })
  }, [socket])


  const createUserAndUniqueView = async() => {
    const existUser = await localStorage.getItem('userName')
    setUserName(existUser)
    if( !existUser ){
      const randomNumber = Math.round(Math.random() * 1000000)
      const username = 'user__'+randomNumber

      console.log({serverUrl})

      fetch(`${serverUrl}/user/create`, {
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



  const createUniqueView = async() => {
    fetch(`${serverUrl}/post/createView`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        post: currentPost._id,
        user: userName
      })
    })
  }

  // send me a screenshot of terminal with logs


  //ok
  useEffect(() => {    
    createUserAndUniqueView()   
    createUniqueView()

    fetch(`${serverUrl}/post/get-all`)
      .then(res => res.json())
      .then(result => {
        setCurrentPost(result[0])
        console.log(result)
      })
  }, [currentPost])

  return (
    <a target="_blank" href="https://ephemeral-vacherin-baeb54.netlify.app/expandedcommunity">Expanded Community</a>
    /*
    <div>
      <NavBar/>
      {
        currentPost ? (
          <>
            <div className="container">
              <PostBody currentPost={currentPost} userName={userName}/>
            </div>
            <div className="">
              <PostComments userName={userName} currentPost={currentPost} />
            </div>
          </>
        ) : (
          <p>No post yet.</p>
        )
      }
    </div>
    */
  )
}
