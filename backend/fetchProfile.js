import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getHealthyProxy } from "./proxyManager.js";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0)",
  "Mozilla/5.0 (Android 12)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0)"
];

const randomUA = () =>
  userAgents[Math.floor(Math.random() * userAgents.length)];

export const fetchProfile = async (username) => {
  const proxy = await getHealthyProxy();

  const res = await axios.get(
    `https://tikwm.com/api/user/posts?unique_id=${username}&count=9`,
    {
      timeout: 8000,
      headers: {
        "User-Agent": randomUA(),
        "Accept": "application/json"
      },
      httpsAgent: new HttpsProxyAgent(proxy)
    }
  );

  if (!res.data?.data?.videos) {
    throw new Error("Invalid TikWM response");
  }

  return res.data.data.videos;
};
