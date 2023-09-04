// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Dean = require('../models/Dean');

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const user = await Student.findOne({ where: { token } });

    if (!user) {
      const dean = await Dean.findOne({ where: { token } });

      if (!dean) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = dean;
      next();
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { requireAuth };
