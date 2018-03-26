import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Create extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
	  first_name: "",
	  last_name: "",
	  team: "",
	  location: "",
	  designation: "",
	  supervisor: "",
	  previous_companies: "",
	  degree: "",
	  degree_stream: "",
	  degree_colledge: "",
	  created_date: "",
	  updated_date: ""  
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date} = this.state;

    axios.post('http://localhost:3090/employee', { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date  })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD Employee
            </h3>
          </div>
          <div class="panel-body">
            <h4><a href="/listing"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Employee List</a></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
              </div>
              <div class="form-group">
                <label for="title">Name:</label>
                <input type="text" class="form-control" name="first_name" value={first_name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="author">Team:</label>
                <input type="text" class="form-control" name="team" value={team} onChange={this.onChange} placeholder="team" />
              </div>
              <div class="form-group">
                <label for="description">Location:</label>
                <textArea class="form-control" name="location" onChange={this.onChange} placeholder="location" cols="80" rows="3">{location}</textArea>
              </div>
              <div class="form-group">
                <label for="published_date">Joining Date:</label>
                <input type="number" class="form-control" name="created_date" value={created_date} onChange={this.onChange} placeholder="Joining Date" />
              </div>
              <div class="form-group">
                <label for="publisher">Supervisor:</label>
                <input type="text" class="form-control" name="supervisor" value={supervisor} onChange={this.onChange} placeholder="Supervisor" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;