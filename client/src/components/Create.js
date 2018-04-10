import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import WelcomAboard from './WelcomAboard';
import ImageUpload from './ImageUpload';
const ROOT_URL = 'http://localhost:3090/';


class Create extends Component {

  constructor(props) {
    super(props);
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
	  updated_date: "",
    user_image: ""  
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
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image} = this.state;

    axios.post(ROOT_URL+'employee', { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image  })
      .then((result) => {
        this.props.history.push("/listing")
      });
  }

  _handleImageChange(e) {    
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        user_image: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image } = this.state;
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
                <label for="isbn">Email:</label>
                <input type="text" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
              </div>
              <div className="form-group">
                <label for="title">Name:</label>
                <input type="text" className="form-control" name="first_name" value={first_name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label for="author">Team:</label>
                <input type="text" className="form-control" name="team" value={team} onChange={this.onChange} placeholder="team" />
              </div>
              <div className="form-group">
                <label for="description">Location:</label>
                <textArea className="form-control" name="location" onChange={this.onChange} placeholder="location" cols="80" rows="3">{location}</textArea>
              </div>
              <div className="form-group">
                <label for="published_date">Joining Date:</label>
                <input type="number" className="form-control" name="created_date" value={created_date} onChange={this.onChange} placeholder="Joining Date" />
              </div>
              <div className="form-group">
                <label for="publisher">Supervisor:</label>
                <input type="text" className="form-control" name="supervisor" value={supervisor} onChange={this.onChange} placeholder="Supervisor" />
              </div>
              <div className="form-group">
                <ImageUpload onChange={(e)=>this._handleImageChange(e)}/>
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