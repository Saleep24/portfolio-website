const toggleSwitch = document.querySelector("#switch");
const savedTheme = localStorage.getItem("theme");
document.documentElement.setAttribute("data-theme", savedTheme || "dark");
toggleSwitch.checked = (savedTheme || "dark") === "dark";
toggleSwitch.addEventListener("change", () => {
  const theme = toggleSwitch.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const setMenu = (open) => {
  siteHeader.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
};
menuButton.addEventListener("click", () => setMenu(!siteHeader.classList.contains("menu-open")));
siteHeader.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

const onScroll = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const contactForm = document.getElementById("contactForm");
if (contactForm) contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("form-status");
  const button = contactForm.querySelector("button");
  button.disabled = true;
  status.textContent = "Sending.";
  try {
    const response = await fetch(contactForm.action, { method: "POST", body: new FormData(contactForm), headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("failed");
    contactForm.reset();
    status.textContent = "Sent. Thanks.";
  } catch (error) {
    status.textContent = "Not sent. Email me instead.";
  }
  button.disabled = false;
});

const tileVideos = [...document.querySelectorAll(".tile video")];
if (tileVideos.length && !reduceMotion) {
  const inView = new Set();
  let hovered = null;
  const sync = () => {
    tileVideos.forEach((video) => {
      const shouldPlay = hovered ? video === hovered : inView.has(video);
      if (shouldPlay) video.play().catch(() => {}); else video.pause();
    });
  };
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) inView.add(entry.target); else inView.delete(entry.target);
    });
    sync();
  }, { threshold: 0.5 });
  tileVideos.forEach((video) => watcher.observe(video));
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    tileVideos.forEach((video) => {
      const tile = video.closest(".tile");
      tile.addEventListener("mouseenter", () => { hovered = video; sync(); });
      tile.addEventListener("mouseleave", () => { hovered = null; sync(); });
    });
  }
}

const footer = document.querySelector(".site-footer");
footer.dataset.variant = "art";
if (!reduceMotion) {
  let timer;
  const flip = () => { footer.dataset.variant = footer.dataset.variant === "art" ? "wordmark" : "art"; };
  new IntersectionObserver((entries) => {
    clearInterval(timer);
    if (entries[0].isIntersecting) timer = setInterval(flip, 6000);
  }, { threshold: 0.4 }).observe(footer);
}
