import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import {
  BASE_URL,
  ROOT_URL
} from './../actions/types';

const css = `
			body {
				font-family: Calibri, sans-serif;
				color: #3b3838;
			}
    		#bulkAbroadBox .custom-margin {
	            padding-bottom: 50px;
	        }
	        #bulkAbroadBox a {
	            color: #00b050;
	            text-decoration: underline;
	        }
	        #bulkAbroadBox p {
	            margin-top: 23px;
	        }
	        #bulkAbroadBox .custom-container {
	            position: relative;
	            background-color: #F2F2F2;
	            max-width: 840px;
	        }
	        #bulkAbroadBox .welcomeImage {
	            width:100%; 
	        }
	        #bulkAbroadBox *{
	            margin:0px;
	            padding: 0px;
	        }	        
	        #bulkAbroadBox .main-table{
				border-collapse: collapse;
				margin: 0 auto;
			}			
			#bulkAbroadBox .bulk-imgs-txt {
				font-size: 11px;
				text-align: center;
				display: block;
				font-weight: bold;
				display: none;
			}
			#bulkAbroadBox .clear {
				clear: both;
			}	
			#bulkAbroadBox .images-box {
				margin-top: 20px;
			}	
`;
class BulkAboard extends Component {

  constructor(props) {
   super(props);        
  }

  getBulkImages() {
	  var images = [];
	  var self = this;
	  var usersImg = this.props.data.user_image;
	  for(let i=0; i<usersImg.length; i++) {
		  images.push(<span className="bulk-imgs" align="left" onClick={self.props.removeImg.bind(this, i)}>		
				<img src={usersImg[i]} className="desktop-user-imgs" alt=" " onError={(e)=>{e.target.style.display = "none"}} />
				<img src={"cid:bulk-images-"+i} alt=" " onError={(e)=>{e.target.style.display = "none"}} />				
		 </span>)
	  }
	  return images;
  }
  
  render() {
    return (  	  
      <div id="bulkAbroadBox">		
		<style>{css}</style> 
		<table className="main-table" cellspacing="0" cellpadding="0" border="0" width="675">
			<tr>
				<td style={{backgroundColor: '#F2F2F2'}}> 
			        <div className="panel panel-default">
					 	<div className="container custom-container">
					        <div id="wimg">								
					            <img id="userImg" src={BASE_URL+"/images/header.png"} className="welcomeImage" alt=" " onError={(e)=>{e.target.style.display = "none"}}  />												            
					        </div>
					        <div className="custom-margin">
						        <table cellspacing="0" cellpadding="0" border="0">
									<tr>
										<td width="8%">
											&nbsp;
										</td>
										<td style={{backgroundColor: '#F2F2F2'}}>							            
							            <div>
							            	<p>Good day,</p>
							            </div>
							            <div>
							                <p>It is my pleasure to introduce {this.props.data.user_image ? this.props.data.user_image.length: 0} dynamic graduates who have joined us, to carve their path of success.</p>
							            </div>						            
							            <div>               
							                <p>We hope to provide them with a holistic and stimulating environment to foster growth and innovation.</p>
							            </div>
							            <div>
							                <p>Here are our budding Impros:</p>
							            </div>
										<div className="images-box">
											{this.getBulkImages()}
										</div>
										<div className="clear">
							                <p>Join me in welcoming them and wishing them the very best in their new assignment.</p>
							            </div>
							            <div>
							                <p>Thank you,<br/>
							                    Sanjeev
							                    <br/>
							                    <br/>
							                </p>
							            </div>
							            </td>
										<td width="8%">
											&nbsp;
										</td>
									</tr>
								</table>
				        	</div>
			    		</div>
			        </div>
				</td>
			</tr>
		</table>
      </div>
    );
  }
}

export default BulkAboard;