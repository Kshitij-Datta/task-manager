const express = require("express");
const authRoutes = require("../routes/auth.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: ["https://urtaskmanager.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

module.exports = app;
