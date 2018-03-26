import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [	
		<li className="nav-item" key={1}>
          <Link className="nav-link" to="/protected_content">Protected Content</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/admin_area">Admin Area</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/admin_activation">Admin Activation</Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
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
	  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">Dashboard</a>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
		 <ul className="navbar-nav mr-auto">
          {this.renderLinks()}
         </ul>         
        <form className="form-inline mt-2 mt-md-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
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
