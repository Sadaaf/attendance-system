const express = require("express");
const connectDB = require("./db");
const bcrypt = require("bcryptjs");
const app = express();
const User = require("./models/User");

app.use(express.json());

app.get("/", (req, res) => {
  const obj = {
    name: "ayan",
    email: "Shyan@mon.om",
  };
  res.json(obj);
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    delete user._doc.password
    return res.status(200).json({ message: "Login Successful", user });
  } catch (err) {
    next(err);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Invalid Data" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();
    res.status(201).json({ message: "User Created Successfully", user });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error occurred" });
  console.log(err);
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => console.log(e));

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
