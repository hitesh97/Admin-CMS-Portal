import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faUserEdit, faList, faCog, faPlus, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  leftNav() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={5}>
          <Link className="nav-link" to="/email_setting"><FontAwesomeIcon icon={faCog} size="1x" /> Mail Configuration</Link>
        </li>,	
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/listing"><FontAwesomeIcon icon={faList} size="1x" /> Employees Listing</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/create"><FontAwesomeIcon icon={faPlus} size="1x" /> Add Employee</Link>
        </li>,
        <li className="nav-item" key={6}>
          <Link className="nav-link" to="/signout"><FontAwesomeIcon icon={faSignOutAlt} size="1x" /> Logout</Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  };
  topNav() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={5}>
          <Link className="nav-link" to="/email_setting"><FontAwesomeIcon icon={faCog} size="lg" /></Link>
        </li>,	
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/listing"><FontAwesomeIcon icon={faList} size="lg" /></Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/create"><FontAwesomeIcon icon={faPlus} size="lg" /></Link>
        </li>,
        <li className="nav-item" key={6}>
          <Link className="nav-link" to="/signout"><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  };

  render() {
    return (
	  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#"><img src="../../images/Impetus_logo.png"/></a>

      <div className="collapse navbar-collapse" id="navbarResponsive">
		    <ul className="navbar-nav navbar-sidenav">
          {this.leftNav()}
         </ul>     
         <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <a className="nav-link text-center" id="sidenavToggler">
              <i className="fa fa-fw fa-angle-left"></i>
            </a>
            <ul class="sidenav-second-level collapse" id="collapseExamplePages">
              {this.topNav()}
            </ul>            
          </li>
        </ul>    
        <ul className="navbar-nav ml-auto">
          {this.topNav()}
        </ul>
      </div>
    </nav>	
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
