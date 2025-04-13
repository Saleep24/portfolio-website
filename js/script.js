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


function switchTheme(e) {

  const isChecked = e ? e.target.checked : toggleSwitch.checked;
  const theme = isChecked ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", theme);

  localStorage.setItem("theme", theme);
  

  const themeIcon = document.querySelector('.theme-switch');
  if (themeIcon) {
    themeIcon.classList.add('theme-changed');
    setTimeout(() => {
      themeIcon.classList.remove('theme-changed');
    }, 500);
  }
}


toggleSwitch.addEventListener("change", switchTheme, false);


const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === "dark";
} else {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDarkScheme) {
    toggleSwitch.checked = true;
    switchTheme(null); 
  }
}

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


document.addEventListener('DOMContentLoaded', function() {
  initSkillTabs();
});

function initSkillTabs() {
  console.clear();
  console.log('🚀 Initializing skill tabs with direct DOM manipulation...');
  

  const tabs = document.querySelectorAll('.skill-tab');
  const contents = document.querySelectorAll('.skill-content');
  
  if (!tabs.length || !contents.length) {
    console.error('❌ Could not find skill tabs or content panels!');
    return;
  }
  
  console.log(`✅ Found ${tabs.length} tabs and ${contents.length} content panels`);
  

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      
      console.log(`🔍 Tab clicked: ${targetId}`);
      
      if (!targetContent) {
        console.error(`❌ Target content #${targetId} not found!`);
        return;
      }
      
 
      tabs.forEach(t => {
        t.classList.remove('active');
        console.log(`📋 Removed active class from tab: ${t.getAttribute('data-tab')}`);
      });
      
      contents.forEach(c => {
        c.classList.remove('active');
        console.log(`📋 Removed active class from content: ${c.id}`);
      });

      this.classList.add('active');
      targetContent.classList.add('active');
      
      console.log(`✅ Activated tab: ${targetId} and corresponding content`);

      if (targetId === 'skill-radar') {
        initRadarChart();
      } else if (targetId === 'skill-bubbles') {
        initSkillBubbles();
      }
    });
  });
  

  console.log('🔄 Setting initial tab...');
  setTimeout(() => {
    if (tabs[0]) {
      console.log('🔄 Clicking first tab...');
      tabs[0].click();
    }
  }, 100);
}

function initRadarChart() {
  console.log('📊 Initializing radar chart...');
  
  const canvas = document.getElementById('skillsRadar');
  if (!canvas) {
    console.error('❌ Radar chart canvas not found!');
    return;
  }
  
  const ctx = canvas.getContext('2d');

  if (typeof Chart === 'undefined') {
    console.error('❌ Chart.js library not loaded!');
    return;
  }
  

  if (window.radarChart) {
    window.radarChart.destroy();
    console.log('🔄 Destroyed existing radar chart');
  }
  

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
  
  console.log('✅ Radar chart initialized');
}

