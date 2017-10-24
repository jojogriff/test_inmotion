import React, { PropTypes } from 'react';

const RegisterForm = ({state, updateField, submitForm}) => {
  return (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="form-control" value={state.email} onChange={updateField} placeholder="Email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="form-control" value={state.password} onChange={updateField} placeholder="Password" required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

RegisterForm.propTypes = {
  state: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default RegisterForm;
