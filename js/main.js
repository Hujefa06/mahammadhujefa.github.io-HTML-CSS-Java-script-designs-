/**
 * Main Client-side Script
 * Handles Search, Category Filtering, and Global Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initFilterTags();
  updateCardCounts();
});

/**
 * Initialize search filtering across program cards
 */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const clearBtn = document.querySelector('.clear-search-btn');
  const cards = document.querySelectorAll('.program-card');
  const noResults = document.querySelector('.no-results');

  if (!searchInput || !cards.length) return;

  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    // Check currently active category filter
    const activeFilter = document.querySelector('.filter-tag.active');
    const selectedCategory = activeFilter ? activeFilter.dataset.category : 'all';

    cards.forEach(card => {
      const title = (card.querySelector('.program-card-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.program-card-desc')?.textContent || '').toLowerCase();
      const badge = (card.querySelector('.exp-badge')?.textContent || '').toLowerCase();
      const cardCategory = card.dataset.category || '';

      const matchesQuery = query === '' || title.includes(query) || desc.includes(query) || badge.includes(query);
      const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

      if (matchesQuery && matchesCategory) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.add('visible');
      } else {
        noResults.classList.remove('visible');
      }
    }
  }

  searchInput.addEventListener('input', filterCards);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterCards();
      searchInput.focus();
    });
  }
}

/**
 * Initialize pill / category filtering
 */
function initFilterTags() {
  const tags = document.querySelectorAll('.filter-tag');
  const searchInput = document.querySelector('.search-input');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      if (searchInput) {
        // Trigger input event to re-filter with search query + category
        searchInput.dispatchEvent(new Event('input'));
      } else {
        const category = tag.dataset.category;
        const cards = document.querySelectorAll('.program-card');
        cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}

/**
 * Update program count badges if counters exist
 */
function updateCardCounts() {
  const counter = document.getElementById('programs-count');
  if (counter) {
    const cards = document.querySelectorAll('.program-card');
    counter.textContent = cards.length;
  }
}
