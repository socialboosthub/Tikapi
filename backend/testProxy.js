import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const proxy = "http://vessihde:ccwwe8slr2cv@23.95.150.145:6114";

axios.get("https://api.ipify.org?format=json", {
  timeout: 8000,
  httpsAgent: new HttpsProxyAgent(proxy)
})
.then(res => console.log("✅ Proxy OK. Exit IP:", res.data))
.catch(() => console.log("❌ Proxy failed"));
