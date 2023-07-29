const { loginService, registerService } = require("../service/auth");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "Invalid Data" });
  }
  try {
    const user = await registerService({ name, email, password });
    delete user._doc.password
    res.status(201).json({ message: "User Created Successfully", user });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { loginController, registerController };
