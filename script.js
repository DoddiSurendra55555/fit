// js/script.js

// Optional: Alert on page load (for demo)
window.addEventListener("DOMContentLoaded", () => {
  console.log("Fitness Pro App Loaded ✅");
});

// Example: Scroll to top button logic (if you want to add one)
const scrollBtn = document.getElementById("scrollToTopBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
