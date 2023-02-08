const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connection = require("./db/database");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

const PORT = process.env.PORT || 4000;

connection();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is Working Fine!");
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
