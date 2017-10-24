import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import MovieList from './MovieList';

import logo from '../../assets/images/logo.svg';
import '../../assets/css/App.css';
import * as actions from '../../actions';


// Class helpers
const actorsContainFilter = (actors, filter) => {
  for (var i = 0; i < actors.length; i++) {
    if (actors[i].indexOf(filter) >= 0) {
      return true;
    }
  }
  return false;
};
const movieContainsFilter = (movie, filter) => {
  return movie.title.indexOf(filter) >= 0
    || movie.genre.indexOf(filter) >= 0
    || movie.year.indexOf(filter) >= 0
    || movie.rating.indexOf(filter) >= 0
    || actorsContainFilter(movie.actors, filter)
};

/**
 *  This is the high level entry point of the application.
 **/
class AllMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ''
    };
    this.filterMovies = this.filterMovies.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentWillMount() {
    this.props.actions.getMovies();
  }
  filterMovies() {
    const { movies } = this.props.movies;
    if (this.state.searchFilter.length === 0) {
      return movies;
    }
    const filter = this.state.searchFilter;
    return movies.filter(movie => {
      return movieContainsFilter(movie, filter);
    });
  }
  updateSearch(event) {
    this.setState({searchFilter: event.target.value});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>All Movies</h2>
          <Link to="movies/new">New Movie</Link>
        </div>
        <div className="App-intro">
          <div className="container">
            <div className="form-group">
              <label htmlFor="search">Search</label>
              <input type="text" name="search" className="form-control" placeholder="Search" value={this.state.searchFilter} onChange={this.updateSearch} />
            </div>
            <hr />
            <MovieList movies={this.filterMovies()} user={this.props.auth.user} deleteMovie={this.props.actions.deleteMovie} />
          </div>
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

AllMovies.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMovies);
