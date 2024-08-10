import React from 'react'
import Post from './Post.jsx'

const Feed = ({val}) => {
  return (
    <div>
        {val.map((post)=>{
            return <Post key={post.id} post={post}/>
        })}
    </div>
  )
}

export default Feed