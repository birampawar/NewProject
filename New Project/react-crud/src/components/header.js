import React, { Component } from 'react'
import logo from '../images/agiliad-logo.png'
import '../css/header.css';

const header = () => {
            return (
            <div>
                <div className="right">
                    <a href="#"> <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i></a>
                </div>
                <div className="header">
                    
                    <img className="logo" src={logo} alt="not found"></img>
                </div>
            </div>
        )
}
export default header;