import React, { Component } from 'react';

class BreadCrumb extends Component {

  constructor(props) {
   super(props);        
  }
  
  render() {
    let path = window.location.pathname.split("/")[1].toUpperCase();
    path = path.replace("-", " ");
    path = path.replace("_", " ");

    return (  	  
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/listing">DASHBOARD</a>
        </li>
        <li className="breadcrumb-item active">{path}</li>
      </ol>
    );
  }
}

export default BreadCrumb;