import React, { useState } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const Navigate = useNavigate()
  const [formValues, setFormValues] = useState<LoginFormValues>({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState<Partial<LoginFormValues>>({});
  const [message, setMessage] = useState<string>('');

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await AuthService.login(formValues);
        setMessage('Login successful');
        localStorage.setItem('token', response.data.data.token);
        Navigate('/')
      } catch (error) {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                    value={formValues.username}
                    onChange={handleChange}
                  />
                  {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-2">Login</button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
