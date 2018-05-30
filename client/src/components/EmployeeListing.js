import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory, router } from 'react-router';
import axios from 'axios';
import moment from 'moment';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
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
        <ReactTable
          data={this.state.employee}
          filterable
          defaultFilterMethod={(filter, row) => row[filter.id].indexOf(filter.value)!=-1}
          columns={[              
                {
                  Header: "Email",
                  accessor: "email",
                  className:"text-center",
                  Cell: row => <Link to={`/create/${row.original._id}`}>{row.original.email}</Link>   
                },
                {
                  Header: "Name",
                  accessor: "first_name",
                  className:"text-center"
                },
                {
                  Header: "Date",
                  accessor: "created_date",
                  className:"text-center",
                  filterable: false,
                  Cell: row => moment(row.original.created_date).format("LL")
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  className:"text-center",
                  filterable: false,
                  Cell: row => <button onClick={this.delete.bind(this, row.original._id)} className="btn btn-secondary">Delete</button> // Custom cell components!
                }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
                
      </div>	  
    );
  }
}

export default EmployeeListing;