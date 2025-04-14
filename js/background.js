// js/background.js (Robust Retry Version)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        attemptSendMessage(tabId, 0);
    }
});

function attemptSendMessage(tabId, attemptCount) {
    chrome.tabs.sendMessage(tabId, { action: "extractRequirement" })
        .then((response) => {
            console.log("Successfully received from content script:", response.requirement);
        })
        .catch((error) => {
            if (attemptCount < 10) { // maximum 10 retries (adjust as needed)
                console.warn(`Retrying... attempt ${attemptCount + 1}`);
                setTimeout(() => attemptSendMessage(tabId, attemptCount + 1), 500);
            } else {
                console.error(`Failed after ${attemptCount} retries:`, error.message);
            }
        });
}