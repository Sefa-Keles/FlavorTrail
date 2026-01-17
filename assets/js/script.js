import { menuItems } from './data.js';

const menuContainer = document.getElementById('menu-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('input[type="search"]');

// OpenWeatherMap
const WEATHER_API_KEY = '9563c0e75eaf848ae6d47c6466b58aaf';
const WEATHER_CITY = 'London,uk';
const weatherContentEl = document.getElementById('weather-content');

async function fetchLondonWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&APPID=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200 || data.cod === "200") {
      renderWeather(data);
    } else {
      weatherContentEl.textContent = 'Weather unavailable';
      console.error('Weather API Error:', data);
    }
  } catch (error) {
    weatherContentEl.textContent = 'Weather unavailable';
    console.error('Weather fetch error:', error);
  }
}

function renderWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].main;
  const text = `London: ${temp}°C, ${desc}`;
  // Single marquee text moving across the bar
  weatherContentEl.innerHTML = `
      <span class="weather-text">${text}</span>
  `;
}

const EXCHANGE_API_KEY = '8126c0d3f19969698e9e0554';
const BASE_CURRENCY = 'GBP'; // Başlangıç currency
let exchangeRates = {}; // API’den gelen oranlar burada saklanacak

async function fetchExchangeRates() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${BASE_CURRENCY}`);
    const data = await response.json();
    exchangeRates = data.conversion_rates;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
  }
}

function renderMenu(items) {
  menuContainer.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
      <div class="card h-100 menu-card">
        <div class="ratio ratio-4x3">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
        </div>
        <div class="card-body">
          <h3 class="card-title mb-2">${item.name}</h3>
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
        menuCardEl.classList.add('dropdown-open');
        const input = currencyList.querySelector('.dropdown-search');
        if (input) input.focus();
      });
      dropdownToggleEl.addEventListener('hidden.bs.dropdown', () => {
        menuCardEl.classList.remove('dropdown-open');
      });
    }

    // Arama inputunu ekle (dropdown başında)
    const searchItem = document.createElement('li');
    searchItem.classList.add('search-item', 'px-2', 'py-2');
    searchItem.innerHTML = `<input type="text" class="form-control form-control-sm dropdown-search" placeholder="Search currency..." aria-label="Search currency">`;
    currencyList.appendChild(searchItem);
    const dropdownSearchInput = searchItem.querySelector('.dropdown-search');

    const sortedCurrencies = Object.keys(exchangeRates).sort();
    sortedCurrencies.forEach(curr => {
      const li = document.createElement('li');
      li.classList.add('currency-option');
      li.innerHTML = `<a class="dropdown-item" href="#">${curr}</a>`;
      li.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCurrency = curr;
        const basePrice = parseFloat(card.querySelector('.price').dataset.base);
        const convertedPrice = (basePrice * exchangeRates[selectedCurrency]).toFixed(2);
        card.querySelector('.compare-value').textContent = `${convertedPrice} ${selectedCurrency}`;
        card.querySelector('.compare-dropdown').textContent = selectedCurrency;
      });
      currencyList.appendChild(li);
    });

    // Dropdown içinde arama filtresi
    dropdownSearchInput.addEventListener('input', () => {
      const term = dropdownSearchInput.value.toLowerCase();
      currencyList.querySelectorAll('li.currency-option').forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(term) ? '' : 'none';
      });
    });
  });
}

function filterAndRender() {
  const activeButton = document.querySelector('.filter-btn.active');
  const category = activeButton ? activeButton.dataset.category : 'All';
  let filteredItems =
    category === 'All' ? menuItems : menuItems.filter(item => item.category === category);

  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
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

searchInput.addEventListener('input', () => {
  filterAndRender();
});

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
  await fetchExchangeRates();
  renderMenu(menuItems);
  fetchLondonWeather();
}

init();
