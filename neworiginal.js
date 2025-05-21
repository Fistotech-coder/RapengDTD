if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const circle = document.getElementById('circle');
const bgVideo = document.getElementById('bgVideo');
const bullseyeMask = document.getElementById('bullseyeMask');
const body = document.body;
const navbar = document.getElementById('navbar');
const centerImage = document.querySelector('.center-image');
const textTop = document.querySelector('.text:first-child');
const textBottom = document.querySelector('.text:last-child');
const valveLetter = document.querySelector('.valve-letter');

// Slides and vertical lines
const slides = [
  { slide: document.getElementById('secondSlide'), line: document.getElementById('verticalLine'), flag: 'hasShownSecondSlide', done: 'secondSlideAnimationCompleted' },
  { slide: document.getElementById('detailsSlide'), line: document.querySelector('#detailsSlide .details-vertical-line'), flag: 'hasShownDetailsSlide', done: 'detailsSlideAnimationCompleted' },
  { slide: document.getElementById('fourthSlide'), line: document.querySelector('#fourthSlide .fourth-vertical-line'), flag: 'hasShownFourthSlide', done: 'fourthSlideAnimationCompleted' },
  { slide: document.getElementById('fifthSlide'), line: document.querySelector('#fifthSlide .fifth-vertical-line'), flag: 'hasShownFifthSlide', done: 'fifthSlideAnimationCompleted' },
  { slide: document.getElementById('sixSlide'), line: document.querySelector('#sixSlide .six-vertical-line'), flag: 'hasShownSixSlide', done: 'sixSlideAnimationCompleted' },
  { slide: document.getElementById('sevenSlide'), line: document.querySelector('#sevenSlide .seven-vertical-line'), flag: 'hasShownSevenSlide', done: 'sevenSlideAnimationCompleted' },
  { slide: document.getElementById('eightSlide'), line: document.querySelector('#eightSlide .eight-vertical-line'), flag: 'hasShownEightSlide', done: 'eightSlideAnimationCompleted' },
  { slide: document.getElementById('nineSlide'), line: document.querySelector('#nineSlide .nine-vertical-line'), flag: 'hasShownNineSlide', done: 'nineSlideAnimationCompleted' },
  { slide: document.getElementById('tenSlide'), line: document.querySelector('#tenSlide .ten-vertical-line'), flag: 'hasShownTenSlide', done: 'tenSlideAnimationCompleted' },
  { slide: document.getElementById('elevenSlide'), line: document.querySelector('#elevenSlide .eleven-vertical-line'), flag: 'hasShownElevenSlide', done: 'elevenSlideAnimationCompleted' },
  { slide: document.getElementById('tweleveSlide'), line: document.querySelector('#tweleveSlide .tweleve-vertical-line'), flag: 'hasShownTweleveSlide', done: 'tweleveSlideAnimationCompleted' }
];

const animationFlags = {
  hasAnimatedV: false,
  textAnimationCompleted: false
};

slides.forEach(s => {
  animationFlags[s.flag] = false;
  animationFlags[s.done] = false;
});

