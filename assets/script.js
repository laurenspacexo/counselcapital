(function () {
  "use strict";

  // Accessible mobile navigation toggle
  var toggleBtn = document.getElementById("nav-toggle-btn");
  var navLinks = document.getElementById("primary-navigation");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is chosen (mobile)
    navLinks.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu on Escape for keyboard users
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.focus();
      }
    });
  }

  // Contact form: client-side validation + accessible status messaging.
  // This is a static template — connect the fetch() call to a real
  // endpoint before taking the site live.
  var form = document.getElementById("consultation-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var requiredFields = form.querySelectorAll("[required]");
      var firstInvalid = null;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.setAttribute("aria-invalid", "true");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      status.classList.remove("success", "error");

      if (firstInvalid) {
        status.textContent = "Please complete all required fields before submitting.";
        status.classList.add("error", "is-visible");
        firstInvalid.focus();
        return;
      }

      // Placeholder confirmation. Replace with a real submission handler.
      status.textContent = "Thank you. Your request has been received and a senior advisor will respond within one business day.";
      status.classList.add("success", "is-visible");
      form.reset();
    });
  }
})();
