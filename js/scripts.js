'use strict';

const referenceList = document.querySelector('#reference-list');
const categoryNav = document.querySelector('#category-nav');
const searchInput = document.querySelector('#search');
const resultCount = document.querySelector('#result-count');
const emptyMessage = document.querySelector('#empty-message');
const printButton = document.querySelector('#print-button');

// Create an HTML element with an optional class and text.
function node(tag, className = '', text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

// Check whether a selector entry matches the search.
function matchesSearch(entry, query) {
  if (!query) return true;

  // Search all five fields of the selector entry.
  return entry.some(value =>
    String(value).toLowerCase().includes(query)
  );
}

// Render the reference cards.
function render(query = '') {
  const needle = query.trim().toLowerCase();

  referenceList.replaceChildren();
  categoryNav.replaceChildren();

  let total = 0;

  categories.forEach((category, index) => {

    // Filter individual selector entries.
    const entries = category.entries.filter(entry =>
      matchesSearch(entry, needle)
    );

    // Skip categories without matching selectors.
    if (entries.length === 0) return;

    const id = `category-${index}`;

    const section = node('section', 'category-section');
    section.id = id;

    section.append(
      node('h3', 'category-title', category.name)
    );

    const grid = node('div', 'selector-grid');

    entries.forEach(([selector, title, technical, plain, example]) => {

      const card = node('article', 'selector-card');

      card.append(
        node('code', 'selector-code', selector),
        node('h4', '', title)
      );

      const tech = node('p');
      tech.append(
        node('strong', '', 'What it means: '),
        document.createTextNode(technical)
      );
      card.append(tech);

      const translation = node('p');
      translation.append(
        node('strong', '', 'In plain English: '),
        document.createTextNode(plain)
      );
      card.append(translation);

      const sample = node('p', 'example');
      sample.append(
        node('span', 'detail-label', 'Example'),
        node('code', '', example)
      );
      card.append(sample);

      grid.append(card);
    });

    section.append(grid);
    referenceList.append(section);

    // Add a navigation link only for visible categories.
    const link = node('a', '', category.name);
    link.href = `#${id}`;

    categoryNav.append(link);

    total += entries.length;
  });

  // Update the number of results.
  if (resultCount) {
    resultCount.textContent = needle
      ? `${total} matching selector${total === 1 ? '' : 's'}`
      : `${total} selector${total === 1 ? '' : 's'} shown`;
  }

  // Show a message when nothing matches.
  if (emptyMessage) {
    emptyMessage.hidden = total !== 0;
  }
}

// Search as the student types.
if (searchInput) {
  searchInput.addEventListener('input', () => {
    render(searchInput.value);
  });
}

// Print the reference.
if (printButton) {
  printButton.addEventListener('click', () => {
    window.print();
  });
}

// Initial display.
render();