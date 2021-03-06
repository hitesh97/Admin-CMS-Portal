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
import AvatarEditor from 'react-avatar-editor';

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
const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
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
        message: 'Please provide degree College.'
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
    thumb_img: "",
    thumb_scale: 1.2,
    user_image: "",
    mail_html: "",
    validation: this.validator.valid(),
    genderOps1:"",
    genderOps2:"",
    genderOps3:"",
    is_mail: "No"
    };
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

  onYesNoSelect = (e) => {
    this.submitted = true;
    
    const state = this.state;
    state.is_mail = e.value;
    
    this.setState(state);
	  this.props = state;
  }

  onSubmit = (e) => {
    e.preventDefault();    
    const validation = this.validator.validate(this.state);    
    this.submitted = true;
    if(validation.isValid){
      var self = this;
      document.getElementById('userImg').remove();
      document.getElementById('welcomeAbroadBox').setAttribute("align", 'center');
      this.state.mail_html = document.getElementById('welcomeAbroadBox').outerHTML;
      const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image, gender, mail_html, is_mail} = this.state;
      const params = {   "url":ROOT_URL+'employee'+this.isUpdate,
                          "method":"post",
                          "payload":{ email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image, gender, mail_html, is_mail  }
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
      context.arc(528, 150, 86, 0, Math.PI * 2, false);  
      //draw a image
      //context.globalCompositeOperation='source-atop';
      context.clip();
      context.drawImage(userImg, 443, 60);
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
     self.state.thumb_img = e.target.result;
    img.onload = function () {
      myCan.id = "myTempCanvas";
      myCan.width = 175;
      myCan.height = 175;

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

  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()
    }
  }

  setEditorRef = (editor) => this.editor = editor

  handleSave = data => {
    let self = this;
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    self.mergeImages(img);     
  }

  handleScale = e => {
    const thumb_scale = parseFloat(e.target.value);
    this.setState({ thumb_scale });
  }

  getPreviewThumb() {
    let thumb = "";

    if(this.state.thumb_img) {
      thumb = (
        <div>
          <div>
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.thumb_img}
              width={175}
              height={175}
              borderRadius={100}
              border={20}
              scale={this.state.thumb_scale}
            />
          </div>
          <div>
            <label>Zoom:</label>
            <input
              name="thumb_scale"
              type="range"
              onChange={this.handleScale}
              min="0.1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </div>
          <button type="button" onClick={this.handleSave} className="btn btn-success btn-block col-md-6">Preview</button>
        </div>
      );
    }
    
    return thumb;    
  }

  render() {
    const { email, first_name, last_name, team, location, designation, supervisor, previous_companies, degree, degree_stream, degree_colledge, created_date,updated_date, user_image, gender, is_mail } = this.state;

    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                        this.state.validation // otherwise just use what's in state
    
    return (
      <div className="row mb-5">
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
            <div>
                <label for="previous_companies">Previous Companies:</label>
                <textArea className="form-control" name="previous_companies" onChange={this.onChange} placeholder="Previous Companies" cols="80" rows="3" value={previous_companies}></textArea>
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
                  <label for="degree_colledge">Degree College:</label>
                  <input className="form-control" name="degree_colledge" onChange={this.onChange} placeholder="Degree College" value={degree_colledge} />
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
          <div className="form-group">
            {this.getPreviewThumb()}
          </div>
          <div className="form-group">
            <div>
              <label for="publisher">For mailing (Select 'Yes'):</label>
              <Dropdown options={yesNoOptions} name="is_mail" onChange={this.onYesNoSelect} value={is_mail} placeholder="Select" />
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