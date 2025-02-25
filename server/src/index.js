require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

//Import routes
const authRoutes = require("../routes/authRoutes");
const usersRoutes = require("../routes/users/usersRoutes");
const postsRoutes = require("../routes/posts/postsRoutes");
const friendsRoutes = require("../routes/friends/friendsRoutes");

//Middlewares
app.use(express.json());
app.use(cookieParser());
// Increase the payload size limit
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Use routes
app.use("/", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/friends", friendsRoutes);

// Serve static files from the client/dist directory
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// Handle all other routes with the frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
  console.log("Static files served from:", clientBuildPath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
