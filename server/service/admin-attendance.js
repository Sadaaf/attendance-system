const AdminAttendance = require("../models/AdminAttendance");
const { addMinutes, isAfter } = require("date-fns");
const error = require("../utils/error");

const createAdminAttendance = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (running) throw error("An attendance is already running", 400);
  const attendance = new AdminAttendance({});
  return attendance.save();
};

const getAdminAttendanceById = (id) => {
  return AdminAttendance.findById(id)
}

const getRunningAttendance = () => {
  return AdminAttendance.findOne({ status: "RUNNING" });
};

module.exports = {
  createAdminAttendance,
  getRunningAttendance,
  getAdminAttendanceById,
};
