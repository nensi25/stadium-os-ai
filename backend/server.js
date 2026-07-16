const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Home Route
app.get("/", (req, res) => {
  res.send("✅ StadiumOS Backend Running");
});

// Login API
// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "stadium123") {
    return res.json({
      success: true,
      token: "stadium_demo_token",
      user: {
        id: 1,
        name: "Admin",
        email: "admin@stadiumos.ai",
        role: "System Administrator"
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });
});

// Dashboard API
app.get("/api/dashboard", (req, res) => {
  res.json({
    visitors: 84250,
    occupancy: 92,
    parking: 128,
    alerts: 4,
    revenue: 1245000,
    weather: {
      temperature: 28,
      humidity: 45,
      wind: 12,
    },
  });
});

// Parking API
app.get("/api/parking", (req, res) => {
  res.json({
    zoneA: 42,
    zoneB: 35,
    vip: 12,
    ev: 20,
  });
});

// Weather API
app.get("/api/weather", (req, res) => {
  res.json({
    temperature: 28,
    humidity: 45,
    wind: 12,
    condition: "Cloudy",
  });
});

// AI Chat API
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  let reply = "";

  switch ((message || "").toLowerCase()) {
    case "parking":
      reply = "Parking Zone A has 42 available slots.";
      break;

    case "weather":
      reply = "Current weather is 28°C with 45% humidity.";
      break;

    case "security":
      reply = "All security systems are operational.";
      break;

    case "visitors":
      reply = "Current visitors: 84,250";
      break;

    default:
      reply =
        "Hello! Ask me about parking, weather, security or visitors.";
  }

  res.json({ reply });
});


// Profile API
app.get("/api/profile", (req, res) => {
  res.json({
    id: 1,
    name: "Admin",
    email: "admin@stadiumos.ai",
    role: "System Administrator",
    lastLogin: new Date().toISOString()
  });
});
// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;