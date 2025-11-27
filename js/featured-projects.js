const featuredProjects = [
  {
    id: "h4d-recruit-vision",
    title: "Hacking For Defense",
    subtitle: "US Marine Corps · Developer · Researcher",
    description:
      "Developed a GIS-based congressional district mapping system for the U.S. Marine Corps that automatically geocodes addresses, assigns recruits to districts, and visualizes trends for planning. It helps the Congress analyze territories and allocate resources more efficiently.",
    imageSrc: ["assets/project/H4D.jpeg", "assets/project/saleep%20tank.jpeg"],
    videoSrc: null, // Showing image only in the card
    modalVideoSrc: "assets/project/RecruitVisionJourney.mp4",
    isVideoEmbed: false,
    tech: ["Python", "GIS", "Data Analysis", "Mapping"],
    links: [
      {
        label: "Journey Video",
        action: "modal",
        icon: "fas fa-play-circle"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/posts/saleepshrestha_h4d-ds4d-marinecorps-activity-7323896829975158784-xP4_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHtAuQBp2ES-2cY5NApH-x2JX4tc4fkCFE",
        icon: "fab fa-linkedin"
      }
    ]
  },
  {
    id: "exium",
    title: "Exium",
    subtitle: "Co-founder · Full-stack Dev",
    description:
      "Built a modern proctoring and learning-gamification platform that helps students study smarter while ensuring academic integrity. The system offers secure exam monitoring, AI-driven feedback, and engaging game-style learning tools to improve performance and motivation.",
    imageSrc: "assets/project/Exium-logo.jpeg",
    videoSrc: "assets/project/Exium%20Demo%20Video.mp4",
    modalVideoSrc: "assets/project/Exium%20Demo%20Video.mp4",
    isVideoEmbed: false,
    tech: ["React", "Node.js", "TypeScript", "Cloud"],
    links: [
      {
        label: "View Demo",
        action: "modal",
        icon: "fas fa-play-circle"
      }
    ]
  },
  {
    id: "mrgrammar",
    title: "MrGrammar",
    subtitle: "AI Grammar Agent · Chrome Extension",
    description:
      "A lightweight browser extension that fixes grammar and polishes text with one-click using OpenAI’s latest models. Works with Linkedin, Gmail, Slack, Google Docs, Word and many more",
    imageSrc: "assets/project/mrgrammar.png",
    videoSrc: "assets/project/Mr%20Grammar.mov",
    isVideoEmbed: false,
    mediaClickLink: "https://chromewebstore.google.com/detail/jpecnjmadbehcdpnlfdoobfbohajpdel?utm_source=item-share-cb",
    tech: ["JavaScript", "Chrome Extension", "OpenAI API"],
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/jpecnjmadbehcdpnlfdoobfbohajpdel?utm_source=item-share-cb",
        icon: "fab fa-chrome"
      }
    ]
  }
];

