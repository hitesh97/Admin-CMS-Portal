import React, { Component } from 'react';
import axios from 'axios';


class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('/employee/'+this.props.match.params.id)
      .then(res => {
        this.setState({ employee: res.data });
        console.log(this.state.employee);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/employee/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.employee.first_name}
            </h3>
          </div>
          <div class="panel-body">
            <h4><a href="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Employee List</a></h4>
            <dl>
              <dt>ISBN:</dt>
              <dd>{this.state.employee.email}</dd>
              <dt>Team:</dt>
              <dd>{this.state.employee.team}</dd>
              <dt>Location:</dt>
              <dd>{this.state.employee.location}</dd>
              <dt>Joining Date:</dt>
              <dd>{this.state.employee.created_date}</dd>
              <dt>Supervisor:</dt>
              <dd>{this.state.employee.supervisor}</dd>
            </dl>
            <a href={`/edit/${this.state.employee._id}`} class="btn btn-success">Edit</a>&nbsp;
            <button onClick={this.delete.bind(this, this.state.employee._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;