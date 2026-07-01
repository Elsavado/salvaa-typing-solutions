const slider = document.getElementById('wpmSlider');
const valueDisplay = document.getElementById('wpmValue');

// Update the WPM number text in real-time as the slider moves
slider.addEventListener('input', () => {
  valueDisplay.textContent = slider.value;
});

// A single, clean event listener to handle everything in order
document.getElementById('startBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectedWPM = parseInt(slider.value);
  
  // Step 1: Inject the speed choice directly into the active browser tab
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (targetWPM) => { window.TargetBotWPM = targetWPM; },
    args: [selectedWPM]
  });

  // Step 2: Trigger content script logic immediately afterward
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
