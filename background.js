// background.js

let isEditingMode = false;

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleEditing") {
        // Toggle the editing mode
        isEditingMode = !isEditingMode;
        sendResponse({ isEditingMode });
    }
});
