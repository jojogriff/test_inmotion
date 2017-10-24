import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import logo from '../../assets/images/logo.svg';
import '../../assets/css/App.css';
import * as actions from '../../actions';

/**
 *  This is the high level entry point of the application.
 **/
class About extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>About</h2>
        </div>
        <p className="App-intro">
          This app is written in react.js. It utilizes one way data flow with redux
          and manages a client side persistence layer using `redux persists`. Under the
          hood it really just uses localStorage to save the state of the store every time
          it gets updated by the reducers. Bootstrap is the client side UI library.
        </p>
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

About.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
