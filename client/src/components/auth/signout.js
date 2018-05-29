import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  componentDidMount(){
  	this.props.history.push("/signin")
  }

  render() {
    return <div>User has been logged out.</div>;
  }
}

export default connect(null, actions)(Signout);
