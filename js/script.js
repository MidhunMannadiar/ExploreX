// =====================================================
// THEME TOGGLE (DOM MANIPULATION)
// =====================================================
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const icon = themeBtn.querySelector("i");

  if (document.body.classList.contains("dark")) {
    icon.classList.remove("bi-moon");
    icon.classList.add("bi-sun");
  } else {
    icon.classList.remove("bi-sun");
    icon.classList.add("bi-moon");
  }
});


// =====================================================
// QUICK BOOKING BUTTON
// =====================================================
document.getElementById("quickBookBtn").addEventListener("click", function (event) {
    event.preventDefault();

    let phone = document.getElementById("phone").value.trim();

    if (phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number");
    } else {
       const quickBookBtn = document.getElementById("quickBookBtn");

quickBookBtn.addEventListener("click", () => {
  alert("Thanks! A travel consultant will contact you shortly.");
});
    }
});

// =====================================================
// PACKAGE BOOK BUTTONS
// =====================================================
document.querySelectorAll(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const pkg = btn.dataset.package;
    alert(`You selected: ${pkg}. Please complete the contact form below.`);
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
});

// =====================================================
// COST ESTIMATOR
// Simple demo: ₹2,500 per traveler per day
// =====================================================
const estimateBtn = document.getElementById("estimateBtn");
const estimateResult = document.getElementById("estimateResult");

estimateBtn.addEventListener("click", () => {
  const travelers = Number(document.getElementById("travelerCount").value);
  const days = Number(document.getElementById("dayCount").value);

  if (travelers < 1 || days < 1) {
    estimateResult.classList.remove("d-none", "alert-info");
    estimateResult.classList.add("alert-danger");
    estimateResult.textContent =
      "Please enter valid values for travelers and days.";
    return;
  }

  const total = travelers * days * 2500;

  estimateResult.classList.remove("d-none", "alert-danger");
  estimateResult.classList.add("alert-info");
  estimateResult.textContent =
    `Estimated trip cost: ₹${total.toLocaleString("en-IN")} ` +
    `(for ${travelers} traveler(s) and ${days} day(s)).`;
});

// =====================================================
// CONTACT FORM VALIDATION
// =====================================================
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const destination = document.getElementById("destination");

  let valid = true;

  // reset
  [name, phone, email, destination].forEach((field) => {
    field.classList.remove("is-invalid");
  });

  // name
  if (name.value.trim().length < 2) {
    name.classList.add("is-invalid");
    valid = false;
  }

  // phone (simple digits check)
  const phoneDigits = phone.value.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    phone.classList.add("is-invalid");
    valid = false;
  }

  // email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add("is-invalid");
    valid = false;
  }

  // destination
  if (!destination.value) {
    destination.classList.add("is-invalid");
    valid = false;
  }

  if (!valid) return;

  // show success
  successMessage.classList.remove("d-none");

  // clear form
  contactForm.reset();

  // auto-hide success after 4 seconds
  setTimeout(() => {
    successMessage.classList.add("d-none");
  }, 4000);
});

// =====================================================
// NAVBAR ACTIVE LINK ON SCROLL (BONUS)
// =====================================================
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link");

function setActiveLink() {
  let current = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();