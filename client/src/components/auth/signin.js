import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    if (this.props.authenticated) {
      this.context.router.push('/listing');
    }
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {this.renderAlert()}
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input {...email} className="form-control" type="email" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input {...password} className="form-control" type="password" placeholder="Password"/>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox"/> Remember Password</label>
                </div>
              </div>
              <button action="submit" className="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
           authenticated: state.auth.authenticated 
         };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
