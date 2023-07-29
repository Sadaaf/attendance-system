const express = require("express");
const connectDB = require("./db");;
const app = express();
const authenticate = require('./middleware/authenticate')

// As there is an index file we can get away with just routes
const routes = require('./routes')

app.use(express.json());
app.use(routes)

app.get("/", (req, res) => {
  const obj = {
    name: "ayan",
    email: "Shyan@mon.om",
  };
  res.json(obj);
});

app.get("/private", authenticate, async (req, res) => {
  console.log("I am the user", req.user);
  return res.status(200).json({ message: "I am a private Route" });
});


app.use((err, req, res, next) => {
  const message = err.message ? err.message : "Server error occurred"
  res.status(err.status ? err.status : 500).json({ message });
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
