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
