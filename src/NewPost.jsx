import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const {handlesubmit,des,setdes,title,error,settitle}=useContext(DataContext)
  return (
    <div className='NewPost'>
      {!error && 
      <>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handlesubmit}>
            <label htmlFor="title">title</label>
            <input type="text" id='title' value={title} 
            onChange={e=>settitle(e.target.value)}/>
            <label htmlFor="post">Post</label>
            <textarea  id="post" value={des} onChange={e=>setdes(e.target.value)}></textarea>
            <button type='submit'>Submit</button>
        </form>
      </>}
      { error && <p className='common'>{error}</p>}
    </div>
  )
}

export default NewPost