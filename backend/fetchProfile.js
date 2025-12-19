import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

// 🔁 Rotate proxies
const proxies = [
  "http://vessihde:ccwwe8slr2cv@23.95.150.145:6114",
  "http://vessihde:ccwwe8slr2cv@31.59.20.176:6754",
  "http://vessihde:ccwwe8slr2cv@64.137.96.74:6641",
  "http://vessihde:ccwwe8slr2cv@84.247.60.125:6095",
  "http://vessihde:ccwwe8slr2cv@107.172.163.27:6543",
  "http://vessihde:ccwwe8slr2cv@142.111.48.253:7030",
  "http://vessihde:ccwwe8slr2cv@142.111.67.146:5611",
  "http://vessihde:ccwwe8slr2cv@198.23.239.134:6540",
  "http://vessihde:ccwwe8slr2cv@198.105.121.200:6462",
  "http://vessihde:ccwwe8slr2cv@216.10.27.159:6837"
];

export async function fetchProfile(username) {
  const proxy = proxies[Math.floor(Math.random() * proxies.length)];
  const agent = new HttpsProxyAgent(proxy);

  const url = `https://www.tiktok.com/@${username}`;

  try {
    const res = await fetch(url, {
      agent,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    if (!res.ok) {
      throw new Error("TikTok blocked request");
    }

    const html = await res.text();

    // 🧪 TEMP: return simple confirmation
    return {
      username,
      success: true,
      htmlLength: html.length
    };

  } catch (err) {
    console.error("FETCH ERROR:", err.message);
    throw err;
  }
}
