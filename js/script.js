// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);
function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when a link is clicked
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Theme switching
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
toggleSwitch.addEventListener("change", switchTheme, false);

// Load user theme preference on page load
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === "dark";
}

// Display current year
const myDate = document.querySelector("#datee");
const currentYear = new Date().getFullYear();
myDate.innerHTML = currentYear;

// Form submission with Formspree
const contactForm = document.getElementById("contactForm");
const submitLoader = document.getElementById("submit-loader");
const successMessage = document.getElementById("message-success");
const warningMessage = document.getElementById("message-warning");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  submitLoader.style.display = "block";
  successMessage.style.display = "none";
  warningMessage.style.display = "none";

  fetch("https://formspree.io/f/mayznvpp", {
    method: "POST",
    body: new FormData(contactForm),
    headers: { "Accept": "application/json" }
  })
    .then((response) => {
      submitLoader.style.display = "none";
      if (response.ok) {
        successMessage.style.display = "block";
        contactForm.reset();
      } else {
        warningMessage.style.display = "block";
      }
    })
    .catch(() => {
      submitLoader.style.display = "none";
      warningMessage.style.display = "block";
    });
});

// Remove all previous typing code and replace with this
document.addEventListener('DOMContentLoaded', function() {
    const words = ["Saleep Shrestha", "a Developer", "a Creator", "a Researcher"];
    let wordIndex = 0;
    
    function typeWord(word) {
        const typingText = document.getElementById('typing-text');
        let charIndex = 0;
        
        // Clear the previous word
        typingText.textContent = '';
        
        // Type the word
        function type() {
            if (charIndex < word.length) {
                typingText.textContent += word.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                // Wait before starting to delete
                setTimeout(deleteWord, 2000);
            }
        }
        
        // Delete the word
        function deleteWord() {
            if (typingText.textContent.length > 0) {
                typingText.textContent = word.substring(0, typingText.textContent.length - 1);
                setTimeout(deleteWord, 50);
            } else {
                // Move to next word
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(() => typeWord(words[wordIndex]), 500);
            }
        }
        
        // Start typing
        type();
    }
    
    // Start the first word
    typeWord(words[0]);
});

// Update the skills animation code
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Animate progress bars
        const progressBars = entry.target.querySelectorAll('.progress');
        progressBars.forEach(bar => {
          const value = bar.getAttribute('data-value');
          bar.style.setProperty('--progress-width', `${value}%`);
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card').forEach((card) => {
    observer.observe(card);
  });
});

// Add this to your script.js
function calculateReadingTime() {
  const articles = document.querySelectorAll('.blog-content');
  const wordsPerMinute = 200;

  articles.forEach(article => {
    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const timeElement = article.closest('.blog-post').querySelector('.reading-time');
    if (timeElement) {
      timeElement.textContent = `${readingTime} min read`;
    }
  });
}

document.addEventListener('DOMContentLoaded', calculateReadingTime);

// Add to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Chart.js Radar Chart
  const ctx = document.getElementById('skillsRadar').getContext('2d');
  const skillsData = {
    labels: ['Languages', 'Data Science', 'Web Development', 'Problem Solving', 'Tools & Frameworks', 'Soft Skills'],
    datasets: [{
      label: 'Skill Level',
      data: [85, 90, 82, 88, 85, 90],
      backgroundColor: 'rgba(74, 144, 226, 0.2)',
      borderColor: 'rgba(74, 144, 226, 1)',
      pointBackgroundColor: 'rgba(74, 144, 226, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(74, 144, 226, 1)'
    }]
  };

  const radarChart = new Chart(ctx, {
    type: 'radar',
    data: skillsData,
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // Skill Bubbles Animation
  const bubbles = document.querySelectorAll('.skill-bubble');
  const filters = document.querySelectorAll('.filter-btn');

  // Position bubbles randomly
  bubbles.forEach(bubble => {
    const size = parseInt(bubble.dataset.level) * 0.8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    repositionBubble(bubble);
  });

  // Filter functionality
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      bubbles.forEach(bubble => {
        if (category === 'all' || bubble.dataset.category === category) {
          bubble.classList.add('visible');
        } else {
          bubble.classList.remove('visible');
        }
      });
    });
  });

  // Helper function to position bubbles
  function repositionBubble(bubble) {
    const container = document.querySelector('.skill-bubbles-container');
    const maxX = container.clientWidth - bubble.clientWidth;
    const maxY = container.clientHeight - bubble.clientHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    bubble.style.left = `${randomX}px`;
    bubble.style.top = `${randomY}px`;
  }

  // Show all bubbles initially
  setTimeout(() => {
    bubbles.forEach(bubble => bubble.classList.add('visible'));
  }, 100);
});

window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.projects-section');
  let scrollPosition = window.pageYOffset;
  parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Insert project details into the modal
    modalBody.innerHTML = `
      <h2>${this.dataset.title}</h2>
      <p>${this.dataset.description}</p>
      <img src="${this.dataset.image}" alt="${this.dataset.title}" style="width: 100%;">
    `;
    
    modal.style.display = 'block';
  });
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('projectModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  form.addEventListener('submit', function(event) {
    let valid = true;

    // Validate Name
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Name must be at least 2 characters long.';
      nameError.style.display = 'block';
      valid = false;
    } else {
      nameError.style.display = 'none';
    }

    // Validate Email
    if (!emailInput.value.includes('@')) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.style.display = 'block';
      valid = false;
    } else {
      emailError.style.display = 'none';
    }

    // Validate Subject
    if (subjectInput.value.trim() === '') {
      subjectError.textContent = 'Subject cannot be empty.';
      subjectError.style.display = 'block';
      valid = false;
    } else {
      subjectError.style.display = 'none';
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Message cannot be empty.';
      messageError.style.display = 'block';
      valid = false;
    } else {
      messageError.style.display = 'none';
    }

    if (!valid) {
      event.preventDefault();
    }
  });
});

// Back to Top functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Show button when user scrolls down 300px
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Add to your existing JavaScript
function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar');
        const percentage = progressBar.getAttribute('data-progress');
        progressBar.style.width = `${percentage}%`;
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateSkills);

// Add to your JavaScript
function initializeProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projects.forEach(project => {
        if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeProjectFilters);
