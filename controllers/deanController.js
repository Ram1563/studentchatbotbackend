// controllers/deanController.js
const { Op } = require('sequelize');
const Session = require('../models/Session');
const Student = require('../models/Student');
const Dean = require('../models/Dean');

exports.fetchPendingSessions = async (req, res) => {
  try {
    const deanId = req.user.id;

    const pendingSessions = await Session.findAll({
      where: {
        is_booked: true,
        dean_id: deanId
      },
      include: {
        model: Student,
        attributes: ['university_id']
      }
    });

    const formattedSessions = pendingSessions.map(session => ({
      student_name: session.Student.university_id,
      slot_details: `${session.start_time} to ${session.end_time}`
    }));

    return res.json({ pending_sessions: formattedSessions });
  } catch (error) {
    console.error('Error fetching pending sessions:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

exports.fetchAllPendingSessions = async (req, res) => {
  try {
    const pendingSessions = await Session.findAll({
      where: { is_booked: true },
      include: [
        {
          model: Student,
          attributes: ['university_id'],
          as: 'Student'
        }
      ]
    });

    const formattedSessions = pendingSessions.map(session => ({
      student_name: session.Student.university_id,
      slot_details: `${session.start_time} to ${session.end_time}`
    }));

    return res.json({ pending_sessions: formattedSessions });
  } catch (error) {
    console.error('Error fetching all pending sessions for dean:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

exports.fetchDeanPendingSessionsAfterSlotTime = async (req, res) => {
  const deanId = req.user.id;

  try {
    const pendingSessions = await Session.findAll({
      where: {
        is_booked: true,
        dean_id: deanId,
        end_time: { [Op.lte]: new Date() }
      },
      include: {
        model: Student,
        attributes: ['university_id']
      }
    });

    const formattedSessions = pendingSessions.map(session => ({
      student_name: session.Student.university_id,
      slot_details: `${session.start_time} to ${session.end_time}`
    }));

    return res.json({ pending_sessions: formattedSessions });
  } catch (error) {
    console.error('Error fetching dean pending sessions after slot time:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
