import { retryMessage } from './utils/retry-attempt.js';

console.log("background.js loaded");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab, delay = 2000) => {
    if (changeInfo.status === 'complete' &&
        tab.url &&
        tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        setTimeout(async () => {
            try {
                const response = await retryMessage(tabId, { action: "extractRequirement" });
                console.log("Extraction complete:", response.requirement);

                // Store the extracted prompt and target tab ID for later use
                const prompt = `Write a professional proposal for the following project:\n\n${response.requirement}`;

                await chrome.storage.local.set({
                    freelancerTabId: tabId,
                    currentPrompt: prompt
                });

                // Switch or open ChatGPT tab
                await openOrSwitchTab({
                    url: "https://chat.openai.com",
                    match: "chat.openai.com"
                });

            } catch (error) {
                console.error("Failed after retries or during the process:", error.message);
            }
        }, delay); 
    }
});