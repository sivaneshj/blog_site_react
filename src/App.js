
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
import PostPage from './PostPage.jsx'
function App() {
  var navigate=useNavigate()
  var [val,setval]=useState([
    {
      id:'1',
      title:'beautiful cat',
      time:'july 2024, 11-05 10:25AM',
      des:"Each cat has a unique begaviour, they Activity heal the humans"
    },
    {
      id:'2',
      title:'cryptocurrency',
      time:'june 2024, 22-08 09:30PM',
      des:'Cryptocurrency getting famous in all over the world'
    },
    {
      id:'3',
      title:'Education',
      time:'march 2022, 11-10 06:15AM',
      des:'Education is powerful weapon in the world.Keep learn'
    }
  ])
  var [search,setsearch]=useState('')
  var [searchItem,setsearchItem]=useState([])
  var [title,settitle]=useState('')
  var [des,setdes] =useState('')

  useEffect(()=>{
    var temp= val.filter((post)=>{
      return (post.title).toLowerCase().includes(search.toLocaleLowerCase())||
      (post.time).toLowerCase().includes(search.toLocaleLowerCase())
    })
    var final=[...temp].reverse()
    setsearchItem(final)
  },[search,val])

  function handlesubmit(e){
    e.preventDefault()
    const id= val.length? parseInt(val[val.length-1].id)+1:1
    var newpost = {
      id:id.toString(),
      title:title,
      time: format(new Date(),'MMMM dd, yyyy pp'),
      des:des
    }
    var allval=[...val,newpost]
    setval(allval)
    settitle('')
    setdes('')
    navigate('/')
  }
  
  return (
    <div className="App">
      <Header title='Siva Social Media'/>
      <Nav search={search} setsearch={setsearch} />
      <Routes>
        <Route path='/' element={<Home val={searchItem}/>}/>

        <Route path='/post' >
          <Route index element={<NewPost handlesubmit={handlesubmit} title={title} settitle={settitle} des={des} setdes={setdes}/>}/>

          <Route path=':id' element={<PostPage val={val} setval={setval}/>}/>

          <Route path='*' element={<Missing/>}/>
        </Route>

        <Route path='*' element={<Missing />}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
