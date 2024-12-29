document.getElementById("invertBtn").addEventListener("click", async () => {
    const center = document.getElementById("center").value.trim();
    const circle = document.getElementById("circle").value.trim();
  
    if (!center) {
      alert("Please specify a center.");
      return;
    }
  
    // Send data to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (center, circle) => {
          window.dispatchEvent(
            new CustomEvent("GeoGebraInversion", { detail: { center, circle } })
          );
        },
        args: [center, circle],
      });
    });
  });
  