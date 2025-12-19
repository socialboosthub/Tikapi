import { fetch, ProxyAgent } from 'undici'; // Use undici's fetch and ProxyAgent

export async function fetchProfile(url) {
    // 1. Get the proxy URL from your environment variable
    const proxyUrl = process.env.PROXIES.split(',')[0]; 
    
    // 2. Create a Dispatcher (the Node 22 version of an "Agent")
    const client = new ProxyAgent(proxyUrl);

    try {
        const response = await fetch(url, { 
            dispatcher: client // IMPORTANT: Use 'dispatcher' instead of 'agent'
        });
        return await response.json();
    } catch (error) {
        console.error("FETCH ERROR:", error.message);
        throw error;
    }
}
