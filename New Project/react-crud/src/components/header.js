import React, { Component } from 'react'
import logo from '../images/agiliad-logo.png'
import '../css/header.css';

const header = () => {
            return (
            <div className="header">
                <img className="logo" src={logo} alt="not found"></img>
            </div>
        )
}
export default header;