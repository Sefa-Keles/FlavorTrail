# Flavor Trail – Turkish Cuisine Interactive Menu (JavaScript)

## 📌 Project Overview

![Light Mode Mockup](assets/images/readme/all-devices-light.png)
![Dark Mode Mockup](assets/images/readme/all-devices-dark.png)

Flavor Trail is a single-page interactive Turkish restaurant menu web application built using HTML5, CSS3, and vanilla JavaScript (ES6 Modules).

Users can browse authentic Turkish dishes, filter by category, search by name, view prices in multiple currencies, check London weather, and toggle between light/dark themes. The application focuses on **accessibility compliance**, **responsive design**, **clean code architecture**, and **best practices**.

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [User Value](#-user-value)
- [Features](#-features)
  - [Search & Filters](#-search--filters)
  - [Currency Conversion](#-currency-conversion)
  - [Weather Display](#-weather-display)
  - [Dark / Light Mode](#-dark--light-mode)
  - [Responsive Design](#-responsive-design)
- [Testing & Validation](#-testing--validation)
- [JavaScript Functionality](#-javascript-functionality)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🎯 User Value

This application allows users to:

- **Browse Turkish Cuisine**: Explore 18 authentic Turkish dishes with high-quality images
- **Filter by Category**: Meals, Salads, Desserts, or Drinks
- **Search Functionality**: Find dishes instantly by name
- **Multi-Currency Support**: View prices in 150+ currencies with live exchange rates
- **Weather Integration**: Check London weather conditions
- **Dark/Light Mode**: Switch themes with preference saved to browser
- **Accessibility**: Full WCAG 2.1 compliance with screen reader support
- **Mobile-Friendly**: Fully responsive design for all devices (240px - 4K)

---

## 🧩 Features

### 🔍 Search & Filters

- **Live Search**: Filter menu items by dish name
- **Category Filters**: All, Meals, Salads, Desserts, Drinks
- **Active State Indicator**: Visual checkmark (✓) on selected category
- **"No Results" Message**: Aria-live region announces when no dishes match search

### 💱 Currency Conversion

- **150+ Currencies**: Real-time exchange rates from ExchangeRate API
- **Base Currency**: Prices calculated from GBP (British Pound)
- **Dropdown Search**: Search and filter currencies instantly
- **Live Calculation**: Price updates dynamically as currency is selected

### 🌤️ Weather Display

- **London Weather**: Real-time data from OpenWeatherMap API
- **Auto-Update**: Fetches weather on page load
- **Marquee Animation**: Scrolling weather display
- **Fallback Message**: Graceful error handling if API fails

### 🌗 Dark / Light Mode

- **Toggle Button**: Icon switches between moon (light) and sun (dark)
- **Persistent Storage**: Theme preference saved to localStorage
- **Accessible Control**: Aria-pressed state management
- **CSS Variables**: Theme switching using custom properties

### 📱 Responsive Design

Optimized for all device sizes with dedicated breakpoints:

- **Desktop/Monitor** (1200px+): Comfortable spacing
- **Laptop** (768px - 1199px): Tablet landscape optimized
- **Tablet** (577px - 767px): Portrait mode adapted
- **Mobile** (361px - 576px): Compact layout
- **iPhone** (375px): Standard phone optimization
- **Small Phones** (320px - 360px): Ultra-compact
- **Ultra Small** (240px): Minimal spacing

---

## 🧪 Testing & Validation

### ✅ HTML Validation

![HTML Validator](assets/images/readme/html-validator.png)

- **W3C HTML Validator**: No errors or warnings
- **Semantic HTML5**: Proper use of tags (header, main, section, footer)
- **Accessibility Markup**: ARIA labels, roles, and live regions
- **Form Attributes**: Proper id, name, and autocomplete values

### ✅ CSS Validation

![CSS Validator](assets/images/readme/css-validator.png)

- **W3C CSS Validator**: CSS Level 3 + SVG compliant
- **No Errors**: Clean, validated stylesheet
- **Responsive**: Media queries validated across all breakpoints
- **Custom Properties**: CSS variables for theming

### ✅ JavaScript Linting

![JavaScript Validator](assets/images/readme/javascript-validator.png)

- **ValidateJavaScript.com**: No errors or warnings
- **ESLint Compliance**: 
  - ✅ No console statements (no-console)
  - ✅ No param reassignment (no-param-reassign)
  - ✅ Proper function declaration order (no-use-before-define)
- **Clean Code**: ES6 modules, consistent style

### ♿ Accessibility (WCAG)

- **Skip Link**: Keyboard navigation to main content
- **Focus Indicators**: Visible :focus-visible on all interactive elements
- **ARIA Attributes**:
  - `aria-live="polite"` for dynamic content updates
  - `aria-pressed` for button states
  - `aria-label` for icon buttons
  - `aria-hidden="true"` for decorative elements
- **Semantic HTML**: Proper heading hierarchy
- **Color Independent**: Visual indicators (✓) beyond color alone
- **Screen Reader Support**: Visually-hidden labels for context
- **Form Labels**: Proper label-input associations

### 📊 Lighthouse Testing

![Lighthouse Results](assets/images/readme/lighthouse.png)

- **Performance**: 95/100
- **Accessibility**: 94/100
- **Best Practices**: 96/100
- **SEO**: 100/100

---

## 🧠 JavaScript Functionality

The project uses vanilla JavaScript ES6 modules for clean, modular code:

### **Core Files:**

1. **script.js** (252 lines)
   - `renderMenu(items)`: Renders menu cards with currency dropdowns
   - `filterAndRender()`: Filters by category and search term
   - `init()`: Initializes app, fetches APIs, sets up event listeners

2. **api.js** (60 lines)
   - `fetchLondonWeather()`: OpenWeatherMap API integration
   - `fetchExchangeRates()`: ExchangeRate API integration

3. **darkMode.js** (57 lines)
   - `initDarkMode()`: Loads theme from localStorage
   - `toggleDarkMode()`: Switches theme and persists preference
   - `updateDarkModeIcon()`: Updates icon and aria-pressed state

4. **data.js** (146 lines)
   - Menu items array with 18 Turkish dishes
   - All images in WebP format for optimization

### **Concepts Used:**

- ES6 Modules (import/export)
- `querySelector` / `querySelectorAll`
- Event listeners and delegation
- Async/await for API calls
- Conditional logic (if/else)
- Array methods (forEach, map, filter)
- Dataset attributes (data-category)
- DOM manipulation (classList, innerHTML)
- localStorage API

### **Error Handling:**

- API failures return graceful fallbacks
- Search handles empty/no results
- Form validation with required attributes
- No runtime console errors

---

## 🚀 Deployment

The project is deployed to GitHub Pages:

📍 **Live Site**: [https://sefa-keles.github.io/FlavorTrail/](https://sefa-keles.github.io/FlavorTrail/)

- All features work correctly after deployment
- No broken links or missing assets
- APIs respond with live data
- Responsive design tested on multiple devices

---

## 🗂️ Project Structure

```
FlavorTrail/
├── index.html                    # Main HTML structure
├── README.md                     # Documentation
├── assets/
│   ├── css/
│   │   ├── styles.css           # Main styles (550 lines)
│   │   └── responsive.css       # Media queries (96 lines)
│   ├── images/                  # All WebP format
│   │   ├── logo.webp
│   │   ├── ayran.webp
│   │   ├── baklava.webp
│   │   ├── beyti.webp
│   │   ├── cay.webp
│   │   ├── doner.webp
│   │   ├── fruit_salad.webp
│   │   ├── gavurdagi_salad.webp
│   │   ├── iskender.webp
│   │   ├── kahve.webp
│   │   ├── kofte.webp
│   │   ├── kunefe.webp
│   │   ├── lahmacun.webp
│   │   ├── menemen.webp
│   │   ├── mix_salad.webp
│   │   ├── pide.webp
│   │   ├── salep.webp
│   │   ├── sherbet.webp
│   │   └── sutlac.webp
│   └── js/
│       ├── script.js            # Main app logic (252 lines)
│       ├── api.js               # API functions (60 lines)
│       ├── darkMode.js          # Theme toggle (57 lines)
│       └── data.js              # Menu items (146 lines)
```

- **Modular Code Structure**: Separated concerns (HTML, CSS, JS)
- **Organized Assets**: Categorized by type
- **Clean Naming**: Consistent file and variable names
- **Comments**: Well-documented functions

---

## 🛠️ Technologies Used

### **Frontend**

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, media queries
- **JavaScript ES6**: Modules, async/await, arrow functions

### **Libraries & Frameworks**

- **Bootstrap 5.0.2**: Responsive grid, components, utilities
- **Font Awesome 7.0.1**: Icons (moon, sun, dropdowns)

### **APIs**

- **OpenWeatherMap API**: Real-time London weather
- **ExchangeRate API**: Currency conversion rates (150+ currencies)

### **Image Optimization**

- **WebP Format**: All images converted for faster loading
- **19 Menu Images**: High-quality Turkish dish photos

### **Development Tools**

- **W3C HTML Validator**: HTML5 validation
- **W3C CSS Validator**: CSS Level 3 validation
- **ValidateJavaScript.com**: JavaScript linting
- **Chrome Lighthouse**: Performance & accessibility audit
- **Nu Html Checker**: HTML validation

---

## 📌 Future Improvements

- Add more Turkish dishes (currently 18)
- Implement user accounts and order history
- Add payment integration (Stripe/PayPal)
- Multi-language support (Turkish, Arabic, German, etc.)
- Restaurant location map integration
- Nutritional information for dishes
- Allergenic information database
- Customer reviews and ratings
- Email order confirmation
- Performance optimization (code minification)

---

## 👤 Author

**Sefa Keles**

- GitHub: [sefa-keles](https://github.com/sefa-keles)
- Project: [FlavorTrail](https://github.com/sefa-keles/FlavorTrail)

---

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated**: January 18, 2026
