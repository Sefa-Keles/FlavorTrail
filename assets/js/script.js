import { menuItems } from './data.js';
import { fetchLondonWeather, fetchExchangeRates } from './api.js';

// DOM ELEMENT REFERENCES

/** Menu container where menu cards will be rendered */
const menuContainer = document.getElementById('menu-container');

/** Filter buttons for category filtering (All, Meals, Salads, Desserts, Drinks) */
const filterButtons = document.querySelectorAll('.filter-btn');

/** Search input for filtering menu items by name or description */
const searchInput = document.querySelector('input[type="search"]');

/** Weather content container element */
const weatherContentEl = document.getElementById('weather-content');

/** Object storing exchange rates from API {currency: rate} */
let exchangeRates = {};

/**
 * Renders weather data into the weather bar with marquee animation
 * Creates a single scrolling text element showing temperature and condition
 * @param {Object} data - Weather data from OpenWeatherMap API
 * @param {Object} data.main - Main weather data
 * @param {number} data.main.temp - Temperature in Celsius
 * @param {Array} data.weather - Weather conditions array
 * @param {string} data.weather[0].main - Main weather condition (e.g., "Clouds", "Clear")
 */
function renderWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].main;
  const text = `London: ${temp}°C, ${desc}`;
  // Single marquee text moving across the bar
  weatherContentEl.innerHTML = `
      <span class="weather-text">${text}</span>
  `;
}

/**
 * Renders menu items as Bootstrap cards in the menu container
 * Each card includes:
 * - Item image with 4:3 ratio
 * - Name and category badge
 * - Description
 * - Price in GBP
 * - Currency conversion dropdown with search functionality
 * - Converted price display
 * 
 * @param {Array} items - Array of menu item objects to render
 * @param {number} items[].id - Item ID
 * @param {string} items[].name - Item name
 * @param {string} items[].category - Item category (Meal, Salad, Dessert, Drink)
 * @param {string} items[].description - Item description
 * @param {number} items[].price - Item price in GBP
 * @param {string} items[].image - Path to item image
 */
function renderMenu(items) {
  menuContainer.innerHTML = '';

  // Show message if no items found
  if (items.length === 0) {
    menuContainer.innerHTML = `
      <div class="col-12">
        <div class="text-center py-5 my-5" style="color: var(--highlight-color);">
          <i class="fas fa-search fa-3x mb-3"></i>
          <h3>No dishes found</h3>
          <p>Try searching with a different keyword or browse all categories</p>
        </div>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
      <div class="card h-100 menu-card">
        <div class="ratio ratio-4x3">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="card-title mb-0">${item.name}</h3>
            <span class="badge bg-warning text-dark category-badge">${item.category}</span>
          </div>
          <p class="card-text text-muted mb-3">${item.description}</p>

          <div class="compare-section">
            <div class="text-end mb-2">
              <span class="fw-bold text-primary price" data-base="${item.price}">
                Price : £ ${item.price}
              </span>
            </div>

            <div class="d-flex align-items-center flex-wrap gap-2 mt-2 compare-row">
              <small class="text-light mb-0 compare-label">Select Currency :</small>
              <div class="dropdown" data-bs-auto-close="outside">
                <button class="btn btn-sm btn-outline-light dropdown-toggle compare-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Currency
                </button>
                <ul class="dropdown-menu currency-list">
                  <!-- JS ile doldurulacak -->
                </ul>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2 compare-result mt-1">
              <small class="text-light mb-0 compare-label">Compared Price :</small>
              <span class="text-light small compare-value">0.00</span>
            </div>
          </div>
        </div>
      </div>
    `;

    menuContainer.appendChild(card);

    const currencyList = card.querySelector('.currency-list');
    const menuCardEl = card.querySelector('.menu-card');
    const dropdownToggleEl = card.querySelector('.dropdown-toggle');

    if (dropdownToggleEl) {
      dropdownToggleEl.addEventListener('shown.bs.dropdown', () => {
        // Add dropdown-open class to ensure card stays on top (higher z-index)
        menuCardEl.classList.add('dropdown-open');
        const input = currencyList.querySelector('.dropdown-search');
        // Auto-focus search input when dropdown opens
        if (input) input.focus();
      });
      dropdownToggleEl.addEventListener('hidden.bs.dropdown', () => {
        // Remove dropdown-open class when dropdown closes
        menuCardEl.classList.remove('dropdown-open');
      });
    }

    // Create and add search input at the top of dropdown (sticky position)
    const searchItem = document.createElement('li');
    searchItem.classList.add('search-item', 'px-2', 'py-2');
    searchItem.innerHTML = `<input type="text" class="form-control form-control-sm dropdown-search" placeholder="Search currency..." aria-label="Search currency">`;
    currencyList.appendChild(searchItem);
    const dropdownSearchInput = searchItem.querySelector('.dropdown-search');

    // Sort currencies alphabetically and populate dropdown
    const sortedCurrencies = Object.keys(exchangeRates).sort();
    sortedCurrencies.forEach(curr => {
      const li = document.createElement('li');
      li.classList.add('currency-option');
      li.innerHTML = `<a class="dropdown-item" href="#">${curr}</a>`;
      
      // Click handler to convert price to selected currency
      li.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCurrency = curr;
        // Get base price from data attribute
        const basePrice = parseFloat(card.querySelector('.price').dataset.base);
        // Calculate converted price using exchange rate
        const convertedPrice = (basePrice * exchangeRates[selectedCurrency]).toFixed(2);
        // Update UI with converted price and currency code
        card.querySelector('.compare-value').textContent = `${convertedPrice} ${selectedCurrency}`;
        card.querySelector('.compare-dropdown').textContent = selectedCurrency;
      });
      currencyList.appendChild(li);
    });

    // Live search filter for currency dropdown
    dropdownSearchInput.addEventListener('input', () => {
      const term = dropdownSearchInput.value.toLowerCase();
      // Show/hide currency options based on search term
      currencyList.querySelectorAll('li.currency-option').forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(term) ? '' : 'none';
      });
    });
  });
}

/**
 * Filters and renders menu items based on active category and search term
 * First filters by category (if not "All"), then by search input text
 * Updates the menu display with filtered results
 */
function filterAndRender() {
  // Get active category from filter buttons
  const activeButton = document.querySelector('.filter-btn.active');
  const category = activeButton ? activeButton.dataset.category : 'All';
  
  // Filter by category
  let filteredItems =
    category === 'All' ? menuItems : menuItems.filter(item => item.category === category);

  // Further filter by search term (only in name)
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  renderMenu(filteredItems);
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterAndRender();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    filterAndRender();
  });
} else {
  console.error('Search input element not found!');
}

// Dark Mode Toggle with localStorage
const darkToggleBtn = document.querySelector('.dark-toggle');
const darkToggleIcon = darkToggleBtn.querySelector('i');

function initDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
}

function updateDarkModeIcon(isDark) {
  if (isDark) {
    darkToggleIcon.classList.remove('fa-moon');
    darkToggleIcon.classList.add('fa-sun');
  } else {
    darkToggleIcon.classList.remove('fa-sun');
    darkToggleIcon.classList.add('fa-moon');
  }
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  updateDarkModeIcon(isDarkMode);
  
  if (isDarkMode) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

darkToggleBtn.addEventListener('click', toggleDarkMode);

async function init() {
  initDarkMode();
  exchangeRates = await fetchExchangeRates();
  renderMenu(menuItems);
  const weatherData = await fetchLondonWeather();
  if (weatherData) {
    renderWeather(weatherData);
  } else {
    weatherContentEl.textContent = 'Weather unavailable';
  }
}

init();
