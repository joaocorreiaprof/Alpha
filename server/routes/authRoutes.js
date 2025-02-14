require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

router.get("/api/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

router.get("/api/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  console.log("Received Code:", code); // Debugging

  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    console.log("Token Exchange Data:", data); // Log token exchange data

    const { access_token } = data;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    console.log("User Profile:", profile); // Log profile data

    // Create a JWT token
    const token = jwt.sign(profile, "your_jwt_secret", { expiresIn: "1h" });

    // Store token in cookie
    res.cookie("auth_token", token, { httpOnly: true });

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("Error:", error.response?.data?.error || error.message);
    res.redirect("/login");
  }
});

router.get("/api/auth/profile", (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ user: null });
    }

    const user = jwt.verify(token, "your_jwt_secret");
    res.json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({ user: null });
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.redirect("http://localhost:5173");
});

module.exports = router;
