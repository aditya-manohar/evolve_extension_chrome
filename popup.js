document.addEventListener("DOMContentLoaded", () => {
    const readingModeBtn = document.getElementById("toggleReadingModeBtn");
    const themeToggleBtn = document.getElementById("toggleThemeBtn");

    if (readingModeBtn) {
        readingModeBtn.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleReadingMode" }, function (response) {
                    let icon = document.querySelector("#toggleReadingModeBtn i");
                    if (icon) {
                        icon.classList.toggle("fa-book");
                        icon.classList.toggle("fa-eye-slash");
                    }
                });
            });
        });
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleTheme" }, function (response) {
                    let icon = document.querySelector("#toggleThemeBtn i");
                    if (icon) {
                        icon.classList.toggle("fa-sun");
                        icon.classList.toggle("fa-moon");
                    }
                });
            });
        });
    }
});