textBottom.addEventListener('transitionend', () => animationFlags.textAnimationCompleted = true);
slides.forEach(s => {
  s.slide?.addEventListener('transitionend', () => {
    animationFlags[s.done] = true;
    if (s.slide?.classList.contains('slide-out')) {
      s.slide.classList.remove('visible', 'slide-out');
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // V animation
  if (scrollY > 350 && !animationFlags.hasAnimatedV) {
    animationFlags.hasAnimatedV = true;

    circle.classList.add('zoom-out');
    bullseyeMask.classList.add('zoom-out');
    bgVideo.style.opacity = 0;
    body.classList.add('gray-bg');

    setTimeout(() => {
      navbar.style.display = 'flex';
      navbar.classList.add('visible');

      centerImage.classList.add('fade-out');
      textTop.classList.add('scroll-to-top');
      textBottom.classList.add('scroll-to-top');

      valveLetter.classList.add('draw-line');
      textBottom.classList.add('center-valve-text');
    }, 2000);
  }

  // Slides animation (including reverse)
  let baseScroll = 280;
  slides.forEach((s, index) => {
    const offset = baseScroll + index * 500;
    if (scrollY > offset && animationFlags[s.flag] === false) {
      const prevFlag = index === 0 ? 'textAnimationCompleted' : slides[index - 1].done;
      if (animationFlags[prevFlag]) {
        animationFlags[s.flag] = true;
        s.slide?.classList.add('visible');
        s.line?.classList.add('active');
      }
    } else if (scrollY <= offset && animationFlags[s.flag] === true) {
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;

      // Start reverse animation
      s.slide?.classList.add('slide-out');
      s.line?.classList.remove('active');
    }
  });

  // Reset on top scroll
  if (scrollY <= 100 && animationFlags.hasAnimatedV) {
    animationFlags.hasAnimatedV = false;

    circle.classList.remove('zoom-out');
    bullseyeMask.classList.remove('zoom-out');
    bgVideo.style.opacity = 1;
    body.classList.remove('gray-bg');
    navbar.classList.remove('visible');

    setTimeout(() => {
      navbar.style.display = 'none';
    }, 500);

    centerImage.classList.remove('fade-out');
    textTop.classList.remove('scroll-to-top');
    textBottom.classList.remove('scroll-to-top');

    valveLetter.classList.remove('draw-line');
    textBottom.classList.remove('center-valve-text');

    animationFlags.textAnimationCompleted = false;

    slides.forEach(s => {
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;
      s.slide?.classList.remove('visible', 'slide-out');
      s.line?.classList.remove('active');
    });
  }
});

console.log(window.innerHeight);

const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");
const magnifier = document.getElementById("magnifier");
const zoomedVideo = document.getElementById("zoomedVideo");

// Sync zoomed video with main video
video.addEventListener("play", () => zoomedVideo.play());
video.addEventListener("pause", () => zoomedVideo.pause());
video.addEventListener("timeupdate", () => {
  zoomedVideo.currentTime = video.currentTime;
});

// Mousemove event to update magnifier and zoomed video position
videoContainer.addEventListener("mousemove", (e) => {
  const { left, top, width, height } = videoContainer.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;

  console.log(`Mouse Position: x = ${x}, y = ${y}`); // Debugging mouse position

  magnifier.style.left = `${x}px`;
  magnifier.style.top = `${y}px`;
  magnifier.style.display = "block"; // Show the magnifier on mouse move

  const scale = 2; // Zoom factor
  zoomedVideo.style.width = `${width * scale}px`;
  zoomedVideo.style.height = `${height * scale}px`;
  zoomedVideo.style.left = `-${x * scale - magnifier.offsetWidth / 2}px`;
  zoomedVideo.style.top = `-${y * scale - magnifier.offsetHeight / 2}px`;

  // Debugging visibility
  console.log("Magnifier visibility:", magnifier.style.display);
});

// Hide magnifier when mouse leaves video container
videoContainer.addEventListener("mouseleave", () => {
  magnifier.style.display = "none";
});



function handleScrollAnimation(element, showClass, hideClass) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight;
  var isVisible = rect.top < windowHeight && rect.bottom >= 0;

  if (isVisible) {
    if (!element.classList.contains(showClass)) {
      element.classList.add(showClass);
    }
    element.classList.remove(hideClass);
  } else {
    if (!element.classList.contains(hideClass)) {
      element.classList.add(hideClass);
    }
    element.classList.remove(showClass);
  }
}

window.addEventListener("scroll", function () {
  var sections = [
    { selector: ".second-slide", in: "slide-in", out: "slide-out" },
    { selector: ".details-slide", in: "fade-in", out: "fade-out" },
    { selector: ".fourth-slide", in: "zoom-in", out: "zoom-out" }
  ];

  sections.forEach(item => {
    const element = document.querySelector(item.selector);
    if (element) {
      handleScrollAnimation(element, item.in, item.out);
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const valveImage = document.querySelector('.valve-image1');
  const segments = document.querySelectorAll('.circle-segment');
  const detailsDescription = document.querySelector('.details-description1');
  const featureList = detailsDescription.querySelector('.feature-list');
  const diverterTitle = document.querySelector('.standard-diverter-text');

  const originalColors = {
    'segment-dtd': '#1B7AC8',
    'segment-btm': '#448CDF',
    'segment-valve': '#74B2ED',
    'segment-sdtd': '#024591'
  };

  const originalTransforms = {
    'segment-dtd': 'rotate(0deg)',
    'segment-btm': 'rotate(90deg)',
    'segment-valve': 'rotate(180deg)',
    'segment-sdtd': 'rotate(270deg)'
  };

  const valveMap = {
    'segment-dtd': {
      image: './images/DTDnew.png',
      title: 'Drum Type Diverter (DTD)',
      description: [
        'It is used with DT type RV',
        'It is a transition piece connecting the RV outlet to the conveying line',
        'It has a flange connection (available in DIN / ANSI / JIS) on the top and pipe connection (available in different sizes) on the bottom',
        'Available in mild steel & stainless steel construction'
      ]
    },
    'segment-btm': {
      image: './images/Ytype.png',
      title: 'Flap Type Diverter - (Y-valve)',
      description: [
        'Sliding Rails option in RV is very useful for cleaning of valve with ease and less effort',
        'It is available for Exec.2 and dairy versions'
      ]
    },
    'segment-valve': {
      image: './images/SDTD.png',
      title: 'Single Drum Type Diverter (SDTD)',
      description: [
        'It is used with DT type RV',
        'It is a transition piece connecting the RV outlet to the conveying line',
        'It has a flange connection (available in DIN / ANSI / JIS) on the top and pipe connection (available in different sizes) on the bottom',
        'Available in mild steel & stainless steel construction'
      ]
    },
    'segment-sdtd': {
      image: './images/BDV.png',
      title: 'BDV Diverter',
      description: [
        'It is used with DT type RV',
        'It is a transition piece connecting the RV outlet to the conveying line',
        'It has a flange connection (available in DIN / ANSI / JIS) on the top and pipe connection (available in different sizes) on the bottom',
        'Available in mild steel & stainless steel construction'
      ]
    }
  };

  function handleSegmentClick(segment) {
    // Reset all segments to default color and scale
    segments.forEach(seg => {
      for (let key in originalColors) {
        if (seg.classList.contains(key)) {
          seg.style.backgroundColor = originalColors[key];
          seg.style.transform = `${originalTransforms[key]} scale(1)`;
        }
      }
    });

    // Apply dark color and scale to clicked segment
    for (let key in originalTransforms) {
      if (segment.classList.contains(key)) {
        segment.style.backgroundColor = '#1B1B1B';
        segment.style.transform = `${originalTransforms[key]} scale(1.1)`;
      }
    }

    // Update valve image and details
    for (let key in valveMap) {
      if (segment.classList.contains(key)) {
        valveImage.src = valveMap[key].image;
        diverterTitle.innerHTML = `<div class="red-dot"></div> ${valveMap[key].title}`;

        featureList.innerHTML = '';
        valveMap[key].description.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<img src="./images/Vector.png" alt=""> ${item}`;
          featureList.appendChild(listItem);
        });

        detailsDescription.style.display = 'block';
      }
    }
  }

  // Make labels clickable
  const labelMap = {
    'label-dtd': 'segment-dtd',
    'label-btm': 'segment-btm',
    'label-valve': 'segment-valve',
    'label-sdtd': 'segment-sdtd'
  };

  Object.keys(labelMap).forEach(labelClass => {
    const label = document.querySelector(`.${labelClass}`);
    const segmentClass = labelMap[labelClass];
    label.style.cursor = 'pointer';
    label.addEventListener('click', () => {
      const segment = document.querySelector(`.circle-segment.${segmentClass}`);
      if (segment) {
        handleSegmentClick(segment);
      }
    });
  });

  // Make segments clickable
  segments.forEach(segment => {
    segment.style.cursor = 'pointer';
    segment.addEventListener('click', () => handleSegmentClick(segment));
  });

  // ✅ Default: BDV is selected and scaled
  const defaultSegment = document.querySelector('.segment-sdtd');
  if (defaultSegment) {
    handleSegmentClick(defaultSegment);
  }
});


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







