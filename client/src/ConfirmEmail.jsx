// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ConfirmEmail = () => {
//   const { token } = useParams();
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmEmail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/confirm/${token}`);
//         setMessage(response.data.message);
//         setTimeout(() => {
//           navigate('/login'); // Redirect to login after confirmation
//         }, 3000);
//       } catch (error) {
//         setMessage(error.response.data.message);
//       }
//     };

//     confirmEmail();
//   }, [token, navigate]);

//   return (
//     <div className="container mt-5">
//       <div className="text-center">
//         <h2>{message}</h2>
//       </div>
//     </div>
//   );
// };

// export default ConfirmEmail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/confirm/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      } finally {
        setLoading(false); // Loading completed
      }
    };

    confirmEmail();
  }, [token, navigate]);

  // Redirect to login after a successful confirmation message
  useEffect(() => {
    if (!loading && message) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [loading, message, navigate]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        {loading ? <h2>Loading...</h2> : <h2>{message}</h2>}
      </div>
    </div>
  );
};

export default ConfirmEmail;
