// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete" && tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
//         chrome.scripting.executeScript({
//             target: { tabId },
//             func: () => alert("In Freelancer Project Details!")
//         });
//     }
// });
chrome.action.onClicked.addListener(async (tab) => {
    try {
        const response = await chrome.tabs.sendMessage(tab.id, { action: "extractRequirement" });
        console.log("Got response from content script:", response.requirement);
        alert(response.requirement);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});