import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import FormValidator from './FormValidator';
import AxiosBuilder from './AxiosBuilder';
import WelcomAboard from './WelcomAboard';
import DatePicker from 'react-datepicker';
import moment from 'moment'; 
import 'react-datepicker/dist/react-datepicker.css';
import ImageUpload from './ImageUpload';
import {
  ROOT_URL
} from './../actions/types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import watermark from 'watermarkjs';

const locationOptions = [
  { value: 'Indore', label: 'Indore' },
  { value: 'Bangaluru', label: 'Bangaluru' },
  { value: 'Noida', label: 'Noida' },
  { value: 'Gurgoan', label: 'Gurgoan' }
];
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];


class Create extends Component {

  constructor(props) {
    super(props);
    this._eid = this.props.params.id;
    this.isUpdate = (this._eid ? "/"+this._eid : "");
    this.axios = new AxiosBuilder({});
    
    this.validator = new FormValidator([
      {
        field: 'first_name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide first name.'
      },
      { 
        field: 'last_name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide last name.'
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide an email address.'
      },
      { 
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
      },      
      { 
        field: 'team',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide team.'
      },
      { 
        field: 'gender',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide gender.'
      },
      { 
        field: 'location',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide location.'
      },
      { 
        field: 'designation',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide designation.'
      },
      { 
        field: 'supervisor',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide supervisor.'
      },
      { 
        field: 'previous_companies',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide previous companies.'
      },
      { 
        field: 'degree',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide degree.'
      },
      { 
        field: 'degree_stream',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide degree stream.'
      },
      { 
        field: 'degree_colledge',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide degree colledge.'
      },
      { 
        field: 'created_date',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide joinning date.'
      },
      { 
        field: 'user_image',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide user image.'
      }
    ]);    
    
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
	  created_date: moment().format("LL"),
    updated_date: "" ,    
    user_image: "",
    mail_html: "",
    validation: this.validator.valid(),
    genderOps1:"",
    genderOps2:"",
    genderOps3:""
    };
    console.log(moment(),"moment()");
    this.submitted = false;
    
  };

  componentDidMount(){
    var self = this;
    if(this._eid){
      const params = {   "url":ROOT_URL+'employee'+this.isUpdate,
                         "method":"get",
                         "payload":{}
                    };
      this.axios.callAxios(params,function(result){
        result.created_date = moment(result.created_date).format("LL");
        result.genderOps1 = (result.gender=="Male" ? "He" : "She");
        result.genderOps2 = (result.gender=="Male" ? "His" : "Her");
        result.genderOps3 = (result.gender=="Male" ? "him" : "her");        
        self.setState(result);
        self.props = result;
      });      
    }    
    const emailParams = {
                         "url": ROOT_URL+'employee/getCommonSetting/EMAIL_SETTING',
                         "method":  "get",
                         "payload": {}
                        };    
    this.axios.callAxios(emailParams,function(result){});                 
            
  };

  onChange = (e) => {
    this.submitted = true;
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
	  this.props = state;
  }

  onDateChange = (date) => {
    this.submitted = true;
    const state = this.state;
    state.created_date = moment(date).format("LL");
    this.setState(state);
	  this.props = state;
  }

  onSelect = (e) => {
    this.submitted = true;
    
    const state = this.state;
    if(e.value=="Male" || e.value=="Female"){
      state.gender = e.value;
      state.genderOps1 = (e.value=="Male" ? "He" : "She");
      state.genderOps2 = (e.value=="Male" ? "His" : "Her");
      state.genderOps3 = (e.value=="Male" ? "him" : "her");
    }else{
      state.location = e.value;
    }
    
    this.setState(state);
	  this.props = state;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);    
    this.submitted = true;
    if(validation.isValid){
      var self = this;
      this.state.mail_html = document.getElementById('welcomeAbroadBox').outerHTML;
      const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image, gender, mail_html} = this.state;
      const params = {   "url":ROOT_URL+'employee'+this.isUpdate,
                          "method":"post",
                          "payload":{ email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image, gender, mail_html  }
                    };
      this.axios.callAxios(params,function(result){
        self.props.history.push("/listing");
      });
    }else{
      this.setState(this.state);
      return false;
    }    
  }

  mergeImages(img){
    watermark(['../images/welcomeImage.png', img])
    .dataUrl(function (headerImg, userImg) {
      var context = headerImg.getContext('2d');
      context.save();
      //draw a circle
      context.beginPath();
      context.arc(520, 140, 100, 0, Math.PI * 2, true);
      context.fillStyle = "#ffffff";
      context.fill();
      context.strokeStyle="#ffffff";
      context.stroke();
      //draw a image
      context.globalCompositeOperation='source-atop';
      context.drawImage(userImg, 442, 85);
      //context.globalCompositeOperation='destination-over';
      context.restore();
      
      return headerImg;
    })
    .then(url => {
      this.setState({user_image: url});
    });
  }

  getThumbnail(e, self) {
    var myCan = document.createElement('canvas');
    var img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      myCan.id = "myTempCanvas";
      myCan.width = 160;
      myCan.height = 160;

      if (myCan.getContext) {
        var cntxt = myCan.getContext("2d");
        cntxt.drawImage(img, 0, 0, myCan.width, myCan.height);
        var dataURL = myCan.toDataURL(); 

        if (dataURL != null && dataURL != undefined) {
            var nImg = document.createElement('img');
            nImg.src = dataURL;
            self.mergeImages(nImg);                    
        }
        else
            alert('unable to get context');
      }
    } 
  }

  _handleImageChange(e) {
    var self = this;    
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = function (e) { self.getThumbnail(e, self) };
    let file = e.target.files[0]; 
    reader.readAsDataURL(file);
  }

  render() {
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image, gender } = this.state;

    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                        this.state.validation // otherwise just use what's in state
    
    return (
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="panel panel-default">            
            <div className="panel-body">            
              <form onSubmit={this.onSubmit}>
              

  			  <div className="form-group" >
              <div className={validation.first_name.isInvalid && 'has-error'}>
                  <label for="title">First Name:</label>
                  <input type="text" className="form-control" name="first_name" value={first_name} onChange={this.onChange} placeholder="First Name" />
                  <span className="help-block">{validation.first_name.message}</span>
              </div>    
          </div>
  			  <div className="form-group" >
              <div className={validation.last_name.isInvalid && 'has-error'}>  
                  <label for="title">Last Name:</label>
                  <input type="text" className="form-control" name="last_name" value={last_name} onChange={this.onChange} placeholder="Last Name" />
                  <span className="help-block">{validation.last_name.message}</span>
                </div>
          </div>  
  			  <div className="form-group" >
            <div className={validation.email.isInvalid && 'has-error'}>
                  <label for="isbn">Email:</label>
                  <input type="text" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
                  <span className="help-block">{validation.email.message}</span>
            </div>    
          </div>
  			  <div className="form-group">
            <div className={validation.gender.isInvalid && 'has-error'}>  
                  <label for="author">Gender:</label>
  				        <Dropdown options={genderOptions} name="gender" onChange={this.onSelect} value={gender} placeholder="Select gender" />
                  <span className="help-block">{validation.gender.message}</span>
              </div>    	
          </div>
          <div className="form-group">
            <div className={validation.team.isInvalid && 'has-error'}>
                <label for="author">Team:</label>
                <input type="text" className="form-control" name="team" value={team} onChange={this.onChange} placeholder="Team" />
                <span className="help-block">{validation.team.message}</span>
            </div>                  
          </div>  
          <div className="form-group">
            <div className={validation.location.isInvalid && 'has-error'}>
                <label for="location">Location:</label>
                <Dropdown options={locationOptions} name="location" onChange={this.onSelect} value={location} placeholder="Select location" />
                <span className="help-block">{validation.location.message}</span>
            </div>         
  			  </div>
          <div className="form-group">
            <div className={validation.designation.isInvalid && 'has-error'}>
                <label for="degree">Designation:</label>
                <input className="form-control" name="designation" onChange={this.onChange} placeholder="Designation" value={designation} />
                <span className="help-block">{validation.designation.message}</span>
            </div>                  
          </div>
  			  <div className="form-group">
            <div className={validation.previous_companies.isInvalid && 'has-error'}>
                <label for="previous_companies">Previous Companies:</label>
                <textArea className="form-control" name="previous_companies" onChange={this.onChange} placeholder="Previous Companies" cols="80" rows="3" value={previous_companies}></textArea>
                <span className="help-block">{validation.previous_companies.message}</span>
            </div>              
          </div>
  			  <div className="form-group">
            <div className={validation.degree.isInvalid && 'has-error'}>
                <label for="degree">Degree:</label>
                <input className="form-control" name="degree" onChange={this.onChange} placeholder="Degree" value={degree} />
                <span className="help-block">{validation.degree.message}</span>
            </div>                  
          </div>				
  			  <div className="form-group">
            <div className={validation.degree_stream.isInvalid && 'has-error'}>
                <label for="degree_stream">Degree Stream:</label>
                <input className="form-control" name="degree_stream" onChange={this.onChange} placeholder="Degree Stream" value={degree_stream} />
                <span className="help-block">{validation.degree_stream.message}</span>
            </div>                  
          </div>
  			  <div className="form-group">
            <div className={validation.degree_colledge.isInvalid && 'has-error'}>
                  <label for="degree_colledge">Degree Colledge:</label>
                  <input className="form-control" name="degree_colledge" onChange={this.onChange} placeholder="Degree Colledge" value={degree_colledge} />
                <span className="help-block">{validation.degree_colledge.message}</span>
            </div>                  
          </div>	
          <div className="form-group">
            <div className={validation.created_date.isInvalid && 'has-error'}>
              <label for="published_date">Joining Date:</label>				
              <DatePicker className="form-control" name="created_date" dateFormat="LL" onChange={this.onDateChange} value={created_date} placeholder="Joining Date" />
              <span className="help-block">{validation.created_date.message}</span>
            </div>              
          </div>
          <div className="form-group">
            <div className={validation.supervisor.isInvalid && 'has-error'}>
              <label for="publisher">Supervisor:</label>
              <input type="text" className="form-control" name="supervisor" value={supervisor} onChange={this.onChange} placeholder="Supervisor" />
              <span className="help-block">{validation.supervisor.message}</span>
            </div>            
          </div>
          <div className="form-group">
            <div className={validation.user_image.isInvalid && 'has-error'}>
              <label for="publisher">User Picture:</label>
              <ImageUpload onChange={(e)=>this._handleImageChange(e)}/>
              <span className="help-block">{validation.user_image.message}</span>
            </div>            
          </div>
          <button onClick={this.onSubmit} className="btn btn-success btn-block">Submit</button>                
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