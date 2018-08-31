import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import FormValidator from './FormValidator';
import AxiosBuilder from './AxiosBuilder';
import BulkAboard from './BulkAboard';
import ImageUpload from './ImageUpload';
import {
  ROOT_URL
} from './../actions/types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import watermark from 'watermarkjs';
import AvatarEditor from 'react-avatar-editor';

const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];


class BulkHiringCreate extends Component {

  constructor(props) {
    super(props);

    this.removeImg = this.removeImg.bind(this);
    this._eid = this.props.params.id;
    this.isUpdate = (this._eid ? "/"+this._eid : "");
    this.axios = new AxiosBuilder({});
    
    this.validator = new FormValidator([      
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide name.'
      },
      { 
        field: 'user_image',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please provide user image.'
      }
    ]);    
    
    this.state = {
    name: "",  
    selected_img: "",
    thumb_img_name: "",
    thumb_img: "",
    thumb_scale: 1.2,
    user_image_name: [],
    user_image: [],
    mail_html: "",
    validation: this.validator.valid(),
    is_mail: "No"
    };
    this.submitted = false;
    
  };

  componentDidMount(){
    var self = this;
    var params = {};

    if(this._eid){
      params = {   "url":ROOT_URL+'bulkHiring/bulkCreate'+this.isUpdate,
                         "method":"get",
                         "payload":{}
                    };      
      this.axios.callAxios(params,function(result){
        if(result.user_image)
          self.setState({name: result.name, user_image: result.user_image});
      }); 
    } 

    self.getCommonSetting();
  }

  getCommonSetting() {
   const params = {
                         "url": ROOT_URL+'bulkHiring/getCommonSetting/EMAIL_SETTING',
                         "method":  "get",
                         "payload": {}
                        };                       
     
    this.axios.callAxios(params,function(result){});
  }

  onChange = (e) => {
    this.submitted = true;
    const state = this.state;
    state[e.target.name] = e.target.value;
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
      Array.from(document.getElementsByClassName("desktop-user-imgs"))
      .forEach(element => element.remove());
      document.getElementById('bulkAbroadBox').setAttribute("align", 'center');
      this.state.mail_html = document.getElementById('bulkAbroadBox').outerHTML;
      const {name, user_image, mail_html, is_mail} = this.state;
      const params = {   "url":ROOT_URL+'bulkHiring/bulkCreate'+this.isUpdate,
                          "method":"post",
                          "payload":{ name, user_image, mail_html, is_mail  }
                    };
      this.axios.callAxios(params,function(result){
        self.props.history.push("/bulk-listing");
      });
    }else{
      this.setState(this.state);
      return false;
    }    
  }

  mergeImages(img){
    watermark([img])
    .dataUrl(function (userImg) {
      return userImg;
    })
    .then(url => {
      let selectedIdx = this.state.user_image.indexOf(this.state.selected_img);
      if(selectedIdx > -1 ) {
        this.state.user_image[selectedIdx] = url;
      }
      else {
        this.state.user_image.push(url);
      }     
      
      this.setState({});
    });
  }

  getThumbnail(e, file, self) {
    var myCan = document.createElement('canvas');
    var img = new Image();
    var userName =  (file && file.name) ? file.name.split(".")[0] : file;
    var imgSrc = (e && e.target) ? e.target.result : e;

    img.src = imgSrc;
    //self.state.thumb_img = imgSrc;
    img.onload = function () {
      myCan.id = "myTempCanvas";
      myCan.width = 160;
      myCan.height = 160;

      if (myCan.getContext) {
        var cntxt = myCan.getContext("2d");        
        cntxt.drawImage(img, 0, 10, myCan.width-30, myCan.height-30);
        cntxt.globalAlpha = 1;
        cntxt.fillStyle = '#000';
        cntxt.font = 'bold 12px Calibri';
        cntxt.textAlign='center';
        
        cntxt.fillText(userName, (myCan.width-30)/2, myCan.height-5);
        var dataURL = myCan.toDataURL(); 
        self.state.user_image_name.push({label: userName, value: imgSrc});

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
    var bulkInput = document.getElementById("user_image");

    if(bulkInput.files.length > 0) {
      for(let i=0; i<bulkInput.files.length; i++) {
        let reader = new FileReader();
        reader.onload = function (e) { self.getThumbnail(e,file, self) };
        let file = bulkInput.files[i]; 
        reader.readAsDataURL(file);
      }      
    }
    
  }

  removeImg(index) {
    this.state.user_image.splice(index, 1);
    this.state.user_image_name.splice(index, 1);    
    this.setState({});
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

  handleSave = (data) => {
    let self = this;
    const img = this.editor.getImageScaledToCanvas().toDataURL(); 
    self.getThumbnail(img, self.state.thumb_img_name, self);  
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
              width={130}
              height={130}
              borderRadius={0}
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

  onThumbChange= e => {
    this.setState({ thumb_img_name: e.label , thumb_img: e.value, selected_img: e.value });
  }

  render() {
    const { name, user_image_name, user_image, is_mail } = this.state;
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
              <div className={validation.name.isInvalid && 'has-error'}>
                  <label for="title">Name:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                  <span className="help-block">{validation.name.message}</span>
              </div>    
          </div>
          <div className="form-group">
            <div className={validation.user_image.isInvalid && 'has-error'}>
              <label for="publisher">User Picture:</label>
              <ImageUpload onChange={(e)=>this._handleImageChange(e)} multiple={true} />
              <span className="help-block">{validation.user_image.message}</span>
            </div>            
          </div>
          <div className="form-group">
            <div>
              <label for="publisher">All User Image:</label>
              <Dropdown options={user_image_name} name="user_image_name" onChange={this.onThumbChange} placeholder="Select User Image" />
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
      	  <BulkAboard data={this.state} removeImg={this.removeImg}/>
      	</div>
  	  </div>			
    );
  }  
}

export default BulkHiringCreate;