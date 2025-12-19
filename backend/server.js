import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchProfile } from "./fetchProfile.js";

dotenv.config();

// 🧠 Simple in-memory cache
const memoryCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 API key middleware
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== process.env.PRIVATE_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// 📥 Profile API
app.get("/api/profile", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  const cacheKey = `profile:${username}`;

  // ✅ Check memory cache
  if (memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey);

    if (cached.expires > Date.now()) {
      return res.json({
        cached: true,
        videos: cached.data
      });
    }

    // Cache expired
    memoryCache.delete(cacheKey);
  }

  try {
    const videos = await fetchProfile(username);

    // ✅ Save to memory cache
    memoryCache.set(cacheKey, {
      data: videos,
      expires: Date.now() + CACHE_TTL
    });

    res.json({
      cached: false,
      videos
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
