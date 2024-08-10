import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <article className='post'>
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.time}</p>
      </Link>
      {(post.des).length >= 25? <p className='postBody'>{(post.des).slice(0,25)}...</p>:
      <p className='postBody'>{post.des}</p>}
    </article>
  )
}

export default Post