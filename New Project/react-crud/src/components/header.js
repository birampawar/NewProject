import React, { Component } from 'react'
import logo from '../images/agiliad-logo.png'
import '../css/header.css';

export default class Header extends Component {
    constructor(props){
        super(props);

    }
    render(){

            return (    
            <div id="headerId" className="row align-items-start">
                <div className="col-8 offset-2" >
                    <div className="header">
                        <img className="logo" src={logo} alt="not found"></img>
                    </div>
                </div>  
                <div className="col right">
                    {this.props.obj ? <></> : <div className="">
                        <a href="#"> <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i></a>
                    </div>}
                </div>
                
            </div>
        )
}
}