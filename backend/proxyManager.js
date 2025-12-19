import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import dotenv from "dotenv";

dotenv.config();

let proxies = process.env.PROXIES.split(",");

export const getHealthyProxy = async () => {
  for (let i = 0; i < proxies.length; i++) {
    const proxy = proxies[i];
    try {
      await axios.get("https://api.ipify.org?format=json", {
        timeout: 6000,
        httpsAgent: new HttpsProxyAgent(proxy)
      });
      return proxy;
    } catch {
      console.log("❌ Removing dead proxy:", proxy);
      proxies.splice(i, 1);
      i--;
    }
  }
  throw new Error("No healthy proxies left");
};
