import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import FormValidator from './FormValidator';
import axios from 'axios';
import {
  ROOT_URL
} from './../actions/types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



class EmailSetting extends Component {

  constructor(props) {
    super(props);
    this._eid = this.props.params.id;
    this.isUpdate = (this._eid ? "/"+this._eid : "");
    
    
    this.validator = new FormValidator([
      {
        field: 'from',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide from email.'
      },
      { 
        field: 'to',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide to emails.'
      },
      {
        field: 'subject_text',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide an subject text.'
      }      
    ]);    
    
    this.state = {
      from: "",
  	  to: "",
  	  subject_text: "",
      validation: this.validator.valid()   
    };

    this.submitted = false;
    
  };

  onChange = (e) => {
    this.submitted = true;
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
	  this.props = state;
  }



  onSubmit = (e) => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);    
    this.submitted = true;
    if(validation.isValid){
      var self = this;
      const { from, to, subject_text } = this.state;
      
      axios.post(ROOT_URL+'emailSetting'+this.isUpdate, { from, to, subject_text })
        .then((result) => {
          self.props.history.push("/listing")
        });
    }else{
      this.setState(this.state);
      return false;
    }    
  }



  render() {
    const { from, to, subject_text } = this.state;

    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                        this.state.validation // otherwise just use what's in state
                        console.log(this.validator)
    
    return (
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="panel panel-default">            
            <div className="panel-body">            
              <form onSubmit={this.onSubmit}>
              

  			  <div className="form-group" > 
              <div className={validation.from.isInvalid && 'has-error'}>
                  <label for="title">From:</label>
                  <input type="text" className="form-control" name="from" value={from} onChange={this.onChange} placeholder="From Email" />
                  <span className="help-block">{validation.from.message}</span>
              </div>    
          </div>
  			  <div className="form-group" >
              <div className={validation.to.isInvalid && 'has-error'}>  
                  <label for="title">To:</label>
                  <input type="text" className="form-control" name="to" value={to} onChange={this.onChange} placeholder="To Emails" />
                  <span className="help-block">{validation.to.message}</span>
                </div>
          </div>  
  			  <div className="form-group" >
            <div className={validation.subject_text.isInvalid && 'has-error'}>
                  <label for="isbn">Subject Text:</label>
                  <input type="text" className="form-control" name="subject_text" value={subject_text} onChange={this.onChange} placeholder="Subject" />
                  <span className="help-block">{validation.subject_text.message}</span>
            </div>    
          </div> 			  
          <button onClick={this.onSubmit} className="btn btn-primary">Submit</button>                
        </form>
            </div>
          </div>				
        </div>
      	
  	  </div>			
    );
  }  
}

export default EmailSetting;