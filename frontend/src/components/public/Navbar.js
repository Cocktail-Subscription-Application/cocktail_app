import React, { Component } from 'react'
import './Navbar.css'
import { HashLink as Link } from "react-router-hash-link"
// import { Hashlink as Link } from 'react-router-hash-link'
import Logout from './Logout'
import logonav from '../../images/logo.bare.svg';


export default class Navbar extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleScroll = this.handleScroll.bind(this)
    }

    handleScroll() {
        this.setState({scroll: window.scrollY})
    }

    componentDidMount = () => {
      const el = document.querySelector('nav')
      this.setState({top: el.offsetTop, height: el.offsetHeight})
      window.addEventListener('scroll', this.handleScroll)
    }

    componentDidUpdate() {
        this.state.scroll > this.state.top ?
        document.body.style.paddingTop = 0 :
        document.body.style.paddingTop = 0
    }
    
    
  render() {
    // console.log(this.props)
    return (
      <div>
        {/* <div>We can also put a message up here if we want to</div> */}
        <nav id="nav" className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
          <ul>
              <li><Link to='/#home'><img  class="navlogo" src={logonav}/></Link></li>
              {!this.props.adminStatus && <li><Link to='/#about'>About</Link></li>}
              {!this.props.adminStatus && <li><Link to='/#how-it-works'>How it Works</Link></li>}
              {this.props.token && !this.props.adminStatus && <li><Link to='/userprofile'>Your Profile</Link></li>}
              {!this.props.token && <li><Link to='/#register' >Register/ Login</Link></li>}
              {this.props.adminStatus && <li><Link to='/admin/#customers'>Dashboard</Link></li>}
              {this.props.adminStatus && <li><Link to="/admin/cocktails">Cocktails</Link></li>} 
              {this.props.token && <li><Logout {...this.props}/></li>}
          </ul>
        </nav>
      </div>
    )
  }
}



