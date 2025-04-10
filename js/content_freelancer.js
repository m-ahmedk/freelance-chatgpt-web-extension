console.log("content_freelancer.js loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "extractRequirement") {
    console.log("Received extractRequirement message");

    // EXACT CORRECT SELECTOR FROM YOUR SCREENSHOT:
    const element = document.querySelector("div.ProjectDescription span");
    const text = element?.innerText?.trim() || "No requirement found";

    console.log("Extracted project description:", text);
    sendResponse({ requirement: text });
  }

  return true;
});