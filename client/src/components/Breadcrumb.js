import React, { Component } from 'react';

class BreadCrumb extends Component {

  constructor(props) {
   super(props);        
  }
  
  render() {
    return (  	  
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/listing">DASHBOARD</a>
        </li>
        <li className="breadcrumb-item active">{window.location.pathname.replace('/', '').toUpperCase()}</li>
      </ol>
    );
  }
}

export default BreadCrumb;