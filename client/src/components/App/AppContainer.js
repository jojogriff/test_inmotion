import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../assets/css/App.css';
import * as actions from '../../actions';

/**
 *  This is the high level entry point of the application.
 **/
 class App extends Component {
   render() {
     const { logoutUser } = this.props.actions;
     const { loggedIn } = this.props.auth;
     return (
       <div className="App">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Movie Collection</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {loggedIn && <li><Link to="about">About</Link></li>}
                {loggedIn && <li><Link to="movies">Movies</Link></li>}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {loggedIn && <li onClick={logoutUser}><Link>Logout</Link></li>}
              </ul>
            </div>
          </div>
        </nav>
        <div style={{marginTop: "50px"}}>
          {this.props.children}
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

App.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
