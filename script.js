const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 15);
});

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Games filter
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".game-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const value = filter.dataset.filter;
    cards.forEach(card => {
      const categories = card.dataset.category.split(" ");
      const show = value === "all" || categories.includes(value);
      card.style.display = show ? "" : "none";
    });
  });
});

// Game details modal
const modal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

document.querySelectorAll(".game-details").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title;
    modalDescription.textContent = button.dataset.description;
    document.getElementById("modalBody").innerHTML = "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}
document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Contact form -> opens email to the owner
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const OWNER_EMAIL = "islamhamdy57777@gmail.com";

form.addEventListener("submit", e => {
  e.preventDefault();
  const f = form.elements;
  const get = n => f.namedItem(n).value.trim();
  const body = `الاسم: ${get("name")}
البريد: ${get("email")}
الخدمة: ${get("service")}

${get("message")}`;
  location.href = "mailto:" + OWNER_EMAIL + "?subject=" + encodeURIComponent("طلب خدمة: " + get("service")) + "&body=" + encodeURIComponent(body);
  formMessage.textContent = "تم فتح تطبيق البريد لإرسال رسالتك. لو لم يفتح، راسلنا مباشرة على " + OWNER_EMAIL;
});

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

document.getElementById("year").textContent = new Date().getFullYear();

// Theme (dark / light)
const themeBtn = document.getElementById("themeToggle");
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "☀" : "☾";
  themeBtn.setAttribute("aria-label", t === "dark" ? "الوضع الفاتح" : "الوضع الداكن");
}
applyTheme(document.documentElement.dataset.theme || "dark");
themeBtn.addEventListener("click", () => {
  const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(t);
  try { localStorage.setItem("theme", t); } catch (e) {}
});

// Toast
const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3500);
}

// Music (your own file: assets/music.mp3)
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", () => {
  if (!bgm.paused) { bgm.pause(); musicBtn.classList.remove("on"); return; }
  bgm.play().then(() => musicBtn.classList.add("on")).catch(() => toast("ضع ملف الموسيقى باسم music.mp3 داخل فولدر assets"));
});

// Articles modal
const modalBody = document.getElementById("modalBody");
document.querySelectorAll(".article-open").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".article-card");
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDescription.textContent = "";
    modalBody.innerHTML = card.querySelector(".article-body").innerHTML;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });
});
