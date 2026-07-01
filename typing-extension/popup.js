const slider = document.getElementById('wpmSlider');
const valueDisplay = document.getElementById('wpmValue');

// Update the WPM number text in real-time as the slider moves
slider.addEventListener('input', () => {
  valueDisplay.textContent = slider.value;
});

document.getElementById('startBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectedWPM = parseInt(slider.value);
  
  // Inject the speed choice directly into the active browser tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: runAutoTyperWithSpeed,
    args: [selectedWPM] // Passes the slider speed into the function argument below
  });
});

// This wrapper acts as our script bundle injector
function runAutoTyperWithSpeed(targetWPM) {
    window.TargetBotWPM = targetWPM;
}

// Trigger content script logic right after passing variables
document.getElementById('startBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
