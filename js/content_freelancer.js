console.log("content_freelancer.js loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "extractRequirement") {
    console.log("Received extractRequirement message");

    const element = document.querySelector("div.ProjectDescription span");
    const text = element?.innerText?.trim() || "No requirement found";

    console.log("Extracted project description:", text);
    sendResponse({ requirement: text });
  }

  if (msg.action === "insertProposal") {
    const textarea = document.querySelector('textarea[placeholder*="best candidate"]');
    if (textarea) {
        textarea.value = msg.response;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        console.log("Proposal entered in the text area!");
    }
  }

  return true;
});