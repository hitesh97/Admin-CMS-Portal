import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import FormValidator from './FormValidator';
import AxiosBuilder from './AxiosBuilder';
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
    this.axios = new AxiosBuilder({});
    
    this.validator = new FormValidator([
      {
        field: 'from',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide from email address.'
      },
      { 
        field: 'to',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide to email address.'
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
      type: "EMAIL_SETTING",
      validation: this.validator.valid()   
    };

    this.submitted = false;
    this.getEmailSetting();
    
  }

  getEmailSetting() {
    var self = this;  
    const params = {   "url":ROOT_URL+'commonSetting/'+self.state.type,
                          "method":"get",
                          "payload":{}
                    };
      self.axios.callAxios(params,function(result){
        if(result && result && result.req_json) {
          result = JSON.parse(result.req_json);
          self.setState(result);
        }
        else {
          console.warn("No record found!!")
        }             
      });    
  }

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
        const { from, to, subject_text, type } = this.state;
        var self = this;  
        const params = {    "url":ROOT_URL+'commonSetting/'+this.isUpdate,
                            "method":"post",
                            "payload":{ from, to, subject_text, type }
                      };
        self.axios.callAxios(params,function(result){
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
    
    return (
      <div className="row mb-6">
        <div className="col-md-6">
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
          <button onClick={this.onSubmit} className="btn btn-success">Submit</button>                
        </form>
            </div>
          </div>				
        </div>
      	
  	  </div>			
    );
  }  
}

export default EmailSetting;