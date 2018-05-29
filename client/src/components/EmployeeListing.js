import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory, router } from 'react-router';
import axios from 'axios';
import {
  ROOT_URL
} from './../actions/types';

class EmployeeListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: []
    };
  }

  componentWillMount() {
    axios.get(ROOT_URL+'employee')
      .then(res => {
        this.setState({ employee: res.data });        
      });
  }
  
  delete(id){
	var self = this;  
    axios.delete(ROOT_URL+'employee/'+id)
      .then((result) => {
        self.props.history.push("/listing")
      });
  }

  render() {
    return (	         	
		  <div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Actions</th>		  		  	
                </tr>
              </thead>
              <tbody>
                {this.state.employee.map(employee =>
                  <tr>
                    <td><Link to={`/create/${employee._id}`}>{employee.email}</Link></td>
                    <td>{employee.first_name}</td>
                    <td>{employee.created_date}</td>
                    <td><button onClick={this.delete.bind(this, employee._id)} className="btn btn-secondary">Delete</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default EmployeeListing;