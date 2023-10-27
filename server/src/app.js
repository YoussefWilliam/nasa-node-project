const express = require("express");
const cors = require("cors");
const path = require("path");

const planetsRouter = require("./routes/planets/planets.router");

const app = express();

// Middleware functions
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/planets", planetsRouter);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);
module.exports = app;
