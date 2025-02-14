require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//Import routes
const authRoutes = require("../routes/authRoutes");

//Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Update this to match your client URL
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
