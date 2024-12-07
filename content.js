function toggleReadingMode() {
    const body = document.body;
    if (!body.classList.contains("reading-mode")) {
        body.classList.add("reading-mode");

        const images = document.querySelectorAll("img");
        images.forEach((img) => {
            img.style.display = "none";
        });

        console.log("Reading Mode Enabled");
    } else {
        body.classList.remove("reading-mode");

        const images = document.querySelectorAll("img");
        images.forEach((img) => {
            img.style.display = "";
        });

        console.log("Reading Mode Disabled");
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "dark") {
        body.setAttribute("data-theme", "light");
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";

        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            link.style.color = "#007bff";
            link.style.backgroundColor = "";
            link.style.textDecoration = "";
        });

        const paras = document.querySelectorAll("p");
        paras.forEach((para) => {
            para.style.color = "black";
        });

        console.log("Switched to Light Mode");
    } else {
        body.setAttribute("data-theme", "dark");
        body.style.backgroundColor = "#121212";
        body.style.color = "#ffffff";

        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            link.style.color = "#4CAF50";
            link.style.backgroundColor = "#1e1e1e";
            link.style.textDecoration = "none";
        });

        const paras = document.querySelectorAll("p");
        paras.forEach((para) => {
            para.style.color = "white";
        });

        console.log("Switched to Dark Mode");
    }
}

// Image editing feature
function initializeImageEditor() {
    const editorHTML = `
        <div id="image-editor" style="
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ffffff;
    color: #333;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    width: 300px;
    font-family: Arial, sans-serif;
">
    <div style="text-align: center; margin-bottom: 20px;color:"black"; font-family:"Poppins">
        Image Editor
    </div>
    <label style="font-size: 14px; color: #666; margin-bottom: 6px; display: block;">Brightness:</label>
    <input type="range" id="brightness" min="0" max="200" value="100" style="
        width: 100%;
        appearance: none;
        background: #ddd;
        height: 6px;
        border-radius: 5px;
        outline: none;
    ">
    <label style="font-size: 14px; color: #666; margin-bottom: 6px; margin-top: 12px; display: block;">Contrast:</label>
    <input type="range" id="contrast" min="0" max="200" value="100" style="
        width: 100%;
        appearance: none;
        background: #ddd;
        height: 6px;
        border-radius: 5px;
        outline: none;
    ">
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button id="download-image" style="
            padding: 10px 20px;
            border: none;
            background: #4CAF50;
            color: white;
            cursor: pointer;
            border-radius: 50px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            contenteditable: "false";
        ">
            <i class="fas fa-download"></i> Download
        </button>
        <button id="close-editor" style="
            padding: 10px 20px;
            border: none;
            background: #e74c3c;
            color: white;
            cursor: pointer;
            border-radius: 50px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            contenteditable: "false";
        ">
            <i class="fas fa-times"></i> Close
        </button>
    </div>
</div>

<!-- Include Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    `;
    document.body.insertAdjacentHTML("beforeend", editorHTML);

    const editor = document.getElementById("image-editor");
    const brightnessSlider = document.getElementById("brightness");
    const contrastSlider = document.getElementById("contrast");
    const downloadButton = document.getElementById("download-image");
    const closeButton = document.getElementById("close-editor");

    const images = document.querySelectorAll("img");
    let selectedImage = null;

    images.forEach((img) => {
        img.addEventListener("click", () => {
            selectedImage = img;
            editor.style.display = "block";
        });
    });

    brightnessSlider.addEventListener("input", () => {
        if (selectedImage) {
            selectedImage.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
        }
    });

    contrastSlider.addEventListener("input", () => {
        if (selectedImage) {
            selectedImage.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
        }
    });

    downloadButton.addEventListener("click", () => {
        if (selectedImage) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const tempImage = new Image();
            tempImage.crossOrigin = "anonymous";

            const proxy = "https://cors-anywhere.herokuapp.com/";
            tempImage.src = `${proxy}${selectedImage.src}`;

            tempImage.onload = () => {
                canvas.width = tempImage.naturalWidth;
                canvas.height = tempImage.naturalHeight;

                ctx.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
                ctx.drawImage(tempImage, 0, 0);

                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "edited-image.png";
                link.click();
            };

            tempImage.onerror = () => {
                console.error("Failed to load image via proxy.");
                alert("Failed to download image. Ensure the image is accessible and try again.");
            };
        }
    });


    closeButton.addEventListener("click", () => {
        editor.style.display = "none";
    });
}

initializeImageEditor();

document.body.contentEditable = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleReadingMode") {
        toggleReadingMode();
        sendResponse({ status: "Reading mode toggled" });
    } else if (request.action === "toggleTheme") {
        toggleTheme();
        sendResponse({ status: "Theme toggled" });
    }
});
