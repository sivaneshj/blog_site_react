import React from 'react'
import Feed from './Feed.jsx'
const Home = ({val}) => {
  return (
    <div className='Home'>
      <Feed val={val}/>
    </div>
  )
}

export default Home