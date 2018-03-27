import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3090/';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: {}
    };
  }

  componentDidMount() {
    axios.get(ROOT_URL+'employee/'+this.props.params.id)
      .then(res => {
        this.setState({ employee: res.data });        
      });
  }

  onChange = (e) => {
    const state = this.state.employee
    state[e.target.name] = e.target.value;
    this.setState({employee:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date } = this.state.employee;

    axios.put(ROOT_URL+'employee/'+this.props.params.id, { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date })
      .then((result) => {
        this.props.history.push("/listing")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Employee Details
            </h3>
          </div>
          <div class="panel-body">            
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Email:</label>
                <input type="text" class="form-control" name="email" value={this.state.employee.email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="title">Name:</label>
                <input type="text" class="form-control" name="first_name" value={this.state.employee.first_name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="author">Team:</label>
                <input type="text" class="form-control" name="team" value={this.state.employee.team} onChange={this.onChange} placeholder="Team" />
              </div>
              <div class="form-group">
                <label for="description">Location:</label>
                <input type="text" class="form-control" name="location" value={this.state.employee.location} onChange={this.onChange} placeholder="Location" />
              </div>
              <div class="form-group">
                <label for="published_date">Joining Date:</label>
                <input type="number" class="form-control" name="created_date" value={this.state.employee.created_date} onChange={this.onChange} placeholder="Joining Date" />
              </div>
              <div class="form-group">
                <label for="publisher">Supervisor:</label>
                <input type="text" class="form-control" name="supervisor" value={this.state.employee.supervisor} onChange={this.onChange} placeholder="Supervisor" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;