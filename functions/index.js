const express = require("express");
const app = express();
const cors = require("cors");
const functions = require("firebase-functions");
const authMiddleware = require("./database/middleware/authMiddleware");
const custom = require("./custom");
const Projects = require("./routes/projects");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use(authMiddleware);

app.use("/custom", custom);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/projects", Projects);

exports.app = functions.https.onRequest(app);