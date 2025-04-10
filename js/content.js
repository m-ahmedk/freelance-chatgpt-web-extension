(() => {
    const hostname = window.location.hostname.replace(/^www\./, "");
    const today = new Date().toISOString().split("T")[0];
    const storageKey = `shown_${hostname}`;

    chrome.storage.local.get([storageKey], (result) => {
        if (result[storageKey] === today) {
            return; // Do nothing, already shown for this site today
        }

        // Store today's date for this domain
        chrome.storage.local.set({ [storageKey]: today }, () => {
            showDialog();
        });
    });

    function showDialog() {
        const dialog = document.createElement("div");
        dialog.innerHTML = `
        <div class="custom-dialog">
          <h2>Hello from ${hostname}!</h2>
          <p>This message is shown once a day per site.</p>
          <button id="close-btn">Close</button>
        </div>
      `;
        dialog.className = "dialog-overlay";
        document.body.appendChild(dialog);

        document.getElementById("close-btn").onclick = () => {
            dialog.remove();
        };
    }
})();