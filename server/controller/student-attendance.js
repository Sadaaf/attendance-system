const StudentAttendance = require("../models/StudentAttendance");
const {
  getAdminAttendanceById,
  getRunningAttendance,
} = require("../service/admin-attendance");
const error = require("../utils/error");

const getAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminAttendance = await getAdminAttendanceById(id);
    if (!adminAttendance) throw error("Invalid attendance ID", 400);
    if (adminAttendance.status == "COMPLETED")
      throw error("Attendance already completed", 400);
    let attendance = await StudentAttendance.findOne({adminAttendance: id, user: req.user._id})
    if(attendance) throw error('Already attended', 400)
    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });
    await attendance.save();
    return res.status(203).json(attendance);
  } catch (e) {
    next(e);
  }
};

const getAttendanceStatus = async (_req, res, next) => {
  try {
    const attendanceStatus = await getRunningAttendance()
    if(!attendanceStatus) throw error('No running attendance found', 400)
    return res.status(200).json(attendanceStatus);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
