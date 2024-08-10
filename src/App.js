
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Home.jsx'
import Header from './Header.jsx'
import Nav from './Nav.jsx'
import { useEffect, useState } from 'react';
import NewPost from './NewPost.jsx'
import { format } from 'date-fns';
import Missing from './Missing.jsx';
import About from './About.jsx';
import Footer from './Footer.jsx'
import PostPage from './PostPage.jsx';
import API from './api/api.js';
import Edit from './Edit.jsx';
function App() {
  var navigate=useNavigate()
  var [val,setval]=useState([])
  var [search,setsearch]=useState('')
  var [searchItem,setsearchItem]=useState([])
  var [title,settitle]=useState('')
  var [des,setdes] =useState('')
  var [edittitle,setedittitle]=useState('')
  var [editdes,seteditdes] =useState('')
  var [loading,setloading] =useState(true)
  var [error,seterror]=useState(false)

  useEffect(()=>{
    async function getting(){
      try{
        const response =await API.get(`items`)
        setval(response.data)
        seterror(false)
      }catch(err){
        seterror(err.message);
      }
      finally{
        setloading(false)
      }
    }
    setTimeout(()=>{
      (async()=> await getting())()
    },2000)
  },[])

  useEffect(()=>{
    var temp= val.filter((post)=>{
      return (post.title).toLowerCase().includes(search.toLocaleLowerCase())||
      (post.time).toLowerCase().includes(search.toLocaleLowerCase())
    })
    var final=[...temp].reverse()
    setsearchItem(final)
  },[search,val])

  async function handlesubmit(e){
    e.preventDefault()
    const id= val.length? val.length+1:1
    var newpost = {
      id:id.toString(),
      title:title,
      time: format(new Date(),'MMMM dd, yyyy pp'),
      des:des
    }
    try{
      const response = await API.post(`items`,newpost)
      var allval=[...val,response.data]
      setval(allval)
      settitle('')
      setdes('')
      navigate('/')
    }catch(err){
      seterror(err.message);
    }
  }

  async function handledelete(par){
    var filtered = val.filter((item)=>{
      return item.id === par.id? item.id !== par.id:item
    })
    try{
      await API.delete(`items/${par.id}`)
      setval(filtered)
      navigate('/')
    }catch(err){
      seterror(err.message); 
    }
  }
  async function handleedit(e,id){
    e.preventDefault()
    const newpost = {
      id:id,
      title:edittitle,
      time: format(new Date(),'MMMM dd, yyyy pp'),
      des:editdes
    }
    const response = await API.put(`items/${id}`,newpost)
    const list = val.map((item)=>{
      return item.id === id? response.data:item
    })
    setval(list)
    navigate('/')
  }
  
  return (
    <div className="App">
      <Header title='Siva Social Media'/>
      <Nav search={search} setsearch={setsearch} />
      <Routes>
        <Route path='/' element={<Home error={error} loading={loading} val={searchItem}/>}/>

        <Route path='/post' >
          <Route index element={<NewPost error={error} handlesubmit={handlesubmit} title={title} settitle={settitle} des={des} setdes={setdes}/>}/>

          <Route path=':id' element={<PostPage loading={loading} error={error} val={val} handledelete={handledelete} setval={setval}/>}/>

          <Route path='*' element={<Missing/>}/>
        </Route>
        <Route path='/edit/:id' element={<Edit loading={loading} val={val} edittitle={edittitle} setedittitle={setedittitle} editdes={editdes} seteditdes={seteditdes} handleedit={handleedit}/>}/>
        <Route path='*' element={<Missing />}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
