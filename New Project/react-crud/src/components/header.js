import React, { Component } from 'react'
import logo from '../images/agiliad-logo.png'
import '../css/header.css';

export default class Header extends Component {
    constructor(props){
        super(props);

    }
    render(){

            return (
                <div id="headerId">
                    {this.props.obj ? <></> : <div className="right">
                    <a href="#"> <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i></a>
                </div>}
            <div className="header">
                <img className="logo" src={logo} alt="not found"></img>
            </div>
            </div>
        )
}
}