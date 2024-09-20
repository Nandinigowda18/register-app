import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', formData);
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setSubmitted(true);
          navigate('/');
        } else {
          setErrors({ server: 'Login failed. Please try again.' });
        }
      } catch (error) {
        if (error.response) {
          setErrors({ server: DOMPurify.sanitize(error.response.data.message) }); // Sanitize the error message
        } else {
          setErrors({ server: 'Network error. Please try again.' });
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validate = (data) => {
    const validationErrors = {};
    if (!data.email) {
      validationErrors.email = 'Email is required';
    }
    if (!data.password) {
      validationErrors.password = 'Password is required';
    }
    return validationErrors;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Login</h2>
          {submitted && <div className="alert alert-success">Login successful! Redirecting...</div>}
          {errors.server && <div className="alert alert-danger" dangerouslySetInnerHTML={{ __html: errors.server }} />}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/signup" className="btn btn-link">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