function renderFeaturedProjects() {
  const container = document.getElementById("featured-spotlight-container");
  if (!container) return;

  // Inject modal HTML once
  injectModalHtml();

  container.innerHTML = featuredProjects.map((project, index) => {
    const layoutClass = index % 2 === 0 ? "project-slide--layout-a" : "project-slide--layout-b";
    
    // Generate Buttons
    const linksHtml = project.links.map(link => {
      if (link.action === "modal") {
        // Special button for opening modal
        return `
          <button 
            class="btn btn-primary" 
            onclick="openVideoModal('${project.modalVideoSrc}')"
          >
            ${link.icon ? `<i class="${link.icon}" style="margin-right:8px;"></i>` : ''}
            ${link.label}
          </button>
        `;
      } else {
        // Standard Link
        return `
          <a class="btn btn-primary" href="${link.href}" target="_blank" rel="noopener">
            ${link.icon ? `<i class="${link.icon}" style="margin-right:8px;"></i>` : ''}
            ${link.label}
          </a>
        `;
      }
    }).join("");

    const techHtml = project.tech.map(t => `<span class="tech-chip">${t}</span>`).join("");

    // Determine Click Action for Media Container
    let mediaWrapperAttrs = "";
    let mediaWrapperClass = "";

    if (project.modalVideoSrc) {
      mediaWrapperAttrs = `onclick="openVideoModal('${project.modalVideoSrc}')"`;
      mediaWrapperClass = "clickable-media";
    } else if (project.mediaClickLink) {
      mediaWrapperAttrs = `onclick="window.open('${project.mediaClickLink}', '_blank')"`;
      mediaWrapperClass = "clickable-media";
    }

    // Determine Media Content (Video, Iframe, Static Image, or Image Row)
    let mediaHtml;
    if (project.videoSrc) {
      if (project.isVideoEmbed) {
        mediaHtml = `
          <iframe 
            class="project-iframe" 
            src="${project.videoSrc}" 
            title="${project.title} Video" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>`;
      } else {
        mediaHtml = `
          <video
            class="project-video"
            src="${project.videoSrc}"
            poster="${project.imageSrc}"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>`;
      }
    } else if (Array.isArray(project.imageSrc)) {
        // Multiple images side-by-side
        mediaHtml = `
        <div class="project-image-row">
            ${project.imageSrc.map(src => `
                <div class="project-image-split-container">
                    <img class="project-image-split" src="${src}" alt="${project.title}" />
                </div>
            `).join('')}
        </div>`;
    } else {
      // No videoSrc => Render Static Image
      mediaHtml = `
        <img 
          class="project-image-static" 
          src="${project.imageSrc}" 
          alt="${project.title}" 
        />
      `;
    }

    return `
      <section class="project-slide ${layoutClass}" id="slide-${project.id}">
        <div class="project-slide-content">
          <div class="project-text">
            <p class="project-kicker">Featured Project</p>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-subtitle">${project.subtitle}</p>
            <p class="project-description">${project.description}</p>

            <div class="project-tech-list">
              ${techHtml}
            </div>

            <div class="project-links">
              ${linksHtml}
            </div>
          </div>

          <div class="project-media">
            <div class="project-video-wrapper ${mediaWrapperClass}" ${mediaWrapperAttrs}>
              ${mediaHtml}
            </div>
          </div>
        </div>
      </section>
    `;
  }).join("");

  initObserver();
}

function injectModalHtml() {
  // Prevent duplicates
  if (document.getElementById('videoModalOverlay')) return;

  const modalHtml = `
    <div id="videoModalOverlay" class="video-modal-overlay" onclick="closeVideoModal(event)">
      <div class="video-modal-container">
        <button class="video-modal-close" onclick="closeVideoModal(null)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <video id="modalVideoPlayer" class="video-modal-video" controls playsinline>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openVideoModal(src) {
  const modal = document.getElementById('videoModalOverlay');
  const video = document.getElementById('modalVideoPlayer');
  
  if (modal && video) {
    video.src = src;
    modal.classList.add('open');
    video.play().catch(e => console.log("Play failed:", e));
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closeVideoModal(event) {
  // If triggered by event, check if click was on overlay (outside container)
  if (event && !event.target.classList.contains('video-modal-overlay')) return;

  const modal = document.getElementById('videoModalOverlay');
  const video = document.getElementById('modalVideoPlayer');

  if (modal && video) {
    modal.classList.remove('open');
    setTimeout(() => {
      video.pause();
      video.src = ""; // Clear source to stop buffering
    }, 300); // Wait for transition
    document.body.style.overflow = ''; // Restore scrolling
  }
}

function initObserver() {
  const observerOptions = {
    root: null, // viewport
    threshold: 0.4 // 40% of the slide visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const slide = entry.target;
      
      if (entry.isIntersecting) {
        slide.classList.add("active");
        const video = slide.querySelector("video");
        // Only play background videos (not the modal video)
        if (video && !video.closest('.video-modal-container')) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Autoplay prevented:", error);
            });
          }
        }
      } else {
        slide.classList.remove("active");
        const video = slide.querySelector("video");
        if (video && !video.closest('.video-modal-container')) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll(".project-slide").forEach(slide => {
    observer.observe(slide);
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", renderFeaturedProjects);