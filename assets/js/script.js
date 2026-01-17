import { menuItems } from './data.js';

const menuContainer = document.getElementById('menu-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('input[type="search"]');


function renderMenu(items) {
  menuContainer.innerHTML = '';

  items.forEach(item => {
    const card = `
      <div class="col">
        <div class="card h-100 menu-card">
          <div class="ratio ratio-4x3">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
          </div>

          <div class="card-body">
            <h3 class="card-title mb-2">${item.name}</h3>
            <p class="card-text text-muted mb-3">
              ${item.description}
            </p>

            <div class="compare-section">
              <div class="text-end mb-2">
                <span class="fw-bold text-primary">
                  Price : £ ${item.price}
                </span>
              </div>

              <div class="d-flex align-items-center flex-wrap gap-2 mt-2 compare-row">
                <small class="text-light mb-0 compare-label">
                  Select Currency :
                </small>

                <div class="dropdown">
                  <button
                    class="btn btn-sm btn-outline-light dropdown-toggle compare-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Currency
                  </button>

                  <ul class="dropdown-menu"></ul>
                </div>
              </div>

              <div class="d-flex align-items-center gap-2 compare-result mt-1">
                <small class="text-light mb-0 compare-label">
                  Compared Price :
                </small>
                <span class="text-light small compare-value">
                  0.00
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    menuContainer.insertAdjacentHTML('beforeend', card);
  });
}

renderMenu(menuItems);

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

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

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();

  const activeButton = document.querySelector('.filter-btn.active');
  const category = activeButton ? activeButton.dataset.category : 'All';

  let filteredItems =
    category === 'All' ? menuItems : menuItems.filter(item => item.category === category);

  if (searchTerm) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  renderMenu(filteredItems);
});


