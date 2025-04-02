import './Logo.css'
import logo from '../../assets/images/logo-transparent.png'
import React from 'react'

export default props=>
    <aside className="logo">
        <a href="/" className="logo">
        <img src={logo} alt='logo'></img>
        </a>
    </aside>