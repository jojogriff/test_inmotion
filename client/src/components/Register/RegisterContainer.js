import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import logo from '../../assets/images/logo.svg';
import '../../assets/css/App.css';
import RegisterForm from './RegisterForm';
import * as actions from '../../actions';

/**
 *  This is the high level entry point of the application.
 **/
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.updateField = this.updateField.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  updateField(event) {
    let newState = Object.assign({}, this.state);
    const name = event.target.name;
    newState[name] = event.target.value;
    this.setState(newState);
  }
  submitForm(event) {
    event.preventDefault();
    this.props.actions.registerUser(this.state);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Register</h2>
        </div>
        <div className="container">
          <RegisterForm updateField={this.updateField} submitForm={this.submitForm} state={this.state} />
          <p className="App-intro"> Already have an account? <Link to="login">Login here</Link> </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

Register.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
