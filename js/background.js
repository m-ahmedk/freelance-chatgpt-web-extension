chrome.action.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // get the active tab which should be freelancer.pk
    if (changeInfo.status === "complete" && tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        chrome.scripting.executeScript({
            target: { tabId },
            func: () => alert("In Freelancer Project Details!")
        });
    }
    
    const response = await chrome.tabs.sendMessage(freelancerTab.id, { action: "extractRequirement" });

        alert(response.requirement || "No response received!");

    // use content_freelancer.js to extract the requirement
    // chrome.tabs.sendMessage(freelancerTab.id, { action: "extractRequirement" }, async (response) => {
    //     alert(response);
    //     return;
        
        
    //     if (response == "No requirement found") {
    //         alert(response);
    //         return;
    //     }

    //     const prompt = `Please prepare a response for this requirement. It should be short, easy to understand, can include bullet points, and should be crisp and clear, also stating to discuss more on this if required.\n\n${response.requirement}`;

    //     // store prompt temporarily
    //     await chrome.storage.local.set({ freelancerPrompt: prompt, freelancerTabId: freelancerTab.id });

    //     // open ChatGPT in a new tab
    //     chrome.tabs.create({ url: "https://chatgpt.com" });
    // });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.match(/freelancer\.pk\/projects\/.+\/details$/)) {
        chrome.scripting.executeScript({
            target: { tabId },
            func: () => alert("In Freelancer Project Details!")
        });
    }
});

