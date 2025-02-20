require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//Import routes
const authRoutes = require("../routes/authRoutes");
const usersRoutes = require("../routes/users/usersRoutes");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/", authRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
