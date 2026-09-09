/* =========================================================
   E.F. Transport Service — script.js
   Handles: language toggle (EN/ES), mobile menu,
            email button, footer year
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* -------------------------------------------------------
     1. LANGUAGE TOGGLE (EN / ES)
     ------------------------------------------------------- */
  var langEN = document.getElementById("langEN");
  var langES = document.getElementById("langES");

  function setLanguage(lang) {
    // Update every element that has data-en / data-es
    var elements = document.querySelectorAll("[data-en]");
    elements.forEach(function (el) {
      var text = (lang === "es") ? el.getAttribute("data-es") : el.getAttribute("data-en");
      if (text !== null) {
        el.textContent = text;
      }
    });

    // Update the <html lang="..."> attribute (good for SEO/accessibility)
    document.documentElement.setAttribute("lang", lang);

    // Update which button looks "active"
    if (langEN && langES) {
      if (lang === "es") {
        langES.classList.add("active");
        langEN.classList.remove("active");
      } else {
        langEN.classList.add("active");
        langES.classList.remove("active");
      }
    }

    // Remember the choice for next visit
    try { localStorage.setItem("preferredLang", lang); } catch (e) {}
  }

  if (langEN) langEN.addEventListener("click", function () { setLanguage("en"); });
  if (langES) langES.addEventListener("click", function () { setLanguage("es"); });

  // On load: use saved preference, or fall back to the browser's language
  var savedLang = null;
  try { savedLang = localStorage.getItem("preferredLang"); } catch (e) {}

  if (savedLang === "en" || savedLang === "es") {
    setLanguage(savedLang);
  } else {
    // If the visitor's browser is Spanish, default to ES; otherwise EN
    var browserLang = (navigator.language || "en").toLowerCase();
    setLanguage(browserLang.indexOf("es") === 0 ? "es" : "en");
  }


  /* -------------------------------------------------------
     2. MOBILE MENU (hamburger)
     ------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    // Open / close when the hamburger is tapped
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      navToggle.classList.toggle("open");
      var isOpen = navLinks.classList.contains("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu after tapping any nav link (nicer on mobile)
    var links = navLinks.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* -------------------------------------------------------
     3. EMAIL BUTTON (assembled here to reduce spam scraping)
     ------------------------------------------------------- */
  var emailBtn = document.getElementById("emailBtn");
  if (emailBtn) {
    var user = "elesterflores06";
    var domain = "gmail.com";
    var subject = "Quote%20Request%20-%20E.F.%20Transport%20Service";
    emailBtn.setAttribute("href", "mailto:" + user + "@" + domain + "?subject=" + subject);
  }


  /* -------------------------------------------------------
     4. FOOTER YEAR (auto-updates)
     ------------------------------------------------------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
