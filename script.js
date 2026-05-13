// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        navLinks.classList.remove('active');
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Scroll-triggered animations for elements that should appear on scroll
const scrollElements = document.querySelectorAll('.scroll-trigger');

const elementInView = (el, offset = 200) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 200)) {
      el.classList.add('scrolled');
    }
  });
};

window.addEventListener('load', handleScrollAnimation);
window.addEventListener('scroll', handleScrollAnimation);
// Hide navbar on scroll down, show on scroll up
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Project data
const projectData = {
  eskwela: {
    title: "E SKWELA",
    description: "A web-based Alternative Learning System (ALS) platform that manages student registration, grade level assessment, learning modules, class schedules, teacher assignments, and administrative approval workflows for out-of-school youth and adult learners. This platform aims to provide accessible education to those who cannot attend traditional schooling.",
    tech: "Django, SQLite3, HTML/CSS, JavaScript, FontAwesome, Bootstrap",
    image: "eskwela.png"
  },
  fincount: {
    title: "FINCOUNT",
    description: "An automated fingerling counting and forecasting system designed for BFAR hatcheries that streamlines the process of counting fish fingerlings using image processing and data analytics. The system improves counting accuracy, reduces manual labor, and provides forecasting reports to help monitor hatchery production and support better decision-making in aquaculture operations. The platform also includes a mobile application for accessible monitoring and management anytime and anywhere.",
    tech: "Python, PostgreSQL, Flutter, OpenCV, HTML/CSS, JavaScript, Bootstrap",
    image: "system1.png"
  },
  cupgame: {
    title: "CUP GAME",
    description: "Fast-paced and competitive party game where players aim to score points by successfully landing balls into cups while challenging opponents in exciting match rounds. The game promotes teamwork, focus, quick reflexes, and strategic gameplay, making it perfect for school events, tournaments, and friendly competitions. Designed with an engaging and energetic experience, players can enjoy score tracking, round-based matches, and interactive gameplay mechanics.",
    tech: "Python, Pygame, Tkinter, SQLite, JavaScript",
    image: "system2.png"
  }
};


// Get modal elements
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechSpan = document.getElementById('modalTech');
const closeModal = document.querySelector('.modal-close');

// Function to open modal
function openModal(projectId) {
  const project = projectData[projectId];
  if (project) {
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechSpan.textContent = project.tech;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Function to close modal
function closeModalFunc() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Add click event to all work cards
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't trigger if clicking on tags
    if (e.target.classList && e.target.classList.contains('work-tags')) {
      return;
    }
    const projectId = card.getAttribute('data-project');
    if (projectId) {
      openModal(projectId);
    }
  });
});

// Close modal when clicking X
if (closeModal) {
  closeModal.addEventListener('click', closeModalFunc);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModalFunc();
  }
});
// Horizontal scroll with drag
const scrollWrapper = document.querySelector('.certs-scroll-wrapper');
let isDown = false;
let startX;
let scrollLeft;

if (scrollWrapper) {
  scrollWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollWrapper.style.cursor = 'grabbing';
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
  });

  scrollWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    scrollWrapper.style.cursor = 'grab';
  });

  scrollWrapper.addEventListener('mouseup', () => {
    isDown = false;
    scrollWrapper.style.cursor = 'grab';
  });

  scrollWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    scrollWrapper.scrollLeft = scrollLeft - walk;
  });
}