function initSkillBubbles() {
  console.log('🔵 Initializing skill bubbles with category colors...');
  
  const container = document.querySelector('.skill-bubbles-container');
  const bubbles = document.querySelectorAll('.skill-bubble');
  const filters = document.querySelectorAll('.skill-filters .filter-btn');
  
  if (!container || !bubbles.length) {
    console.error('❌ Skill bubbles container or bubbles not found!');
    return;
  }
  
  console.log(`✅ Found ${bubbles.length} skill bubbles`);
  
  // Hide all bubbles initially
  bubbles.forEach(bubble => {
    bubble.classList.remove('visible');
  });
  
  // Calculate size and position for each bubble
  bubbles.forEach(bubble => {
    // Get bubble text and skill level
    const text = bubble.textContent.trim();
    const skillLevel = parseInt(bubble.dataset.level);
    const category = bubble.dataset.category;
    
    // Calculate size based on text length and skill level
    const textWidth = text.length * 10;
    
    // Calculate base size from skill level and text width
    let size = Math.max(textWidth * 1.2, skillLevel * 0.9);
    
    // Ensure minimum and maximum size
    size = Math.max(size, 70); 
    size = Math.min(size, 150);
    
    // Set bubble size
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Calculate font size based on text length and bubble size
    const fontSize = Math.max(10, Math.min(16, size / (Math.max(text.length / 1.5, 3))));
    bubble.style.fontSize = `${fontSize}px`;
    
    // Add padding for longer text
    bubble.style.padding = `${Math.max(8, text.length * 0.5)}px`;
    
    // Add a subtle animation delay for staggered appearance
    setTimeout(() => {
      positionBubble(bubble, container, bubbles);
      bubble.classList.add('visible');
    }, Math.random() * 500);
  });
  
  // Filter button functionality
  filters.forEach(filter => {
    // Add initial highlight to match button color with category
    const filterCategory = filter.getAttribute('data-filter');
    if (filterCategory !== 'all') {
      filter.style.borderBottom = `2px solid ${getCategoryColor(filterCategory)}`;
    }
    
    filter.addEventListener('click', function() {
      const category = this.getAttribute('data-filter');
      
      console.log(`🔍 Filter clicked: ${category}`);
      
      // Update active state
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      // Hide all bubbles first
      bubbles.forEach(bubble => {
        bubble.classList.remove('visible');
      });
      
      // Show matching bubbles with staggered animation
      setTimeout(() => {
        bubbles.forEach((bubble, index) => {
          if (category === 'all' || bubble.dataset.category === category) {
            setTimeout(() => {
              positionBubble(bubble, container, bubbles);
              bubble.classList.add('visible');
              
              // Add a subtle scale animation
              bubble.style.transform = 'scale(1.05)';
              setTimeout(() => {
                bubble.style.transform = 'scale(1)';
              }, 300);
            }, index * 50);
          }
        });
      }, 300);
    });
  });
  
  // Activate the first filter by default
  console.log('🔄 Activating first filter...');
  setTimeout(() => {
    if (filters[0]) {
      filters[0].click();
    }
  }, 100);
  
  console.log('✅ Skill bubbles initialized with category colors');
}

// Helper function to get color based on category
function getCategoryColor(category) {
  switch(category) {
    case 'languages':
      return '#2196f3';
    case 'data-science':
      return '#9c27b0';
    case 'web-dev':
      return '#e91e63';
    case 'tools':
      return '#00bcd4';
    default:
      return '#4a90e2';
  }
}

function positionBubble(bubble, container, allBubbles) {
  if (!container) return;
  
  const containerRect = container.getBoundingClientRect();
  const bubbleSize = parseInt(bubble.style.width);
  
 
  const margin = 20; 
  const maxX = containerRect.width - bubbleSize - margin;
  const maxY = containerRect.height - bubbleSize - margin;
  
  let posX = margin + Math.random() * maxX;
  let posY = margin + Math.random() * maxY;
  

  let attempts = 0;
  let collision = true;
  
  while (collision && attempts < 30) {
    collision = false;
    
    allBubbles.forEach(otherBubble => {
      if (otherBubble !== bubble && otherBubble.classList.contains('visible')) {
        const otherX = parseInt(otherBubble.style.left) || 0;
        const otherY = parseInt(otherBubble.style.top) || 0;
        const otherSize = parseInt(otherBubble.style.width) || 0;
        

        const dx = posX - otherX;
        const dy = posY - otherY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        

        const minDistance = (bubbleSize + otherSize) / 2 + 10;
        

        if (distance < minDistance) {
          collision = true;
        }
      }
    });

    if (collision) {
      posX = margin + Math.random() * maxX;
      posY = margin + Math.random() * maxY;
      attempts++;
    }
  }
  

  if (collision) {
    console.log('⚠️ Could not find non-colliding position for bubble after 30 attempts');

    posX += Math.random() * 30 - 15;
    posY += Math.random() * 30 - 15;
  }
  

  posX = Math.max(margin, Math.min(maxX, posX));
  posY = Math.max(margin, Math.min(maxY, posY));
  

  bubble.style.left = `${posX}px`;
  bubble.style.top = `${posY}px`;
}

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


document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing all interactive elements...');
  

  setTimeout(function() {
    const firstTab = document.querySelector('.skill-tab');
    if (firstTab) {
      console.log('Activating first tab...');
      firstTab.click();
    }
    

    const firstFilter = document.querySelector('.skill-filters .filter-btn');
    if (firstFilter) {
      console.log('Activating first filter...');
      firstFilter.click();
    }
  }, 500); 
});
