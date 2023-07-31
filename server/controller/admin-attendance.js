const {
  createAdminAttendance,
  getRunningAttendance,
} = require("../service/admin-attendance");
const { addMinutes, isAfter } = require("date-fns");
const error = require("../utils/error");

const getEnable = async (_req, res, next) => {
  try {
    const attendance = await createAdminAttendance();
    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};

const getStatus = async (_req, res, next) => {
  try {
    const running = await getRunningAttendance();
    if (!running) throw error("No attendance is running", 400);
    const timeElapsed = addMinutes(
      new Date(running.createdAt),
      running.timeLimit
    );
    if (isAfter(new Date(), timeElapsed)) {
      running.status = "COMPLETED";
      await running.save();
      throw error("No attendance is running", 400);
    }
    return res.status(200).json({ message: "Success", running });
  } catch (e) {
    next(e);
  }
};

const postDisable = async (_req, res, next) => {
  try {
    const running = await getRunningAttendance();
    if (!running) throw error("No attendance running", 400);
    running.status = "COMPLETED";
    await running.save();
    return res.status(200).json({ message: "Successfully stopped attendance" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getEnable,
  postDisable,
  getStatus,
};
