

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   // State to store form data
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // State to store form errors
//   const [errors, setErrors] = useState({});

//   // State to track form submission
//   const [submitted, setSubmitted] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Validate form data
//   const validate = (data) => {
//     const validationErrors = {};
//     if (!data.email) {
//       validationErrors.email = 'Email is required';
//     }
//     if (!data.password) {
//       validationErrors.password = 'Password is required';
//     } else if (data.password.length < 6) {
//       validationErrors.password = 'Password must be at least 6 characters long';
//     }
//     if (data.confirmPassword !== data.password) {
//       validationErrors.confirmPassword = 'Passwords do not match';
//     }
//     return validationErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate(formData);

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         // Send form data to the server
//         const response = await axios.post('http://localhost:5000/api/users/signup', formData);
//         console.log('Response:', response.data);
//         setSubmitted(true);
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         setErrors({ server: 'Signup failed. Please try again.' });
//       }
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <h2 className="text-center mb-4">Sign Up</h2>
//           {submitted && <div className="alert alert-success">Sign up successful!</div>}
//           {errors.server && <div className="alert alert-danger">{errors.server}</div>}

//           <form onSubmit={handleSubmit} noValidate>
//             {/* Email Field */}
//             <div className="form-group mb-3">
//               <label htmlFor="email">Email address</label>
//               <input
//                 type="email"
//                 className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//               />
//               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//             </div>

//             {/* Password Field */}
//             <div className="form-group mb-3">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//               />
//               {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="form-group mb-3">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 type="password"
//                 className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//               />
//               {errors.confirmPassword && (
//                 <div className="invalid-feedback">{errors.confirmPassword}</div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="btn btn-primary btn-block">
//               Sign Up
//             </button>
//           </form>

//           {/* Login Link */}
//           <div className="text-center mt-3">
//             <p>Already have an account? <Link to="/login" className="btn btn-link">Login</Link></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup', formData);
        setSuccessMessage(response.data.message);
        setFormData({ email: '', password: '' }); // Clear form data
      } catch (error) {
        setErrors({ server: error.response.data.message });
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
          <h2 className="text-center mb-4">Sign Up</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errors.server && <div className="alert alert-danger">{errors.server}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login" className="btn btn-link">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

