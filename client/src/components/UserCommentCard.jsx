import React from 'react'

export default function UserCommentCard({data}) {
  return (
    <div className='bg-white rounded p-4 bg-opacity-20 text-white'>
      <ul>
        <li><span className='text-[#ffffff83]'>Post Title:</span> {data.title}</li>
        <li><span className='text-[#ffffff83]'>Post type:</span> {data.postType}</li>
        <li><span className='text-[#ffffff83]'>Comment:</span> {data.message}</li>
        <li><span className='text-[#ffffff83]'>Time:</span> {new Date(data.updatedAt).toLocaleDateString()} : {new Date(data.updatedAt).toLocaleTimeString()}</li>
      </ul>
    </div>
  )
}
