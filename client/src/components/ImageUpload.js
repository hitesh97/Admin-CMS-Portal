import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  render() {
    let self = this;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      <div className="previewComponent">
        <input className="fileInput" 
          type="file" 
          id="user_image"
          name="user_image"
          multiple={this.props.multiple ? this.props.multiple : false}
          onChange={(e)=>this.props.onChange(e)} />    
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}


