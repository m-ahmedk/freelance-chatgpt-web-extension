export async function openOrSwitchTab({ url = "https://chatgpt.com", match = "chatgpt.com", makeActive = true }) {
    const allTabs = await chrome.tabs.query({});
    const existingTab = allTabs.find(t => t.url?.includes(match));

    if (existingTab) {
        if (makeActive) {
            await chrome.tabs.update(existingTab.id, { active: true });
        }
        return existingTab.id;
    }

    const newTab = await chrome.tabs.create({ url, active: makeActive });
    return newTab.id;
}