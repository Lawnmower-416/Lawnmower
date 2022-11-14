import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import PostBody from '../components/PostBody'
import PostComments from '../components/PostComments'
import { socket } from '../config/SocketIO'

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

      fetch('http://localhost:5001/user/create', {
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
    fetch("http://localhost:5001/post/createView", {
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

  useEffect(() => {
    createUserAndUniqueView()
    createUniqueView()

    fetch('http://localhost:5001/post/get-all')
      .then(res => res.json())
      .then(result => {
        setCurrentPost(result[0])
        console.log(result)
      })
  }, [currentPost])

  return (
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
  )
}
