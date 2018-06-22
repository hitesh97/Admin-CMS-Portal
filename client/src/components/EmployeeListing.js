import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory, router } from 'react-router';
import AxiosBuilder from './AxiosBuilder';
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
    this.axios = new AxiosBuilder({});
  }

  componentWillMount() {
      var self = this;
      const params = {   "url":ROOT_URL+'employee',
                         "method":"get",
                         "payload":{}
                  };
      this.axios.callAxios(params,function(result){
        self.setState({ employee: result });        
      });    
  }
  
  delete(id){
    var self = this;  
    const params = {   "url":ROOT_URL+'employee/'+id,
                          "method":"delete",
                          "payload":{}
                    };
    this.axios.callAxios(params,function(result){
      self.props.history.push("/listing");        
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