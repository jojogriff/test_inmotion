import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import logo from '../../assets/images/logo.svg';
import '../../assets/css/App.css';
import MovieForm from './MovieForm';
import * as actions from '../../actions';

/**
 *  This is the high level entry point of the application.
 **/
class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePoster: '',
      title: '',
      genre: '',
      rating: '',
      actors: '',
      year: ''
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
    this.props.actions.newMovie(this.state, this.props.user);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>New Movie</h2>
        </div>
        <div className="container">
          <MovieForm updateField={this.updateField} submitForm={this.submitForm} state={this.state} />
          <p><Link to="movies" className="btn btn-default">Back</Link> </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

NewMovie.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMovie);
