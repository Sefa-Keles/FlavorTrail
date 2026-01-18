// DARK MODE FUNCTIONALITY

/** Dark mode toggle button */
const darkToggleBtn = document.querySelector('.dark-toggle');

/** Dark mode toggle icon */
const darkToggleIcon = darkToggleBtn.querySelector('i');

/**
 * Initialize dark mode based on saved preference in localStorage
 * Checks localStorage and applies dark mode if previously enabled
 */
function initDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
}

/**
 * Updates the dark mode toggle icon based on current mode
 * @param {boolean} isDark - Whether dark mode is currently active
 */
function updateDarkModeIcon(isDark) {
  if (isDark) {
    darkToggleIcon.classList.remove('fa-moon');
    darkToggleIcon.classList.add('fa-sun');
  } else {
    darkToggleIcon.classList.remove('fa-sun');
    darkToggleIcon.classList.add('fa-moon');
  }
}

/**
 * Toggles dark mode on/off and saves preference to localStorage
 * Switches between light and dark themes
 */
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  updateDarkModeIcon(isDarkMode);
  
  if (isDarkMode) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Add click event listener to toggle button
darkToggleBtn.addEventListener('click', toggleDarkMode);

// Export the init function to be called from main script
export { initDarkMode };
