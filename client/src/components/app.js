import React from 'react';
import { Component } from 'react';

import Header from './header';
import ReactDOM from 'react-dom';

import axios from 'axios';

export default class App extends Component {
	
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
        console.log(this.state.employee);
      });
  }
  
  render() {
    return (
      <div>
        <Header />
		<div className="container-fluid">
		  <div className="col-md-12">
        	{this.props.children}
		  </div>	
		</div>
      </div>
    );
  }
  
};

