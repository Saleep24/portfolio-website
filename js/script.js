const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);
function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}


const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Enhanced theme switching function
function switchTheme(e) {
  // Check if the event exists (function might be called directly)
  const isChecked = e ? e.target.checked : toggleSwitch.checked;
  const theme = isChecked ? "dark" : "light";
  
  // Apply theme to document
  document.documentElement.setAttribute("data-theme", theme);
  
  // Store preference
  localStorage.setItem("theme", theme);
  
  // Add visual feedback
  const themeIcon = document.querySelector('.theme-switch');
  if (themeIcon) {
    themeIcon.classList.add('theme-changed');
    setTimeout(() => {
      themeIcon.classList.remove('theme-changed');
    }, 500);
  }
}

// Event listener for checkbox change
toggleSwitch.addEventListener("change", switchTheme, false);

// Check for saved user preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === "dark";
} else {
  // Set default based on user's system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDarkScheme) {
    toggleSwitch.checked = true;
    switchTheme(null); // Apply dark theme
  }
}

// Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    toggleSwitch.checked = e.matches;
    switchTheme(null);
  }
});


const myDate = document.querySelector("#datee");
const currentYear = new Date().getFullYear();
myDate.innerHTML = currentYear;


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


document.addEventListener('DOMContentLoaded', function() {
    const words = ["Saleep Shrestha", "a Developer", "a Creator", "a Researcher"];
    let wordIndex = 0;
    
    function typeWord(word) {
        const typingText = document.getElementById('typing-text');
        let charIndex = 0;
        

        typingText.textContent = '';
        

        function type() {
            if (charIndex < word.length) {
                typingText.textContent += word.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {

                setTimeout(deleteWord, 2000);
            }
        }
        

        function deleteWord() {
            if (typingText.textContent.length > 0) {
                typingText.textContent = word.substring(0, typingText.textContent.length - 1);
                setTimeout(deleteWord, 50);
            } else {

                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(() => typeWord(words[wordIndex]), 500);
            }
        }
        

        type();
    }
    

    typeWord(words[0]);
});


document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        

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


document.addEventListener('DOMContentLoaded', function() {

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


  const bubbles = document.querySelectorAll('.skill-bubble');
  const filters = document.querySelectorAll('.filter-btn');


  bubbles.forEach(bubble => {
    const size = parseInt(bubble.dataset.level) * 0.8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    repositionBubble(bubble);
  });


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


  function repositionBubble(bubble) {
    const container = document.querySelector('.skill-bubbles-container');
    const maxX = container.clientWidth - bubble.clientWidth;
    const maxY = container.clientHeight - bubble.clientHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    bubble.style.left = `${randomX}px`;
    bubble.style.top = `${randomY}px`;
  }


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


    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Name must be at least 2 characters long.';
      nameError.style.display = 'block';
      valid = false;
    } else {
      nameError.style.display = 'none';
    }


    if (!emailInput.value.includes('@')) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.style.display = 'block';
      valid = false;
    } else {
      emailError.style.display = 'none';
    }


    if (subjectInput.value.trim() === '') {
      subjectError.textContent = 'Subject cannot be empty.';
      subjectError.style.display = 'block';
      valid = false;
    } else {
      subjectError.style.display = 'none';
    }


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

document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

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

function initializeProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

// Skill tabs functionality
document.addEventListener('DOMContentLoaded', function() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillContents = document.querySelectorAll('.skill-content');
  
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      skillTabs.forEach(tab => tab.classList.remove('active'));
      skillContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding content
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // If radar chart is selected, make sure it's properly sized
      if (tabId === 'skill-radar' && window.radarChart) {
        window.radarChart.resize();
      }
      
      // If bubbles are selected, reposition them
      if (tabId === 'skill-bubbles') {
        const bubbles = document.querySelectorAll('.skill-bubble');
        bubbles.forEach(bubble => repositionBubble(bubble));
        
        // Make bubbles visible with a delay
        setTimeout(() => {
          bubbles.forEach((bubble, index) => {
            setTimeout(() => {
              bubble.classList.add('visible');
            }, index * 50);
          });
        }, 300);
      }
    });
  });
  
  // Enhanced radar chart configuration
  if (document.getElementById('skillsRadar')) {
    const ctx = document.getElementById('skillsRadar').getContext('2d');
    const skillsData = {
      labels: ['Languages', 'Data Science', 'Web Development', 'Problem Solving', 'Tools & Frameworks', 'Soft Skills'],
      datasets: [{
        label: 'Skill Level',
        data: [85, 90, 82, 88, 85, 90],
        backgroundColor: 'rgba(var(--primary-color-rgb), 0.2)',
        borderColor: 'rgba(var(--primary-color-rgb), 1)',
        pointBackgroundColor: 'rgba(var(--primary-color-rgb), 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(var(--primary-color-rgb), 1)'
      }]
    };

    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
      window.radarChart = new Chart(ctx, {
        type: 'radar',
        data: skillsData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: function(value) {
                  return value + '%';
                }
              },
              pointLabels: {
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart'
          }
        }
      });
    } else {
      console.warn('Chart.js is not loaded. Radar chart will not be displayed.');
    }
  }
  
  // Enhanced skill bubbles
  const bubbles = document.querySelectorAll('.skill-bubble');
  const filters = document.querySelectorAll('.filter-btn');

  // Position bubbles
  bubbles.forEach(bubble => {
    const size = parseInt(bubble.dataset.level) * 0.8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.fontSize = `${Math.max(12, size * 0.25)}px`;
    repositionBubble(bubble);
  });

  // Filter bubbles
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      
      // Update active filter button
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      // Show/hide bubbles with animation
      bubbles.forEach((bubble, index) => {
        bubble.classList.remove('visible');
        
        setTimeout(() => {
          if (category === 'all' || bubble.dataset.category === category) {
            bubble.classList.add('visible');
            repositionBubble(bubble); // Reposition when showing
          }
        }, 300);
      });
    });
  });

  // Improved bubble positioning function with overlap prevention
  function repositionBubble(bubble) {
    const container = document.querySelector('.skill-bubbles-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const bubbleSize = bubble.offsetWidth;
    
    // Calculate available space
    const maxX = containerRect.width - bubbleSize;
    const maxY = containerRect.height - bubbleSize;
    
    // Position attempt limit to prevent infinite loops
    let attempts = 0;
    let validPosition = false;
    let randomX, randomY;
    
    // Try to find non-overlapping position
    while (!validPosition && attempts < 50) {
      randomX = Math.random() * maxX;
      randomY = Math.random() * maxY;
      
      validPosition = true;
      
      // Check for overlap with other bubbles
      bubbles.forEach(otherBubble => {
        if (otherBubble !== bubble && otherBubble.classList.contains('visible')) {
          const otherRect = otherBubble.getBoundingClientRect();
          const otherX = otherBubble.offsetLeft;
          const otherY = otherBubble.offsetTop;
          const otherSize = otherBubble.offsetWidth;
          
          // Calculate distance between bubble centers
          const distance = Math.sqrt(
            Math.pow(randomX + bubbleSize/2 - (otherX + otherSize/2), 2) +
            Math.pow(randomY + bubbleSize/2 - (otherY + otherSize/2), 2)
          );
          
          // If bubbles overlap, position is not valid
          if (distance < (bubbleSize/2 + otherSize/2)) {
            validPosition = false;
          }
        }
      });
      
      attempts++;
    }
    
    // Apply position
    bubble.style.left = `${randomX}px`;
    bubble.style.top = `${randomY}px`;
    
    // Add subtle animation when repositioning
    bubble.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }
  
  // Make bubbles interactive with hover effects
  bubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
      bubble.style.zIndex = 10;
    });
    
    bubble.addEventListener('mouseleave', () => {
      setTimeout(() => {
        bubble.style.zIndex = 2;
      }, 300);
    });
  });
  
  // Add window resize handler to reposition bubbles
  window.addEventListener('resize', () => {
    const activeBubbles = document.querySelectorAll('.skill-bubble.visible');
    activeBubbles.forEach(bubble => repositionBubble(bubble));
  });
});
