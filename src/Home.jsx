import React, { useContext } from 'react'
import Feed from './Feed.jsx'
import DataContext from './context/DataContext.js'
const Home = () => {
  const {searchItem,error,loading}= useContext(DataContext)
  return (
    <div className='Home'>
      {loading && <p className='common'>Loading....</p>}
      {error && !loading&& <p className='common'>{error}</p>}
      {!error &&!loading && searchItem.length >=1 && <Feed val={searchItem}/>}
      {searchItem.length<=0 && !loading&& <p className='common'>Empty List</p>}
    </div>
  )
}

export default Home