import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostPage = ({val,setval}) => {
  const navigate=useNavigate()
  const par = useParams()
  var item = val.find((item)=>{
    return item.id === par.id
  })
  function handledelete(){
    var filtered = val.filter((item)=>{
      return item.id === par.id? item.id !== par.id:item
    })
    setval(filtered)
    navigate('/')
  }
  return (
    <div className='PostPage'>
      <article className='Post'>
        {item && 
        <>
          <h2>{item.title}</h2>
          <p className='postDate'>{item.time}</p>
          <p className='postBody'>{ item.des}</p>
          <button className='deleteButton' onClick={handledelete}>Delete</button>        
        </>}
        {!item && 
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>}
     </article>
    </div>
  )
}

export default PostPage