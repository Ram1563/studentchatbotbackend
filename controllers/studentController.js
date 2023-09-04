// controllers/studentController.js
const Session = require('../models/Session');
const Student = require('../models/Student');

exports.fetchFreeSessionsForStudentB = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { is_booked: false }
    });

    const formattedSessions = sessions.map(session => ({
      session_id: session.id,
      start_time: session.start_time,
      end_time: session.end_time
    }));

    return res.json({ sessions: formattedSessions });
  } catch (error) {
    console.error('Error fetching free sessions for Student B:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

exports.studentBBookSession = async (req, res) => {
  const student = req.user;

  try {
    const session = await Session.findOne({ where: { id: req.body.session_id, is_booked: false } });

    if (!session) {
      return res.status(404).json({ message: 'Session not found or already booked' });
    }

    session.is_booked = true;
    session.StudentId = student.id;
    await session.save();

    return res.json({ message: 'Session booked successfully' });
  } catch (error) {
    console.error('Error booking session for Student B:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
