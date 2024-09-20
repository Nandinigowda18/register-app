

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './Signup'; // Ensure this path is correct
// import Login from './Login';   // Ensure this path is correct
// import Home from './Home';     // Ensure this path is correct (your home component)

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />  {/* Home route */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup'; // Ensure this path is correct
import Login from './Login';   // Ensure this path is correct
import Home from './Home';     // Ensure this path is correct
import ConfirmEmail from './ConfirmEmail'; // New route for email confirmation
import ProtectedRoute from './ProtectedRoute'; // New route for protected areas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm/:token" element={<ConfirmEmail />} /> {/* Email confirmation route */}
        <Route path="/protected" element={<ProtectedRoute />} /> {/* Example protected route */}
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
