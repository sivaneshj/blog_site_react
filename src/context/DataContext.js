import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import API from '../api/api.js'
import useWindowSize from "../hooks/useWindow.js";
const DataContext = createContext({})

export const DataProvider =({children})=>{
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
  var {width}=useWindowSize()
  useEffect(()=>{
    async function getting(){
      try{
        const response = await API.get('items')
        setval(response.data)
        seterror(false)
      }catch(err){
        seterror(err.message);
      }
      finally{
        setloading(false)
      }
    }
    (async()=> await getting())()
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
        <DataContext.Provider
        value={{width,search,setsearch,searchItem,error,handlesubmit,title,settitle,des,setdes,val,handledelete,setval,edittitle,setedittitle,editdes,seteditdes,handleedit,loading}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext