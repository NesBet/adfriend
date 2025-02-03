// Load saved settings from storage
chrome.storage.sync.get(['isEnabled'], ({ isEnabled }) => {
  if (isEnabled !== undefined) {
    document.getElementById('toggle-extension').checked = isEnabled;
  }
});

// Function to reload all open tabs
function reloadAllTabs() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
}

// Save toggle state when the user toggles the switch
document.getElementById('toggle-extension').addEventListener('change', (event) => {
  const isEnabled = event.target.checked;

  // Save the new state
  chrome.storage.sync.set({ isEnabled }, () => {
    document.getElementById('status-message').textContent = 'Extension toggled! Reloading tabs...';

    // Reload all open tabs to apply changes
    reloadAllTabs();
  });
});
