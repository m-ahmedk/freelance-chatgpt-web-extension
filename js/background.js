console.log("background.js loaded");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' &&
        tab.url &&
        tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        setTimeout(() => {
            attemptSendMessage(tabId, 0);
        }, 2000); // delay first by 2 sec
    }
});

function attemptSendMessage(tabId, attemptCount) {
    chrome.tabs
        .sendMessage(tabId, { action: "extractRequirement" })
        .then((response) => {
            console.log("Successfully received from content script:", response.requirement);
        })
        .catch((error) => {
            if (attemptCount < 5) {
                console.warn(`Retrying... attempt ${attemptCount + 1}`);
                setTimeout(() => attemptSendMessage(tabId, attemptCount + 1), 500);
            } else {
                console.error(`Failed after ${attemptCount + 1} tries:`, error.message);
            }
        });
}
