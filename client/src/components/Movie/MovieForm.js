import React, { PropTypes } from 'react';

const MovieForm = ({state, updateField, submitForm}) => {
  return (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="posterImage">Poster URL</label>
        <input type="url" name="posterImage" className="form-control" value={state.posterImage} onChange={updateField} placeholder="https://someimage.com/images/one.jpg" required />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" className="form-control" value={state.title} onChange={updateField} placeholder="The Boondock Saints" required />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input type="text" name="year" className="form-control" value={state.year} onChange={updateField} placeholder="1993" required />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input type="text" name="genre" className="form-control" value={state.genre} onChange={updateField} placeholder="Drama/Suspense/Action" required />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <input type="text" name="rating" className="form-control" value={state.rating} onChange={updateField} placeholder="6.7/10" required />
      </div>
      <div className="form-group">
        <label htmlFor="actors">Actors</label>
        <input type="text" name="actors" className="form-control" value={state.actors} onChange={updateField} placeholder="Name 1,Name 2,Name 3" required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

MovieForm.propTypes = {
  state: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default MovieForm;
