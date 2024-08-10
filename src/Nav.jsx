import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search,setsearch,handlesubmit}) => {
  return (
    <div className='Nav'>
      <form className='searchForm' onSubmit={e=>e.preventDefault()}>
        <label htmlFor="search">Search Item</label>
        <input type="text" value={search} id='search' onChange={e=>setsearch(e.target.value)} placeholder='search posts'/>
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">Post</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  )
}

export default Nav