// js/background.js (CORRECTED CLEARLY)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        setTimeout(async () => {
            try {
                const response = await chrome.tabs.sendMessage(tabId, { action: "extractRequirement" });
                console.log("Got automatic response from content script:", response.requirement);
            } catch (error) {
                console.error(`Error communicating with content script: ${error.message}`);
            }
        }, 3000); // Delay 3 seconds to ensure script readiness clearly
    }
});
