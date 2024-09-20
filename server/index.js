const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// Middleware
// app.use(cors(
//   {
//   }
// ));
app.use(cors({
  origin: 'https://register-app-frontend.vercel.app/',  // specify the allowed origin
  methods: ['GET', 'POST'],  // specify allowed HTTP methods
  credentials: true  // enable credentials like cookies and authentication headers
}));

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/loginapp', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Create SMTP transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send confirmation email
const sendConfirmationEmail = async (userEmail, confirmationToken) => {
  const mailOptions = {
    from: '"Your App Name" <noreply@yourapp.com>',
    to: userEmail,
    subject: 'Please confirm your email',
    html: `<p>Click <a href="http://localhost:5173/confirm/${confirmationToken}">here</a> to confirm your email.</p>`,
  };

  try {
    console.log('Sending email to:', userEmail);
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isConfirmed: { type: Boolean, default: false },
});

// Create User model
const User = mongoose.model('User', userSchema);

// Route to handle user signup
app.post('/api/users/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      email,
      password: hashedPassword,
      isConfirmed: false,
    });

    await user.save();

    // Generate a simple token (not JWT) for email confirmation
    const confirmationToken = user._id; // Simplified, using user ID for email confirmation

    await sendConfirmationEmail(user.email, confirmationToken);

    res.status(200).json({ message: 'Signup successful! Please confirm your email.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Route to handle user email confirmation
app.get('/api/users/confirm/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user does not exist' });
    }

    if (user.isConfirmed) {
      return res.status(400).json({ message: 'Email already confirmed' });
    }

    user.isConfirmed = true;
    await user.save();

    res.status(200).json({ message: 'Email confirmed successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

// Route to handle user login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid login credentials' });
    }

    if (!user.isConfirmed) {
      return res.status(400).json({ message: 'Please confirm your email first' });
    }

    // Here, no session or JWT token is generated since you requested to avoid it.
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
