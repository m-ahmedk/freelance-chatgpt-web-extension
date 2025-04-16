import { retryMessage } from './utils/retry-attempt.js';

console.log("background.js loaded");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab, delay = 2000) => {
    if (changeInfo.status === 'complete' &&
        tab.url &&
        tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        setTimeout(async () => {
            try {
                const response = await retryMessage(tabId, { action: "extractRequirement" });
                console.log("Extracted automatically:", response.requirement);
            } catch (error) {
                console.error("Failed after retries:", error.message);
            }
        }, delay); 
    }
});