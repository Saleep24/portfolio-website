
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});


const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = `rgba(var(--bg-primary-rgb), 0.95)`;
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = `rgba(var(--bg-primary-rgb), 0.85)`;
    navbar.style.boxShadow = 'none';
  }
}); 

/* Skill Progress Bars */
.skill-progress {
  height: 35px;
  background: rgba(51, 51, 51, 0.1);
  border-radius: 18px;
  margin: 1.2rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #4a90e2 0%, #5cb85c 100%);
  position: absolute;
  transition: width 1.5s ease-in-out;
  border-radius: 18px;
}

.progress-text {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* Dark mode adjustments */
[data-theme="dark"] .skill-progress {
  background: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .progress-text {
  color: #333;
}