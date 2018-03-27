import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3090/';

class EmployeeListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: []
    };
  }

  componentDidMount() {
    axios.get(ROOT_URL+'employee')
      .then(res => {
        this.setState({ employee: res.data });        
      });
  }
  
  delete(id){   
    axios.delete(ROOT_URL+'employee/'+id)
      .then((result) => {
        this.props.history.push("/listing")
      });
  }

  render() {
    return (	  
      <div>
        	
		  <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Employee Listing
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Employee</Link></h4>
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
                    <td><Link to={`/edit/${employee._id}`}>{employee.email}</Link></td>
                    <td>{employee.first_name}</td>
                    <td>{employee.created_date}</td>
                    <td><button onClick={this.delete.bind(this, employee._id)} class="btn btn-danger">Delete</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeListing;