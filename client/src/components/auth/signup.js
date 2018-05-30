import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.context.router.push('/listing');
    }
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <div className="container">
        <div className="card card-register mx-auto mt-5">
          <div className="card-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {this.renderAlert()}
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input {...email} className="form-control" type="email" aria-describedby="emailHelp" placeholder="Enter email" />
                {email.touched && email.error && <div className="error">{email.error}</div>}
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label for="exampleInputPassword1">Password</label>
                    <input {...password} className="form-control" type="password" placeholder="Password"/>
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input {...passwordConfirm} className="form-control" type="password" placeholder="Confirm Password"/>
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                  </div>
                </div>
              </div>
              <button action="submit" className="btn btn-primary btn-block">Sign up!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
           authenticated: state.auth.authenticated 
         };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
