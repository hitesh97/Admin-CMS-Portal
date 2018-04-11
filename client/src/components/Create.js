import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import WelcomAboard from './WelcomAboard';
//import Calendar from 'react-calendar';
import moment from 'moment';

const ROOT_URL = 'http://localhost:3090/';


class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
	  first_name: "",
	  last_name: "",
	  gender: "",
	  team: "",
	  location: "",
	  designation: "",
	  supervisor: "",
	  previous_companies: "",
	  degree: "",
	  degree_stream: "",
	  degree_colledge: "",
	  created_date: moment(),
	  updated_date: ""  
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
	this.props = state;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, first_name, last_name, gender, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date} = this.state;

    axios.post(ROOT_URL+'employee', { email, first_name, last_name,  gender ,team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date  })
      .then((result) => {
        this.props.history.push("/listing")
      });
  }

  render() {
    const { email, first_name, last_name, gender ,team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date } = this.state;
	
	
	const locations = ["Indore","Noida","Gurg","Bangaluru"] 
    return (
      <div className="row">
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD Employee
            </h3>
          </div>
          <div className="panel-body">            
            <form onSubmit={this.onSubmit}>
			  <div className="form-group">
                <label for="title">First Name:</label>
                <input type="text" className="form-control" name="first_name" value={first_name} onChange={this.onChange} placeholder="First Name" />
              </div>
			  <div className="form-group">
                <label for="title">Last Name:</label>
                <input type="text" className="form-control" name="last_name" value={last_name} onChange={this.onChange} placeholder="Last Name" />
              </div>
			  <div className="form-group">
                <label for="isbn">Email:</label>
                <input type="text" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
              </div>
			  <div className="form-group">
                <label for="author">Gender:</label>
				<div class="radio">
                	<label className="radio-inline"><input type="radio"  name="gender" value={gender} onChange={this.onChange}  /> Male </label>
					<label className="radio-inline"><input type="radio"  name="gender" value={gender} onChange={this.onChange}  /> Female</label>
				</div>	
              </div>
              <div className="form-group">
                <label for="author">Team:</label>
                <input type="text" className="form-control" name="team" value={team} onChange={this.onChange} placeholder="Team" />
              </div>  
              <div className="form-group">
                <label for="location">Location:</label>
				<select className="form-control" name="location" onChange={this.onChange}>
					<option selected value="">Select Location</option>
					<option value="Indore">Indore</option>
					<option value="Bangaluru">Bangaluru</option>
					<option value="Noida">Noida</option>
					<option value="Gurgoan">Gurgoan</option>
				</select>                
			  </div>
			  <div className="form-group">
                <label for="previous_companies">Previous Companies:</label>
                <textArea className="form-control" name="previous_companies" onChange={this.onChange} placeholder="Previous Companies" cols="80" rows="3">{previous_companies}</textArea>
              </div>
			  <div className="form-group">
                <label for="degree">Degree:</label>
                <input className="form-control" name="degree" onChange={this.onChange} placeholder="Degree" value={degree} />
              </div>				
			  <div className="form-group">
                <label for="degree_stream">Degree Stream:</label>
                <input className="form-control" name="degree_stream" onChange={this.onChange} placeholder="Degree Stream" value={degree_stream} />
              </div>
			  <div className="form-group">
                <label for="degree_colledge">Degree Colledge:</label>
                <input className="form-control" name="degree_colledge" onChange={this.onChange} placeholder="Degree Colledge" value={degree_colledge} />
              </div>	
              <div className="form-group">
                <label for="published_date">Joining Date:</label>				
				<input onChange={this.onChange} value={created_date} name="created_date" placeholder="Joining Date"/>
              </div>
              <div className="form-group">
                <label for="publisher">Supervisor:</label>
                <input type="text" className="form-control" name="supervisor" value={supervisor} onChange={this.onChange} placeholder="Supervisor" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>				
      </div>
	<div className="col-md-8">			
	  <WelcomAboard data={this.state}/>
	</div>
	</div>			
    );
  }  
}

export default Create;