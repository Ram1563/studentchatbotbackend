// controllers/authController.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Dean = require('../models/Dean');

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
  user.token = token;
  user.save();
  return token;
};

exports.studentLogin = async (req, res) => {
  const { university_id, password } = req.body;

  try {
    const student = await Student.findOne({ where: { university_id, password } });

    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(student);

    return res.json({ token });
  } catch (error) {
    console.error('Error during student login:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

exports.deanLogin = async (req, res) => {
  const { university_id, password } = req.body;

  try {
    const dean = await Dean.findOne({ where: { university_id, password } });

    if (!dean) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(dean);

    return res.json({ token });
  } catch (error) {
    console.error('Error during dean login:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

exports.studentBLogin = async (req, res) => {
  const { university_id, password } = req.body;

  try {
    const student = await Student.findOne({ where: { university_id, password } });

    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(student);

    return res.json({ token });
  } catch (error) {
    console.error('Error during student B login:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
