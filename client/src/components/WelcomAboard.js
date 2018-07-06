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
			}
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

  getPreviousCompanies() {
	  let previousCompaniesContent = "";

	  if(this.props.data.previous_companies) {
		  previousCompaniesContent = (
			<div>                
				<p>{this.props.data.genderOps2} previous experience was with {this.props.data.previous_companies}.</p>
			</div>
		  );
	  }
	  return previousCompaniesContent;
  }

  isVowel(x){
		let result;

		if(x.toUpperCase() == "A" || x.toUpperCase() == "E" || x.toUpperCase() == "I" || x.toUpperCase() == "O" || x.toUpperCase() == "U" ) {
			result = true;
		}
		else{
			result = false;
		}

		return result;
	}

  getDesignation() {
	  let designationContent = "";


	  if(this.props.data.designation) {
		  if(this.isVowel(this.props.data.designation.trim().charAt(0))) {
			  designationContent = (
				<span>
				an {this.props.data.designation}
				</span>
			  )
		  }
		  else {
			  designationContent = (
				<span>
				a {this.props.data.designation}
				</span>
			  )
		  }		  
	  }

	  return designationContent;
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
					            <img id="userImg" src={this.props.data.user_image ? this.props.data.user_image : BASE_URL+"/images/welcomeImage.png"} className="welcomeImage" alt=" " onError={(e)=>{e.target.style.display = "none"}}  />
					            <img className="welcomeImage" src={"cid:"+this.props.data.email} alt=" " onError={(e)=>{e.target.style.display = "none"}} />
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
							                <p>It is my pleasure to introduce <a style={{color: '#00b050'}} href={`mailto:${this.props.data.email}`}>{this.props.data.first_name} {this.props.data.last_name}</a>. {this.props.data.genderOps1} has joined the {this.props.data.team} team at {this.props.data.location} as {this.getDesignation()} and will work with {this.props.data.supervisor}.</p>
							            </div>
										{this.getPreviousCompanies()}							            
							            <div>               
							                <p>{this.props.data.first_name} earned a {this.props.data.degree} degree in {this.props.data.degree_stream} from {this.props.data.degree_colledge}.
							                </p>
							            </div>
							            <div>
							                <p>Join me in welcoming {this.props.data.genderOps3} and wishing {this.props.data.genderOps3} the very best in {this.props.data.genderOps2.toLowerCase()} new assignment.</p>
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

export default WelcomAboard;