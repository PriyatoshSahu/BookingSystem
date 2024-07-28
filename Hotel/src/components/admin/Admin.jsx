import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='Container mt-5'>
        <h2>Welcome to Admin Panel</h2>
        <hr></hr> 
        <Link to={'/existing-room'}>Manage Rooms </Link>
        <br/>
         <Link to={"/existing-booking"}>Manage Booking</Link>
    </section>
  )
}

export default Admin