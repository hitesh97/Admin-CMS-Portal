import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import {
  ROOT_URL
} from './../actions/types';

const css = `	
    		#welcomeAbroadBox .custom-margin {
	            padding-bottom: 50px;
	        }
	        #welcomeAbroadBox a {
	            color: #00b050;
	            text-decoration: underline;
	        }
	        #welcomeAbroadBox p {
	            margin-top: 23px;
	        }
	        #welcomeAbroadBox .custom-container {
	            position: relative;
	            background-color: #F2F2F2;
	            max-width: 840px;
	        }
	        #welcomeAbroadBox .welcomeImage {
	            width:100%; 
	        }
	        #welcomeAbroadBox *{
	            margin:0px;
	            padding: 0px;
	        }

	        #welcomeAbroadBox .userImage {
	            height: 207px;
	            width: 207px;
	            margin-top: -190px;
	            position: absolute;
	            top: 230px;
    			right: 41px;
				background:#FFFFFF;
	        }

	        #welcomeAbroadBox .welcome-heading {
	            font-size: 22px;
	        }
	        #welcomeAbroadBox table{
				border-collapse: collapse;
			}
`;
class WelcomAboard extends Component {

  constructor(props) {
   super(props);        
  }
  
  render() {
    return (  	  
      <div id="welcomeAbroadBox">		
		<style>{css}</style> 
		<table cellspacing="0" cellpadding="0" border="0" width="675">
			<tr>
				<td style={{backgroundColor: '#F2F2F2'}}> 
			        <div className="panel panel-default">
					 	<div className="container custom-container">
					        <div id="wimg">
					            <img id="userImg" src={this.props.data.user_image ? this.props.data.user_image : "http://localhost:8090/images/welcomeImage.png"} className="desktop-img welcomeImage"/>
					            <img src={"cid:"+this.props.data.email} alt=" " className="mail-img welcomeImage rounded-circle" />
					        </div>
					        <div className="custom-margin">
						        <table cellspacing="0" cellpadding="0" border="0">
									<tr>
										<td width="8%">
											&nbsp;
										</td>
										<td style={{backgroundColor: '#F2F2F2'}}>
							            <div>
							            	<b>WELCOME ABROAD</b>
							            </div>
							            <div>
							            	<p>Good day,</p>
							            </div>
							            <div>
							                <p>It is my pleasure to introduce <a style={{color: '#00b050'}} href={`mailto:${this.props.data.email}`}>{this.props.data.first_name} {this.props.data.last_name}</a>. He has joined the {this.props.data.team} team at {this.props.data.location} as an {this.props.data.designation} and will work with {this.props.data.supervisor}.</p>
							            </div>
							            <div>                
							                <p>His previous experience was with {this.props.data.previous_companies}.</p>
							            </div>
							            <div>               
							                <p>{this.props.data.first_name} earned a {this.props.data.degree} degree in {this.props.data.degree_stream} from {this.props.data.degree_colledge}.
							                </p>
							            </div>
							            <div>
							                <p>Join me in welcoming him and wishing him the very best in his new assignment.</p>
							            </div>
							            <div>
							                <p>Thank you,
							                    Sanjeev
							                    <br/>
							                    <br/>
							                </p>
							            </div>
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

export default WelcomAboard;