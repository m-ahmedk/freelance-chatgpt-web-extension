chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "extractRequirement") {
        const descriptionElement = document.querySelector(".ProjectDetails-description").innerText; //document.querySelector('[data-cy="project-view-description"]');
        const text = descriptionElement?.innerText?.trim() || "No requirement found";
        sendResponse({ requirement: text });
    }

    return true;
});
