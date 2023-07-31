const userService = require("../service/user");
const authService = require("../service/auth");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO filter, sort, pagination, select
   */
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
const getUserByID = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) throw error("User not found", 404);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const putUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus, email } = req.body;
  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });
    if (!user) throw error("User not found", 404);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const patchUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) throw error("User not found", 404);
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) throw error("User not found", 404);
    console.log(user);
    user.deleteOne();
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
