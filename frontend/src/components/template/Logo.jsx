import './Logo.css'
import logo from '../../assets/images/logo-transparent.png'
import React from 'react'
import { Link } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'  

export default props=>
    <aside className="logo">
        <Link  to="/" className="logo">
            <img src={logo} alt='logo'></img>
        </Link>
    </aside>