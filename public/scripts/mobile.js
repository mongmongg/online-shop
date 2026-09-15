const mobileBtn = document.getElementById("mobile-btn");
const navigationBar = document.querySelector("header");
const mobileMenuModal = document.getElementById("mobile-menu");
const closeMobileMenuBtn = document.querySelector(".close-menu-btn");

function toggleMobileMenuClass() {
  mobileMenuModal.classList.toggle("open");
  navigationBar.classList.toggle("open");
}

mobileBtn.addEventListener("click", toggleMobileMenuClass);
closeMobileMenuBtn.addEventListener("click", toggleMobileMenuClass);
