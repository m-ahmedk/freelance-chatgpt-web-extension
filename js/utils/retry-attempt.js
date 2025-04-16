export async function retryMessage(tabId, message, maxRetries = 5, delay = 500) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await chrome.tabs.sendMessage(tabId, message);
            return response;
        } catch (err) {
            if (attempt === maxRetries - 1) throw err;
            await new Promise((res) => setTimeout(res, delay)); // Wait for 500ms
        }
    }
}