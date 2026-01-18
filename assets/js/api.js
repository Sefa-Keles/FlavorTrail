// WEATHER API CONFIGURATION & FUNCTIONS

/** OpenWeatherMap API key */
const WEATHER_API_KEY = '9563c0e75eaf848ae6d47c6466b58aaf';

/** City for weather data (London, UK) */
const WEATHER_CITY = 'London,uk';

/**
 * Fetches current weather data for London from OpenWeatherMap API
 * Uses metric units for temperature display
 * Handles API errors gracefully by displaying fallback message
 * @async
 * @returns {Promise<Object|null>} Weather data or null if error occurs
 */
export async function fetchLondonWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&APPID=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200 || data.cod === "200") {
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// CURRENCY EXCHANGE API CONFIGURATION & FUNCTIONS

/** ExchangeRate API key */
const EXCHANGE_API_KEY = '8126c0d3f19969698e9e0554';

/** Base currency for conversions (British Pound) */
const BASE_CURRENCY = 'GBP';

/**
 * Fetches latest exchange rates from ExchangeRate API
 * Stores conversion rates in exchangeRates object
 * @async
 * @returns {Promise<Object>} Object containing exchange rates {currency: rate}
 */
export async function fetchExchangeRates() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${BASE_CURRENCY}`);
    const data = await response.json();
    return data.conversion_rates || {};
  } catch (error) {
    return {};
  }
}
