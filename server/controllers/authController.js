const axios = require("axios");
const jwt = require("jsonwebtoken");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, JWT_SECRET } = process.env;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;

// Google authentication
const googleAuth = (req, res) => {
  res.redirect(googleAuthUrl);
};

// Google callback
const googleCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token } = data;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // Check if user exists in database
    let user = await prisma.user.findUnique({
      where: { email: profile.email },
    });

    // If user does not exist, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: profile.name,
          email: profile.email,
          profilePicture: profile.picture,
        },
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Store token in cookie
    res.cookie("auth_token", token, { httpOnly: true });

    // Redirect to the front end with user profile information
    res.redirect(
      `http://localhost:5173?user=${encodeURIComponent(JSON.stringify(user))}`
    );
  } catch (error) {
    console.error("Error:", error.response?.data?.error || error.message);
    res.redirect("/login");
  }
};

// Profile retrieval
const getProfile = (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ user: null });
    }

    const user = jwt.verify(token, JWT_SECRET);
    res.json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({ user: null });
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie("auth_token");
  res.redirect("http://localhost:5173");
};

const bcrypt = require("bcrypt");

//Sign Up
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("signUp called with:", { username, email, password }); // Debug log
  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default profile picture if none is provided
    const defaultProfilePic =
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

    // Create new user
    console.log("Creating new user with:", {
      username,
      email,
      password: hashedPassword,
    }); // Debug log
    user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePicture: defaultProfilePic,
      },
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Store token in cookie
    res.cookie("auth_token", token, { httpOnly: true });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Sign Up Error:", error.message); // Debug log
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login called with:", { email, password }); // Debug log
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Store token in cookie
    res.cookie("auth_token", token, { httpOnly: true });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture, // Include profilePicture in the response
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message); // Debug log
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  googleAuth,
  googleCallback,
  getProfile,
  logout,
  signUp,
  login,
};
