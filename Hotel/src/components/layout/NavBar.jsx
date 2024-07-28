import React, { useState } from 'react'
import { Dropdown, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const NavBar = () => {

    const [showAccount , setShowAccount] = useState(false)
    const handleAccountClick = ()=>{
        setShowAccount(!showAccount)
    }
  return (

// navbar-expand-lg: Specifies that the navbar will expand horizontally for large screens (lg) and above.
// bg-body-tertiary: Defines the background color of the navbar. This could be a custom class or part of a CSS framework like Bootstrap
//   sticky-top: Makes the navbar stick to the top of the viewport when scrolling.
 

// The navbar-brand class is typically used in Bootstrap to style the brand element.

 <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>

            <Link to={"/"} className='navbar-brand'>
            <span className='hotel-color'>SeaViewHotel</span>
            </Link>

            {/* <button className='navbar-toggler ' 
            type='button' 
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll" 
            aria-expanded="false" 
            aria-label='Toggle-navigation'>
            <span className='navbar-toggler-icon'></span>
            </button> */}
            
            <div className='collapse navbar-collapse' id='navbarScroll'>
                
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                
                    <li className='nav-item'> 
                    <Link to={"/browse-all"} className='nav-link' aria-current="page">
                        Browse All Rooms
                    </Link>
                    </li>
                 
                    <li className='nav-item'>
                     <Link to={"/Admin"} className='nav-link' aria-current="page">
                        Admin
                     </Link>
                    </li>

                 </ul>

                 <ul className=' d-flex navbar-nav'>
                    
                    <li className='nav-item'>
                        <Link className='nav-link' to={"/find-booking"}>
                        find all my booking
                        </Link>
                    </li>
                    
                    <li className='nav-item dropdown'>
                        <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                        href='#'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                        onClick={handleAccountClick}>
                            {" "}
                            Account
                        </a>
                         
                         <ul className={`dropdown-menu ${showAccount ? "show": ""} `}
                         aria-labelledby='navbar-Dropdown'> 
                         
                            <li>
                                <Link to={"/login"} className='dropdown-item'> login </Link>
                            </li>

                            <li>
                                <Link to={"/profile"} className='dropdown-item'> profile </Link>
                            </li>

                            <li>
                                <Link to={"/logout"} className='dropdown-item'> logout </Link>
                            </li>
                   
                        </ul> 
                   
                    </li>
                    
                 </ul>

                 
            
            </div>

        </div>
    </nav>
  )
}

export default NavBar