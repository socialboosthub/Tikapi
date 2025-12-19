const memoryCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchProfile } from "./fetchProfile.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 API key
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== process.env.PRIVATE_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

app.get("/api/profile", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Username required" });

  const cacheKey = `profile:${username}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json({ cached: true, videos: JSON.parse(cached) });
  }

  try {
    const videos = await fetchProfile(username);
    await redis.setEx(cacheKey, 120, JSON.stringify(videos));
    res.json({ cached: false, videos });
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 API running at http://localhost:${process.env.PORT}`);
});
