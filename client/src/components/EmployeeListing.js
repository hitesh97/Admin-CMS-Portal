import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';

class EmployeeListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3090/employee')
      .then(res => {
        this.setState({ employee: res.data });
        console.log(this.state.employee);
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
                </tr>
              </thead>
              <tbody>
                {this.state.employee.map(employee =>
                  <tr>
                    <td><Link to={`/show/${employee._id}`}>{employee.email}</Link></td>
                    <td>{employee.first_name}</td>
                    <td>{employee.created_date}</td>
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