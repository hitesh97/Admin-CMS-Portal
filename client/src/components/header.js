import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={5}>
          <Link className="nav-link" to="/email_setting">Mail Configuration</Link>
        </li>,	
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/listing">Employees Listing</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/create">Add Employee</Link>
        </li>,
        <li className="nav-item" key={6}>
          <Link className="nav-link" to="/signout">Logout</Link>
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
  }

  render() {
    return (
	  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#"><img src="../../images/Impetus_logo.png"/></a>

      <div className="collapse navbar-collapse" id="navbarResponsive">
		    <ul className="navbar-nav navbar-sidenav">
          {this.renderLinks()}
         </ul>     
         <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <a className="nav-link text-center" id="sidenavToggler">
              <i className="fa fa-fw fa-angle-left"></i>
            </a>
          </li>
        </ul>    
        <ul className="navbar-nav ml-auto">
          {this.renderLinks()}
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
