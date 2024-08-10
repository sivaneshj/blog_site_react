import React from 'react'
import Feed from './Feed.jsx'
const Home = ({val,error,loading}) => {
  return (
    <div className='Home'>
      {loading && <p className='common'>Loading....</p>}
      {error && !loading&& <p className='common'>{error}</p>}
      {!error &&!loading&& <Feed val={val}/>}
    </div>
  )
}

export default Home