import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import BreadCrumb from './Breadcrumb';
import axios from 'axios';
import { Link } from 'react-router';

class App extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      employee: []
    };
  }

  componentDidMount() {
    axios.get('/employee')
      .then(res => {
        this.setState({ employee: res.data });        
      });
  }
  getHeader(){
    if(this.props.authenticated) {
      return (
        <Header/>
      );
    }
  }
  getBreadCrumb(){
    if(this.props.authenticated) {
      return (
        <BreadCrumb/>
      );
    }
  }
  getLogo(){
    if(!this.props.authenticated) {
      return (
        <div className="text-center"><img alt="Impetus" src="../../images/Impetus_logo.png"/></div>
      );
    }
  }
  
  render() {
    var contentCls = this.props.authenticated ? "content-wrapper" : "container";
    return (
      <div>
        {this.getHeader()}
        <div className={contentCls}>          
          <div className="container-fluid">
            {this.getLogo()}
            {this.getBreadCrumb()}
            {this.props.children}  
          </div> 
        </div> 	
      </div>
    );
  }
  
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(App);
