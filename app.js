// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const deanRoutes = require('./routes/deanRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

app.use(bodyParser.json());

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

app.use('/auth', authRoutes);
app.use('/dean', requireAuth, deanRoutes);
app.use('/student-b', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
