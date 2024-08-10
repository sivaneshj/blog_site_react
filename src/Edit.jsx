import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Edit = ({val,edittitle,loading,setedittitle,editdes,seteditdes,handleedit}) => {
    const {id}=useParams()
    var items=val.find(item=>item.id === id)
    useEffect(()=>{
        {!loading && setedittitle(items.title)}
        {!loading && seteditdes(items.des)}
    },[seteditdes,setedittitle,items,loading])
    
  return (
    <div className='Edit'>
        {!loading && 
        <>
            <form className='newPostForm' onSubmit={(e)=>handleedit(e,id)}>
                <h2>Edit Post</h2>
                <label htmlFor="title">title</label>
                <input type="text" id='title' value={edittitle} 
                onChange={e=>setedittitle(e.target.value)}/>
                <label htmlFor="post">Post</label>
                <textarea  id="post" value={editdes} onChange={e=>seteditdes(e.target.value)}></textarea>
                <button type='submit'>Submit</button>
            </form>
        </>}
        {loading && <p className='common'>Loading...</p>}
    </div>
  )
}

export default Edit