const sections = document.querySelectorAll('.page-section');
const navSelect = document.getElementById('navSelect');

// Map page numbers to class selectors
const pageMap = {
  1: '.container',
  2: '.second-slide',
  3: '.details-slide',
  4: '.fourth-slide',
  5: '.fifth-slide',
  6: '.six-slide',
  7: '.seven-slide',
  8: '.eight-slide',
  9: '.nine-slide',
  10: '.ten-slide',
  11: '.eleven-slide',
  12: '.tweleve-slide'
};

// Mapping of class selectors to their corresponding vertical line classes
const classMap = {
  '.container': 'bullseye-mask',
  '.second-slide': 'vertical-line',
  '.details-slide': 'details-vertical-line',
  '.fourth-slide': 'fourth-vertical-line',
  '.fifth-slide': 'fifth-vertical-line',
  '.six-slide': 'six-vertical-line',
  '.seven-slide': 'seven-vertical-line',
  '.eight-slide': 'eight-vertical-line',
  '.nine-slide': 'nine-vertical-line',
  '.ten-slide': 'ten-vertical-line',
  '.eleven-slide': 'eleven-vertical-line',
  '.tweleve-slide': 'tweleve-vertical-line'
};

// Function to show only the selected slide and handle vertical line activation
function showOnlySelected(selector) {
  // Show only the section with the matching class
  sections.forEach(section => {
    const hasClass = section.classList.contains(selector.replace('.', ''));
    section.classList.toggle('visible', hasClass);
  });

  // Deactivate all vertical lines
  Object.values(classMap).forEach(className => {
    document.querySelectorAll('.' + className).forEach(line => {
      line.classList.remove('active');
    });
  });

  // Activate the corresponding vertical line
  const activeClass = classMap[selector];
  if (activeClass) {
    const line = document.querySelector('.' + activeClass);
    if (line) line.classList.add('active');
  }

  // Set dropdown value if needed
  if (navSelect && navSelect.value !== selector) {
    navSelect.value = selector;
  }
}

// Initialize on load
if (navSelect) {
  showOnlySelected(navSelect.value);
}

// Dropdown change event listener to update the selected page
if (navSelect) {
  navSelect.addEventListener('change', function () {
    showOnlySelected(this.value);
  });
}

// Listeners for input fields with IDs like page-1 to page-12
for (let i = 1; i <= 12; i++) {
  const container = document.getElementById(`page-${i}`);
  if (container) {
    const input = container.querySelector('input[type="number"]');
    if (input) {
      input.addEventListener('change', function () {
        const pageNumber = parseInt(this.value, 10);
        const selector = pageMap[pageNumber];
        if (selector) {
          showOnlySelected(selector);
        }
      });
    }
  }
}

// Page number input
const input = document.querySelector('.pageInput');

const slideClassMap = {
  1: 'second-slide',
  2: 'details-slide',
  3: 'fourth-slide',
  4: 'fifth-slide',
  5: 'six-slide',
  6: 'seven-slide',
  7: 'eight-slide',
  8: 'nine-slide',
  9: 'ten-slide',
  10: 'eleven-slide',
  11: 'tweleve-slide'
};

const verticalLineClassMap = {
  1: 'vertical-line',
  2: 'details-vertical-line',
  3: 'fourth-vertical-line',
  4: 'fifth-vertical-line',
  5: 'six-vertical-line',
  6: 'seven-vertical-line',
  7: 'eight-vertical-line',
  8: 'nine-vertical-line',
  9: 'ten-vertical-line',
  10: 'eleven-vertical-line',
  11: 'tweleve-vertical-line'
};

// Function to show the specific slide and vertical line based on page number
function showSlideByPage(page) {
  const targetClass = slideClassMap[page];
  const verticalClass = verticalLineClassMap[page];
  if (!targetClass || !verticalClass) return;

  // Hide all slides
  Object.values(slideClassMap).forEach(cls => {
    const el = document.querySelector(`.${cls}`);
    if (el) el.classList.remove('visible');
  });

  // Hide all vertical lines
  Object.values(verticalLineClassMap).forEach(cls => {
    const vl = document.querySelector(`.${cls}`);
    if (vl) vl.classList.remove('active');
  });

  // Show target slide
  const target = document.querySelector(`.${targetClass}`);
  if (target) target.classList.add('visible');

  // Show corresponding vertical line
  const vertical = document.querySelector(`.${verticalClass}`);
  if (vertical) vertical.classList.add('active');

  // Keep input synced
  input.value = page;
}

// Event listeners
input.addEventListener('input', () => {
  const page = parseInt(input.value);
  if (!isNaN(page)) {
    showSlideByPage(page);
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const page = parseInt(input.value);
    if (!isNaN(page)) {
      showSlideByPage(page);
    }
  }
});

sections.forEach(section => {
  section.addEventListener('transitionend', () => {
    if (section.classList.contains('visible')) {
      for (let i = 1; i <= 11; i++) {
        if (section.classList.contains(slideClassMap[i])) {
          input.value = i;
          break;
        }
      }
    }
  });
});