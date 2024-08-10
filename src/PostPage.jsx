import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({val,handledelete,loading,error}) => {
  const par = useParams()
  var item = val.find((item)=>{
    return item.id === par.id
  })
  return (
    <div className='PostPage'>
      <article className='Post'>
        {item && !error && 
        <>
          <h2>{item.title}</h2>
          <p className='postDate'>{item.time}</p>
          <p className='postBody'>{ item.des}</p>
          <Link to={`/edit/${par.id}`}><button className='editButton'>Edit</button></Link>
          <button className='deleteButton' onClick={()=>handledelete(par)}>Delete</button>        
        </>}
        {!item && !loading && 
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>}
        {loading && <p className='common'>Loading...</p>}
        { error && <p className='common'>{error}</p>}
     </article>
    </div>
  )
}

export default PostPage